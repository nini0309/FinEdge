from backend.core.database import Base
from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    func,
)
from sqlalchemy.orm import relationship
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, nullable=False, index=True)
    password_hash = Column(String, nullable=False)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    refresh_token_hash = Column(String, nullable=True)

    # relationships
    details = relationship("UserDetails", back_populates="user", uselist=False)
    loans = relationship("Loan", back_populates="user")

    def __repr__(self):
        return f"<User id={self.id} email={self.email}>"
