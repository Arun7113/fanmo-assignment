import sqlite3 from "sqlite3";
import { open } from "sqlite";

let db: any;

export const getDB = async () => {
  if (db) return db;

  db = await open({
    filename: "./expenses.db",
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS expenses (
      id TEXT PRIMARY KEY,
      amount REAL NOT NULL,
      category TEXT NOT NULL,
      description TEXT,
      date TEXT NOT NULL,
      created_at TEXT NOT NULL,
      idempotency_key TEXT UNIQUE
    )
  `);

  return db;
};