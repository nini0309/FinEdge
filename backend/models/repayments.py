from backend.core.database import Base
from sqlalchemy import (
    Column,
    Integer,
    Float,
    Date,
    ForeignKey,
    Boolean
)
from sqlalchemy.orm import relationship
class Repayment(Base):
    __tablename__ = "repayments"

    id = Column(Integer, primary_key=True, index=True)
    loan_id = Column(Integer, ForeignKey("loans.id"), nullable=False)

    amount_paid = Column(Float, nullable=False)
    payment_date = Column(Date, nullable=False)

    is_late = Column(Boolean, default=False)

    loan = relationship("Loan", back_populates="repayments")
