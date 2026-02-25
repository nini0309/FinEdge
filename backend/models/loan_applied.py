from backend.core.database import Base
from sqlalchemy import (
    Column,
    Integer,
    Float,
    Enum,
    ForeignKey,
    DateTime,
    func,
    Boolean,
    String
)
from sqlalchemy.orm import relationship

class Loan(Base):
    __tablename__ = "loans"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    applicant_income = Column(Float, nullable=False)
    coapplicant_income = Column(Float, default=0)

    loan_amount = Column(Float, nullable=False)
    loan_amount_term = Column(Integer, nullable=False)  # in months

    credit_history = Column(Boolean, nullable=False)

    loan_status = Column(String, default="PENDING")
    ml_score = Column(Float, nullable=True)
    decision_reason = Column(String, nullable=True)
    model_version = Column(String, nullable=True)

    applied_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="loans")
    repayments = relationship("Repayment", back_populates="loan")
    ongoing_loan = relationship("OngoingLoan", back_populates="loan", uselist=False)
