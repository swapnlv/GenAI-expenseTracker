from fastapi import APIRouter
from app.model.ExpenseRequestV1 import ExpenseRequest
from app.service.expense_tracker import add_expense, get_expenses, summarize_expenses

router = APIRouter()

@router.post("/expenses")
def create_expense(expense: ExpenseRequest):
    return add_expense(expense)

@router.get("/expenses")
def list_expenses():
    return get_expenses()

@router.get("/expenses/summary")
def expense_summary():
    return summarize_expenses()