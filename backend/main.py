from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.api.v1 import auth, users, user_details, loan_applied
from backend.core.config import settings
from backend.core.database import Base, engine
from backend.models.user import User
from backend.models.user_details import UserDetails
from backend.models.loan_applied import Loan
from backend.models.ongoing_loan import OngoingLoan
from backend.models.repayments import Repayment

app = FastAPI(debug=True)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"status": "ok"}

# API v1 routes
app.include_router(
    auth.router,
    prefix="/api/v1/auth",
    tags=["Auth"],
)

app.include_router(
    users.router,
    prefix="/api/v1/users",
    tags=["Users"],
)

app.include_router(
    user_details.router,
    prefix="/api/v1/user_details",
    tags=["User Details"],
)

app.include_router(
    loan_applied.router,
    prefix="/api/v1/loan_applied",
    tags=["Loan Applied"],
)

# app.include_router(
#     ongoing_loans.router,
#     prefix="/api/v1/ongoing_loans",
#     tags=["Ongoing Loans"],
# )

# app.include_router(
#     repayments.router,
#     prefix="/api/v1/repayments",
#     tags=["Repayments"],
# )