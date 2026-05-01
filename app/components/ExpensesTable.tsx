"use client";

import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function ExpenseTable({ filters }: any) {
  const query = `/api/expenses?sort=date_desc${
    filters.category ? `&category=${filters.category}` : ""
  }${filters.date ? `&date=${filters.date}` : ""}`;

  const { data, isLoading } = useSWR(query, fetcher);

  const expenses = Array.isArray(data) ? data : [];

  if (isLoading) return <p>Loading...</p>;

  return (
    <table style={styles.table}>
      <thead>
        <tr>
          <th>Amount</th>
          <th>Category</th>
          <th>Description</th>
          <th>Date</th>
        </tr>
      </thead>

      <tbody>
        {expenses.map((e: any) => (
          <tr key={e.id}>
            <td>₹{e.amount}</td>
            <td>{e.category}</td>
            <td>{e.description}</td>
            <td>{e.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const styles = {
  table: {
    width: "100%",
    border: "1px solid #3b82f6",
    marginBottom: 20,
  },
};