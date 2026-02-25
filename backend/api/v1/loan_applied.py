from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from backend.core.database import get_db
from backend.schemas.loan_applied import (
    LoanAppliedCreate,
    LoanAppliedResponse
)
from backend.api.deps import get_current_user
from backend.models.user import User
from backend.services.loan_applied_service import add_loan_applied_service
from backend.crud.loan_applied import get_loans_by_user, get_loan_by_id
from backend.ml.loan_processor import process_loan_background


router = APIRouter()


@router.post(
    "",
    response_model=LoanAppliedResponse
)
def apply_loan(
    payload: LoanAppliedCreate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    try:
        loan = add_loan_applied_service(
            db=db,
            user_id=current_user.id,
            details=payload
        )
    except ValueError as e:
        print(e)
        raise HTTPException(status_code=400, detail=str(e))
    
    background_tasks.add_task(process_loan_background, loan.id)
    
    return loan

# @router.delete(
#     ""
# )
# def delete_user_details(
#     db: Session = Depends(get_db),
#     current_user: User = Depends(get_current_user)
# ):
#     return delete_user_details_service(
#         db=db,
#         user_id=current_user.id
# )

# from backend.schemas.user_details import UserDetailsUpdate
# from backend.services.user_details_service import update_user_details_service


# @router.patch(
#     "",
#     response_model=UserDetailsResponse
# )
# def edit_user_details(
#     payload: UserDetailsUpdate,
#     db: Session = Depends(get_db),
#     current_user: User = Depends(get_current_user)
# ):
#     return update_user_details_service(
#         db=db,
#         user_id=current_user.id,
#         details_update=payload
#     )

@router.get(
    "",
    response_model=List[LoanAppliedResponse]
)
def get_all_loan_applied(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return get_loans_by_user(
        db=db,
        user_id=current_user.id
)

@router.get("/{loan_id}")
def read_loan(
    loan_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)  # assuming JWT auth
):
    try:
        loan = get_loan_by_id(db, current_user.id, loan_id)
        return loan

    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))