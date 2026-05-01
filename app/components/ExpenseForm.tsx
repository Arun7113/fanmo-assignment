"use client";

import { useState } from "react";
import { mutate } from "swr";

const KEY = "/api/expenses?sort=date_desc";

export default function ExpenseForm() {
  const [form, setForm] = useState({
    amount: "",
    category: "",
    description: "",
    date: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: any) => {
    e.preventDefault();

    if (!form.amount || Number(form.amount) <= 0)
      return setError("Enter valid amount");

    if (!form.category) return setError("Category required");

    setLoading(true);
    setError("");

    try {
      await fetch("/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Idempotency-Key": Date.now().toString(),
        },
        body: JSON.stringify(form),
      });

      mutate(KEY);
      setForm({ amount: "", category: "", description: "", date: "" });
    } catch {
      setError("Failed to save");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={submit} style={styles.card}>
      <input
        style={styles.input}
        placeholder="Amount"
        type="number"
        value={form.amount}
        onChange={(e) =>
          setForm({ ...form, amount: e.target.value })
        }
      />

      <input
        style={styles.input}
        placeholder="Category"
        value={form.category}
        onChange={(e) =>
          setForm({ ...form, category: e.target.value })
        }
      />

      <input
        style={styles.input}
        placeholder="Description"
        value={form.description}
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
      />

      <input
        style={styles.input}
        type="date"
        value={form.date}
        onChange={(e) =>
          setForm({ ...form, date: e.target.value })
        }
      />

      <button
        disabled={loading}
        style={{
          ...styles.button,
          ...(loading ? styles.disabled : {}),
        }}
      >
        {loading ? "Saving..." : "Add"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}

const styles: any = {
  card: {
    background: "white",
    padding: 15,
    marginBottom: 20,
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    borderRadius: 8,
  },
  input: {
    padding: 8,
    border: "1px solid #3b82f6",
    borderRadius: 5,
  },
  button: {
    padding: "8px 16px",
    border: "1px solid #2563eb",
    color: "#2563eb",
    background: "white",
    cursor: "pointer",
  },
  disabled: {
    opacity: 0.5,
    cursor: "not-allowed",
  },
};