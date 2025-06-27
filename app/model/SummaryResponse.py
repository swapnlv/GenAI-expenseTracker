from pydantic import BaseModel
from typing import Dict

class SummaryResponse(BaseModel):
    summary: Dict[str, float]