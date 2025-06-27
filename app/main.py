import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from app.service.expense_tracker import summarize_expenses, get_expenses, add_expense
from fastapi import  FastAPI
from app.api.endpoints import router

app = FastAPI(
    title="Expense Tracker API",
    description="Track and summarize your expenses",
    version="1.0.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or restrict to your frontend origin like ["http://localhost:5173"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(router)

@app.get("/")
def root():
    return {"message": "Welcome to the Expense Tracker API"}

if __name__ == "__main__":
    uvicorn.run("app.api.endpoints:app", port=8080, reload=True)