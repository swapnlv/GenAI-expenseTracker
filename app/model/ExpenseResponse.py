
from pydantic import BaseModel, Field
from datetime import date
from typing import Optional

class ExpenseResponse(BaseModel):
    description: str
    amount: float
    category: str
    date: Optional[date]
