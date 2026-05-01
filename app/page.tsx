"use client";

import { useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseTable from "./components/ExpensesTable";
import Filters from "./components/FilterBar";
import Summary from "./components/Summary";

export default function Home() {
  const [filters, setFilters] = useState({
    category: "",
    date: "",
  });

  return (
    <main style={styles.container}>
      <h1 style={styles.title}>Expense Tracker</h1>

      <ExpenseForm />

      <Filters setFilters={setFilters} />

      <ExpenseTable filters={filters} />
      <Summary filters={filters} />
    </main>
  );
}

const styles = {
  container: {
    maxWidth: 900,
    margin: "auto",
    padding: 20,
    background: "#eef6ff",
    minHeight: "100vh",
  },
  title: {
    color: "#2563eb",
    fontSize: 28,
    marginBottom: 20,
  },
};