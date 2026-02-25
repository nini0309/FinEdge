from backend.core.database import SessionLocal
from backend.models.loan_applied import Loan
import random

def process_loan_background(loan_id: int):
    print(f"Processing loan {loan_id}")
    db = SessionLocal()

    try:
        loan = db.query(Loan).get(loan_id)

        if not loan:
            return

        # prevent double processing
        if loan.loan_status != "PENDING":
            return

        # simulate ML prediction
        score = random.uniform(0, 1)

        loan.ml_score = score

        if score > 0.7:
            loan.loan_status = "APPROVED"
        else:
            loan.loan_status = "REJECTED"

        print(f"Loan {loan_id} processed with score {score}")

        db.commit()

    except Exception:
        loan.loan_status = "FAILED"
        print(f"Loan {loan_id} failed to process")
        db.commit()

    finally:
        db.close()