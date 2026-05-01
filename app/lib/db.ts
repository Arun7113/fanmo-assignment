import Database from "better-sqlite3";

let db: any;

export function getDB() {
  if (!db) {
    db = new Database("expenses.db");

    db.prepare(`
      CREATE TABLE IF NOT EXISTS expenses (
        id TEXT PRIMARY KEY,
        amount REAL,
        category TEXT,
        description TEXT,
        date TEXT,
        created_at TEXT,
        idempotency_key TEXT
      )
    `).run();
  }

  return db;
}