from sqlalchemy.orm import Session
from fastapi import HTTPException
from backend.models.user_details import UserDetails
from backend.schemas.user_details import UserDetailsCreate
from backend.crud.user_details import create_user_details


def add_user_details_service(
    db: Session,
    user_id: int,
    details: UserDetailsCreate
):
    # Check if user already has details
    existing = db.query(UserDetails).filter(
        UserDetails.user_id == user_id
    ).first()

    if existing:
        raise HTTPException(
            status_code=400,
            detail="User details already exist"
        )

    return create_user_details(db, user_id, details)

def delete_user_details_service(
    db: Session,
    user_id: int
):    
    db.query(UserDetails).filter(
        UserDetails.user_id == user_id
    ).delete()
    db.commit()

    return {"message": "User details deleted successfully"}

from backend.schemas.user_details import UserDetailsUpdate
from backend.crud.user_details import update_user_details


def update_user_details_service(
    db: Session,
    user_id: int,
    details_update: UserDetailsUpdate
):
    db_details = db.query(UserDetails).filter(
        UserDetails.user_id == user_id
    ).first()

    if not db_details:
        raise HTTPException(
            status_code=404,
            detail="User details not found"
        )

    return update_user_details(
        db=db,
        db_details=db_details,
        details_update=details_update
    )

def get_user_details_service(
    db: Session,
    user_id: int
):
    db_details = db.query(UserDetails).filter(
        UserDetails.user_id == user_id
    ).first()

    if not db_details:
        raise HTTPException(
            status_code=404,
            detail="User details not found"
        )

    return db_details