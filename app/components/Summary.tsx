"use client";

import useSWR from "swr";

export default function Summary({ filters }: any) {
  const query = `/api/expenses?sort=date_desc${
    filters.category ? `&category=${filters.category}` : ""
  }${filters.date ? `&date=${filters.date}` : ""}`;

  const { data = [] } = useSWR(query);

  const expenses = Array.isArray(data) ? data : [];

  const total = expenses.reduce(
    (s: number, e: any) => s + Number(e.amount),
    0
  );

  const map: any = {};
  expenses.forEach((e: any) => {
    map[e.category] = (map[e.category] || 0) + Number(e.amount);
  });

  return (
    <div style={{ background: "white", padding: 15 }}>
      <p>Total: ₹{total}</p>

      <h4>Category Summary</h4>
      <ul>
        {Object.entries(map).map(([k, v]: any) => (
          <li key={k}>
            {k}: ₹{v}
          </li>
        ))}
      </ul>
    </div>
  );
}