from sqlalchemy.orm import Session
from fastapi import HTTPException
from backend.models.loan_applied import Loan
from backend.schemas.loan_applied import LoanAppliedCreate
from backend.crud.loan_applied import create_loan_applied
from backend.crud.user import get_by_id


def add_loan_applied_service(
    db: Session,
    user_id: int,
    details: LoanAppliedCreate
):
    user = get_by_id(db, user_id)
    if not user.details:
        raise ValueError("Profile must be completed")

    return create_loan_applied(db, user_id, details)

def delete_loan_applied_service(
    db: Session,
    user_id: int,
    loan_id: int
):  
    loan = db.query(Loan).filter(
        loan_id == Loan.id
    ).first()

    if not loan:
        raise HTTPException(
            status_code=404,
            detail="Loan not found"
        )
    if loan.loan_status != "PENDING":
        raise HTTPException(
            status_code=400,
            detail="Loan cannot be deleted"
        )

    db.query(Loan).filter(
        Loan.user_id == user_id,
        Loan.id == loan_id
    ).delete()
    db.commit()

    return {"message": "Loan deleted successfully"}

# from backend.schemas.user_details import UserDetailsUpdate
# from backend.crud.user_details import update_user_details


# def update_user_details_service(
#     db: Session,
#     user_id: int,
#     details_update: UserDetailsUpdate
# ):
#     db_details = db.query(UserDetails).filter(
#         UserDetails.user_id == user_id
#     ).first()

#     if not db_details:
#         raise HTTPException(
#             status_code=404,
#             detail="User details not found"
#         )

#     return update_user_details(
#         db=db,
#         db_details=db_details,
#         details_update=details_update
#     )

# def get_user_details_service(
#     db: Session,
#     user_id: int
# ):
#     db_details = db.query(UserDetails).filter(
#         UserDetails.user_id == user_id
#     ).first()

#     if not db_details:
#         raise HTTPException(
#             status_code=404,
#             detail="User details not found"
#         )

#     return db_details