from fastapi import APIRouter, Depends, HTTPException, Response, Request
from sqlalchemy.orm import Session

from backend.core.database import get_db
from backend.schemas.user import UserCreate, UserLogin, UserResponse
from backend.services.user_service import register_user, authenticate_user, refresh_access_token, delete_refresh_token

router = APIRouter()


@router.post("/register", response_model=UserResponse)
def register(payload: UserCreate, db: Session = Depends(get_db)):
    try:
        user = register_user(db, payload.email, payload.password)
        return user
    except ValueError as e:
        print(e)
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/login")
def login(
    payload: UserLogin,
    response: Response,
    request: Request,
    db: Session = Depends(get_db),
):
    tokens = authenticate_user(db, payload.email, payload.password)
    if not tokens:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token = tokens["access_token"]
    # refresh_token = tokens["refresh_token"]
    # auth_base_path = request.url.path.rsplit("/", 1)[0]


    # Access token cookie (short lived)
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=False,  # True in production
        samesite="lax",
        max_age=60 * 120,  # 15 minutes
    )

    # Refresh token cookie (long lived)
    # response.set_cookie(
    #     key="refresh_token",
    #     value=refresh_token,
    #     httponly=True,
    #     secure=False,
    #     samesite="lax",
    #     path=auth_base_path,
    #     max_age=60 * 60 * 24 * 7,  # 7 days
    # )

    return {"message": "Login successful"}

@router.post("/refresh")
def refresh_token(request: Request, response: Response, db: Session = Depends(get_db)):

    token = request.cookies.get("refresh_token")
    if not token:
        raise HTTPException(status_code=401, detail="No refresh token")
    
    tokens = refresh_access_token(db, token)
    if not tokens:
        raise HTTPException(status_code=401, detail="Invalid refresh token")

    new_access = tokens["access_token"]
    new_refresh = tokens["refresh_token"]

    auth_base_path = request.url.path.rsplit("/", 1)[0]

    response.set_cookie(
        key="access_token",
        value=new_access,
        httponly=True,
        secure=False,
        samesite="lax",
        max_age=60 * 15,
    )

    response.set_cookie(
        key="refresh_token",
        value=new_refresh,
        httponly=True,
        secure=False,
        samesite="lax",
        path=auth_base_path,
        max_age=60 * 60 * 24 * 7,
    )

    return {"message": "Token refreshed"}

@router.post("/logout")
def logout(request: Request,response: Response, db: Session = Depends(get_db)):

    token = request.cookies.get("access_token")
    if not token:
        raise HTTPException(status_code=401, detail="No access token")

    # delete_refresh_token(db, token)
    auth_base_path = request.url.path.rsplit("/", 1)[0]


    response.delete_cookie("access_token")
    # response.delete_cookie("refresh_token", path=auth_base_path)

    return {"message": "Logged out"}

