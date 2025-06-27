from datetime import datetime,date
from typing import List, Dict
import json
from app.model.ExpenseResponse import ExpenseResponse
from app.model.SummaryResponse import SummaryResponse
from app.model.ExpenseRequestV1 import ExpenseRequest
from app.service.parser_chain_service import parse_expense_input
from app.utils.file_io import load_data, save_data

EXPENSES_FILE = "data/expenses.json"


def add_expense(expense: ExpenseRequest):

    data = load_data(EXPENSES_FILE)
    if len(expense.dict())==1 and expense.dict().get("description"):
        try:
            parsed=json.loads(parse_expense_input(expense.description))
            expense_dict=parsed
        except Exception as e:
            raise ValueError(f"Failed to parse natural language: {e}")
    else:
        expense_dict = expense.dict()

    if expense_dict["date"] is None:
        expense_dict["date"] = datetime.now().date().isoformat()
    elif isinstance(expense_dict["date"], date):
        expense_dict["date"] = expense_dict["date"].isoformat()
    # Keep it as date object

    data.append(expense_dict)
    print("Saving data")
    save_data(EXPENSES_FILE, data)


def get_expenses() -> List[ExpenseResponse]:
    data = load_data(EXPENSES_FILE)
    for item in data:
        if isinstance(item.get("date"), str):
            item["date"] = datetime.strptime(item["date"], "%Y-%m-%d").date()
        elif item.get("date") is None:
            item["date"] = None  # Explicitly set to None if it is None
    return [ExpenseResponse(**item) for item in data]

def summarize_expenses() -> SummaryResponse:
    data = load_data(EXPENSES_FILE)
    summary = {}
    for e in data:
        cat = e['category']
        summary[cat] = summary.get(cat, 0) + e['amount']
    return SummaryResponse(summary=summary)
