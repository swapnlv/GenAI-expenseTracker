import React, { useEffect, useMemo, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel, // <-- import pagination model
  createColumnHelper,
  flexRender,
} from '@tanstack/react-table';
import { getExpenses } from '../api/getExpenses';
import type { Expense } from '../api/getExpenses';

const columnHelper = createColumnHelper<Expense>();

const ExpenseTable: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination state
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 3; // 3 rows per page

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getExpenses();
        setExpenses(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = useMemo(
    () => [
      columnHelper.accessor('date', {
        header: 'Date',
        cell: (info) => new Date(info.getValue()).toLocaleDateString(),
      }),
      columnHelper.accessor('description', {
        header: 'Description',
      }),
      columnHelper.accessor('category', {
        header: 'Category',
      }),
      columnHelper.accessor('amount', {
        header: 'Amount (₹)',
      }),
    ],
    []
  );

  const table = useReactTable({
    data: expenses,
    columns,
    state: {
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    onPaginationChange: (updater) => {
      // updater can be function or value
      const newPagination = typeof updater === 'function' ? updater({ pageIndex, pageSize }) : updater;
      setPageIndex(newPagination.pageIndex);
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: false, // let table handle pagination automatically
    pageCount: Math.ceil(expenses.length / pageSize),
  });

  if (loading) return <p style={{ color: '#f8fafc' }}>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ color: '#f8fafc', marginBottom: '1rem' }}>Your Spending Snapshot</h2>

      <div
        style={{
          display: 'flex',
          gap: '1.5rem',
          marginBottom: '2rem',
          flexWrap: 'wrap',
        }}
      >
        <div style={cardStyle}>
          <p>Total Expenses</p>
          <h3>{expenses.length}</h3>
        </div>
        <div style={cardStyle}>
          <p>Total Spent</p>
          <h3>₹{expenses.reduce((sum, e) => sum + e.amount, 0)}</h3>
        </div>
        <div style={cardStyle}>
          <p>Latest Expense</p>
          <h3>{new Date(expenses[0]?.date).toLocaleDateString() || 'N/A'}</h3>
        </div>
      </div>

      <h3 style={{ color: '#f8fafc' }}>Recent Expenses</h3>
      <table style={{ width: '100%', color: '#f8fafc', backgroundColor: '#1e293b', marginTop: '1rem' }}>
        <thead>
          <tr>
            {table.getHeaderGroups().map((headerGroup) =>
              headerGroup.headers.map((header) => (
                <th key={header.id} style={thStyle}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))
            )}
          </tr>
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} style={tdStyle}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
    <div
        style={{
            marginTop: '1rem',
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            color: '#f8fafc',
            alignItems: 'center',
        }}
        >
        <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            aria-label="Previous page"
            style={{
            padding: '0.5rem 1rem',
            cursor: table.getCanPreviousPage() ? 'pointer' : 'not-allowed',
            fontSize: '1.25rem',
            background: 'none',
            border: 'none',
            color: table.getCanPreviousPage() ? '#38bdf8' : '#64748b',
            }}
        >
            ◀️
        </button>

        <span>
            Page{' '}
            <strong>
            {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </strong>
        </span>

        <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            aria-label="Next page"
            style={{
            padding: '0.5rem 1rem',
            cursor: table.getCanNextPage() ? 'pointer' : 'not-allowed',
            fontSize: '1.25rem',
            background: 'none',
            border: 'none',
            color: table.getCanNextPage() ? '#38bdf8' : '#64748b',
            }}
        >
            ▶️
        </button>
        </div>
    </div>
  );
};

const cardStyle: React.CSSProperties = {
  backgroundColor: '#334155',
  padding: '1rem',
  borderRadius: '12px',
  minWidth: '160px',
  color: '#f8fafc',
  textAlign: 'center',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  marginLeft: '2rem',
};

const thStyle: React.CSSProperties = {
  padding: '12px',
  textAlign: 'center',
  backgroundColor: '#0f172a',
  fontWeight: 600,
};

const tdStyle: React.CSSProperties = {
  padding: '12px',
  borderTop: '1px solid #475569',
};

export default ExpenseTable;
