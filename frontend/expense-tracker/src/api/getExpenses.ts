export interface Expense {
    description: string;
    amount: number;
    category: string;
    date: string; // ISO format
  }
  
  export const getExpenses = async (): Promise<Expense[]> => {
    const response = await fetch('http://localhost:8000/expenses');
  
    if (!response.ok) {
      throw new Error('Failed to fetch expenses');
    }
  
    return await response.json();
  };
