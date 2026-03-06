from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
import os
DATABASE_URL = os.getenv("DATABASE_URL")

#DATABASE_URL = "postgresql://postgres:password@localhost:5432/loanapp"

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
