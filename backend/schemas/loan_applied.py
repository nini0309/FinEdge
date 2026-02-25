from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class LoanAppliedBase(BaseModel):
    applicant_income: float = Field(gt=0, description="Applicant monthly income")
    coapplicant_income: float = Field(gt=0, description="Co-applicant monthly income")
    loan_amount: float = Field(gt=0)
    loan_amount_term: int = Field(ge=6)
    credit_history: bool = Field(description="1 if good credit history else 0")

class LoanAppliedCreate(LoanAppliedBase):
    pass


class LoanAppliedResponse(LoanAppliedBase):
    id: int
    user_id: int
    applied_at: datetime
    loan_status: str

    class Config:
        from_attributes = True

class LoanAppliedUpdate(BaseModel):
    applicant_income: Optional[float] = Field(gt=0, description="Applicant monthly income")
    coapplicant_income: Optional[float] = Field(gt=0, description="Co-applicant monthly income")
    loan_amount: Optional[float] = Field(gt=0)
    loan_amount_term: Optional[int] = Field(ge=6)
    credit_history: Optional[bool] = Field(description="1 if good credit history else 0")
