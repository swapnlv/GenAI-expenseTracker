
from pydantic import BaseModel


class ExpenseRequest(BaseModel):
    description: str
