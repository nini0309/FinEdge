from backend.core.database import Base
from sqlalchemy import (
    Column,
    Integer,
    Float,
    Date,
    ForeignKey
)
from sqlalchemy.orm import relationship
class OngoingLoan(Base):
    __tablename__ = "ongoing_loans"

    id = Column(Integer, primary_key=True, index=True)
    loan_id = Column(Integer, ForeignKey("loans.id"), unique=True, nullable=False)

    total_amount = Column(Float, nullable=False)
    outstanding_amount = Column(Float, nullable=False)
    emi_amount = Column(Float, nullable=False)

    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)

    loan = relationship("Loan", back_populates="ongoing_loan")
