from langchain.prompts import ChatPromptTemplate
from app.configs.langchain_setup import get_langchain_llm


def parse_expense_input(input: str)->dict:
    llm=get_langchain_llm()
    prompt = ChatPromptTemplate.from_messages([
        (
            "system",
            "You are a helpful assistant that extracts structured data from user input about expenses."
        ),
        (
            "user",
            """Extract the following fields from the input:
        - description: short summary of what the expense was for (exclude amount, category, and date)
        - amount: numeric value only
        - category: such as Food, Travel, Shopping, etc.
        - date: in YYYY-MM-DD format. If the date is missing, respond with ERROR: Date missing.

        Input: {input_text}

        Respond in valid JSON with keys: description, amount, category, date."""
            )
    ])
    chain=prompt|llm
    try:
        result = chain.invoke({"input_text": input})
        return result.content
    except Exception as e:
        raise ValueError(f"Failed to parse natural language: {e}")
