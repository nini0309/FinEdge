from fastapi import HTTPException
from sqlalchemy.orm import Session
from backend.crud import user as user_crud
from backend.core.security import (
    decode_access_token,
    hash_password,
    verify_password,
    create_access_token,
    create_refresh_token
)

def register_user(db: Session, email: str, password: str):
    existing = user_crud.get_by_email(db, email)
    if existing:
        print("Email already registered")
        raise ValueError("Email already registered")

    password_hash = hash_password(password)
    return user_crud.create(db, email, password_hash)

def authenticate_user(db: Session, email: str, password: str):
    user = user_crud.get_by_email(db, email)
    if not user:
        return None

    if not verify_password(password, user.password_hash):
        return None

    access_token = create_access_token({"sub": str(user.id)})
    refresh_token = create_refresh_token({"sub": str(user.id)})

    # Store hashed refresh token
    user.refresh_token_hash = hash_password(refresh_token)
    db.commit()

    return {"access_token": access_token, "refresh_token": refresh_token}

def refresh_access_token(db: Session, refresh_token: str):
    payload = decode_access_token(refresh_token)
    if not payload or "sub" not in payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    user_id = int(payload["sub"])
    user = user_crud.get_by_id(db, int(user_id))
    if not user or not user.refresh_token_hash:
        raise HTTPException(status_code=401, detail="Invalid session")
    if not verify_password(refresh_token, user.refresh_token_hash):
        raise HTTPException(status_code=401, detail="Token mismatch")
    # Rotate tokens
    new_access = create_access_token({"sub": str(user.id)})
    new_refresh = create_refresh_token({"sub": str(user.id)})

    user.refresh_token_hash = hash_password(new_refresh)
    db.commit()

    return {"access_token": new_access, "refresh_token": new_refresh}

def delete_refresh_token(db: Session, refresh_token: str):
    payload = decode_access_token(refresh_token)
    if not payload or "sub" not in payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    user_id = int(payload["sub"])
    user = user_crud.get_by_id(db, int(user_id))
    if user:
        user.refresh_token_hash = None
        db.commit()
    
    return
