from sqlalchemy.orm import Session
from backend.models.loan_applied import Loan
from backend.schemas.loan_applied import LoanAppliedCreate, LoanAppliedUpdate

def create_loan_applied(
    db: Session,
    user_id: int,
    details: LoanAppliedCreate
):
    db_details = Loan(
        user_id=user_id,
        **details.model_dump()
    )

    db.add(db_details)
    db.commit()
    db.refresh(db_details)

    return db_details


def update_loan_applied(
    db: Session,
    db_details: Loan,
    details_update: LoanAppliedUpdate
):
    update_data = details_update.model_dump(exclude_unset=True)

    for field, value in update_data.items():
        setattr(db_details, field, value)

    db.commit()
    db.refresh(db_details)

    return db_details

def delete_loan_applied(db: Session, loan_id: int):
    db.query(Loan).filter(Loan.id == loan_id).delete()
    db.commit()

    return {"message": "Loan applied deleted successfully"}

def get_loans_by_user(db: Session, user_id: int):
    return (
        db.query(Loan)
        .filter(Loan.user_id == user_id)
        .order_by(Loan.applied_at.desc())
        .all()
    )

def get_loan_by_id(db: Session, user_id: int, loan_id: int):
    loan = (
        db.query(Loan)
        .filter(
            Loan.id == loan_id,
            Loan.user_id == user_id
        )
        .first()
    )

    if not loan:
        raise ValueError("Loan not found")

    return loan
