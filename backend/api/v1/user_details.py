from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.core.database import get_db
from backend.schemas.user_details import (
    UserDetailsCreate,
    UserDetailsResponse
)
from backend.services.user_details_service import add_user_details_service, delete_user_details_service, get_user_details_service
from backend.api.deps import get_current_user
from backend.models.user import User


router = APIRouter()


@router.post(
    "",
    response_model=UserDetailsResponse
)
def add_user_details(
    payload: UserDetailsCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return add_user_details_service(
        db=db,
        user_id=current_user.id,
        details=payload
    )

@router.delete(
    ""
)
def delete_user_details(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return delete_user_details_service(
        db=db,
        user_id=current_user.id
)

from backend.schemas.user_details import UserDetailsUpdate
from backend.services.user_details_service import update_user_details_service


@router.patch(
    "",
    response_model=UserDetailsResponse
)
def edit_user_details(
    payload: UserDetailsUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return update_user_details_service(
        db=db,
        user_id=current_user.id,
        details_update=payload
    )

@router.get(
    "",
    response_model=UserDetailsResponse
)
def get_user_details(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return get_user_details_service(
        db=db,
        user_id=current_user.id
)