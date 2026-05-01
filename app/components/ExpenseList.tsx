"use client";

import { useMemo } from "react";

export default function ExpenseList({ expenses }: any) {
  const total = useMemo(() => {
    return expenses.reduce((sum: number, e: any) => sum + e.amount, 0);
  }, [expenses]);

  return (
    <div>
      <h3>Total: ₹{total}</h3>

      <ul>
        {expenses.map((e: any) => (
          <li key={e.id}>
            ₹{e.amount} | {e.category} | {e.description} | {e.date}
          </li>
        ))}
      </ul>
    </div>
  );
}