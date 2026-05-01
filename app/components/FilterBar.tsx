"use client";

import { useEffect, useState } from "react";

export default function FilterBar({ setFilters }: any) {
  const [local, setLocal] = useState({
    category: "",
    date: "",
  });

  useEffect(() => {
    const t = setTimeout(() => {
      setFilters(local);
    }, 400);

    return () => clearTimeout(t);
  }, [local, setFilters]);

  return (
    <div style={{ marginBottom: 20 }}>
      <input
        placeholder="Filter category"
        onChange={(e) =>
          setLocal((p) => ({ ...p, category: e.target.value }))
        }
      />

    </div>
  );
}