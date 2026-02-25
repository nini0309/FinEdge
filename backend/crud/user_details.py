from sqlalchemy.orm import Session
from backend.models.user_details import UserDetails
from backend.schemas.user_details import UserDetailsCreate


def create_user_details(
    db: Session,
    user_id: int,
    details: UserDetailsCreate
):
    db_details = UserDetails(
        user_id=user_id,
        **details.model_dump()
    )

    db.add(db_details)
    db.commit()
    db.refresh(db_details)

    return db_details

from backend.schemas.user_details import UserDetailsUpdate


def update_user_details(
    db: Session,
    db_details: UserDetails,
    details_update: UserDetailsUpdate
):
    update_data = details_update.model_dump(exclude_unset=True)

    for field, value in update_data.items():
        setattr(db_details, field, value)

    db.commit()
    db.refresh(db_details)

    return db_details
