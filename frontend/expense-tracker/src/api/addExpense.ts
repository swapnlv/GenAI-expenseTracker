// services/api.ts
export const addExpense = async (description: string) => {
    const response = await fetch('http://localhost:8000/expenses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ description }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to add expense');
    }
  
    return await response.json();
  };
