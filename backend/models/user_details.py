from backend.core.database import Base
from sqlalchemy import (
    Column,
    Integer,
    String,
    Boolean,
    ForeignKey,
)
from sqlalchemy.orm import relationship
class UserDetails(Base):
    __tablename__ = "user_details"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True, nullable=False)

    name = Column(String(100), nullable=False)
    address = Column(String(500), nullable=False)
    phone = Column(String(10), unique=True, nullable=False)
    age = Column(Integer, nullable=False)

    aadhar = Column(String(12), unique=True, nullable=False)
    pan = Column(String(10), unique=True, nullable=False)

    marital_status = Column(Boolean, default=False)
    gender = Column(String, nullable=False)
    no_of_dependents = Column(Integer, nullable=False)

    self_employed = Column(Boolean, default=False)
    property_area = Column(String(50), nullable=False)
    graduate = Column(Boolean, default=False)

    user = relationship("User", back_populates="details")
