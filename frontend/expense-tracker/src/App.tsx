import { useState } from 'react';
import './App.css';
import TextareaDecorators from './components/input';
import Button from './components/button';
import { addExpense } from './api/addExpense';
import ExpenseTable from './components/expenseTable';
import ExpenseSummary from './components/expenseSummary';
import { FiPieChart, FiList } from 'react-icons/fi';

function App() {
  const [description, setDescription] = useState('');
  const [showExpenses, setShowExpenses] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const handleAddExpense = async () => {
    try {
      await addExpense(description);
      alert('Expense added successfully!');
      setDescription('');
    } catch (error) {
      console.error('Error adding expense:', error);
      alert('Failed to add expense');
    }
  };

  return (
    <>
      <head>
        <title>₹ Expense Tracker</title>
      </head>
      <header
        style={{
          backgroundColor: '#0f172a',
          padding: '1rem 2rem',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: '#f8fafc',
        }}
      >
        <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold' }}>
          <span style={{ fontSize: '1.5rem', paddingRight: '1rem' }}>₹</span>
          Expense Tracker
        </h1>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button
            onClick={() => setShowSummary((prev) => !prev)}
            style={{
              background: 'none',
              border: 'none',
              color: '#f8fafc',
              cursor: 'pointer',
              fontSize: '1.5rem',
            }}
            title={showSummary ? 'Hide Summary' : 'Show Summary'}
          >
            {showSummary ? <FiList /> : <FiPieChart />}
          </button>
          <Button onClick={() => setShowExpenses(!showExpenses)}>
            {showExpenses ? 'Return to Home' : 'View All Expenses'}
          </Button>
        </div>
      </header>
      <main
        style={{
          paddingTop: '10rem',
          backgroundColor: '#1e293b',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
      >
        <div style={{ maxWidth: '800px', width: '100%', padding: '1rem' }}>
          {showSummary ? (
            <ExpenseSummary />
          ) : showExpenses ? (
            <ExpenseTable />
          ) : (
            <>
              <TextareaDecorators value={description} onChange={setDescription} />
              <div style={{ marginTop: '1rem' }}>
                <Button onClick={handleAddExpense}>Add Expense</Button>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}

export default App;
