// components/Summary.tsx

import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type SummaryData = Record<string, number>;

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff6b6b', '#00C49F', '#FFBB28'];

const Summary = () => {
  const [summary, setSummary] = useState<SummaryData>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await fetch('http://localhost:8000/expenses/summary');
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setSummary(data.summary || {});
      } catch (error) {
        console.error('Error fetching summary:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  const chartData = Object.entries(summary).map(([category, amount]) => ({
    name: category,
    value: amount,
  }));

  return (
    <div
      style={{
        backgroundColor: '#334155',
        padding: '2rem',
        borderRadius: '12px',
        color: '#f8fafc',
        textAlign: 'center',
      }}
    >
      <h2 style={{ marginBottom: '1rem' }}>Expense Summary</h2>

      {loading ? (
        <p>Loading...</p>
      ) : chartData.length === 0 ? (
        <p>No data available</p>
      ) : (
        <>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {chartData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>

          <div style={{ marginTop: '2rem', textAlign: 'left' }}>
            {chartData.map((item) => (
              <div
                key={item.name}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '0.5rem 0',
                  borderBottom: '1px solid #475569',
                }}
              >
                <span>{item.name}</span>
                <span>₹{item.value}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Summary;
