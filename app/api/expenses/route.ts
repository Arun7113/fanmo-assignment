import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/app/lib/db";
import { v4 as uuidv4 } from "uuid";

// POST /api/expenses
export async function POST(req: NextRequest) {
  const db = getDB(); // ✅ no await
  const body = await req.json();

  let { amount, category, description, date } = body;
  const idempotencyKey = req.headers.get("idempotency-key");

  amount = Number(amount);

  if (!amount || amount <= 0 || !category || !date) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  try {
    // ✅ idempotency check
    if (idempotencyKey) {
      const existing = db
        .prepare("SELECT * FROM expenses WHERE idempotency_key = ?")
        .get(idempotencyKey);

      if (existing) return NextResponse.json(existing);
    }

    const id = uuidv4();
    const createdAt = new Date().toISOString();

    // ✅ insert
    db.prepare(
      `INSERT INTO expenses 
      (id, amount, category, description, date, created_at, idempotency_key)
      VALUES (?, ?, ?, ?, ?, ?, ?)`
    ).run(
      id,
      amount,
      category,
      description,
      date,
      createdAt,
      idempotencyKey
    );

    // ✅ fetch inserted row
    const expense = db
      .prepare("SELECT * FROM expenses WHERE id = ?")
      .get(id);

    return NextResponse.json(expense, { status: 201 });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}


// GET /api/expenses
export async function GET(req: NextRequest) {
  const db = getDB(); // ✅ no await

  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const sort = searchParams.get("sort");

  let query = "SELECT * FROM expenses";
  const params: any[] = [];

  if (category) {
    query += " WHERE category = ?";
    params.push(category);
  }

  // ✅ always sort (important)
  if (sort === "date_desc") {
    query += " ORDER BY date DESC";
  } else {
    query += " ORDER BY created_at DESC";
  }

  console.log(query, params);

  const expenses = db
    .prepare(query)
    .all(...params); // ✅ correct usage

  return NextResponse.json(expenses);
}