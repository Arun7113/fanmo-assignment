# Expense Tracker (Next.js Full Stack)

## Overview

This project is a minimal full-stack personal expense tracker built using Next.js (App Router). It allows users to record, view, filter, and analyze their expenses while handling real-world conditions such as retries, slow networks, and repeated submissions.

The goal was to keep the feature set small but implement it with production-like thinking, focusing on correctness, data consistency, and resilience.

---

## Features

### Core Features

* Create a new expense with:

  * Amount
  * Category
  * Description
  * Date
* View a list of all expenses
* Filter expenses by:

  * Category
  * Date
* Sort expenses by date (newest first)
* Display total of currently visible expenses
* Display category-wise summary (sum per category)

---

### User Experience Enhancements

* Debounced filtering (prevents excessive API calls while typing)
* Loading states for data fetching
* Simple error messages for invalid input or API failures
* Disabled submit button during request to prevent duplicate clicks
* No full-page reloads on submission (client-side updates using SWR)

---

### Data Consistency & Reliability

* Idempotent POST API using `Idempotency-Key`

  * Prevents duplicate entries due to retries or refreshes
* Defensive handling of API responses

  * Avoids crashes when data is undefined
* Consistent sorting to ensure predictable UI behavior

---

## Tech Stack and Rationale

### Frontend and Backend

* Next.js (App Router)

  * Single framework for both frontend and backend
  * Simplifies development and deployment
  * Built-in API routes reduce overhead of separate backend services

### Data Fetching

* SWR

  * Provides caching and revalidation
  * Enables instant UI updates after mutations
  * Handles loading and error states cleanly

### Database

* SQLite using better-sqlite3 (local development)

  * Simple, file-based database
  * No setup required for local development
  * Synchronous API makes it easy to reason about

### Deployment

* Vercel

  * Native support for Next.js
  * Easy integration with GitHub
  * Zero-config deployment

---

## API Design

### POST /api/expenses

Creates a new expense.

* Validates input (amount > 0, category, date required)
* Uses idempotency key to avoid duplicate inserts
* Returns created expense

### GET /api/expenses

Fetches expenses.

Supports:

* category filter
* date filter
* sort by date (newest first)

Always returns an array to prevent frontend crashes.

---

## Key Design Decisions

### 1. Shared Data Source (SWR Key Consistency)

All components (table and summary) use the same API query pattern to avoid inconsistent data views.

### 2. Client-side State for Filters

Filters are managed using React state and passed to components to ensure synchronized updates.

### 3. Debouncing Filters

Filtering is delayed slightly to reduce unnecessary API calls and improve performance.

### 4. Idempotent Writes

Ensures that repeated submissions (due to retries or user behavior) do not create duplicate records.

### 5. Defensive Rendering

All data is validated before rendering (e.g., checking for arrays) to prevent runtime errors.

---

## Issues Faced and Fixes

---

### 1. TypeError: Cannot read properties of undefined (reading 'map')

Issue:
Frontend attempted to map over undefined data before API response arrived.

Fix:
Added defensive checks using `Array.isArray`.

---

### 2. Duplicate Submissions

Issue:
Users clicking submit multiple times caused duplicate entries.

Fix:

* Disabled submit button during request
* Added idempotency key in API

---

### 3. SQLite Deployment Failure on Vercel

Issue:
Native SQLite modules (sqlite3) failed due to binary compatibility issues (GLIBC mismatch) in the serverless environment.

Fix:
Switched to better-sqlite3 for local development and documented limitation for production deployment.


## Trade-offs

* SQLite chosen for simplicity, but not ideal for serverless deployment
* No authentication implemented (out of scope)
* Minimal styling to focus on functionality and correctness
* No pagination (dataset assumed small)

---

## Deployment

The application is deployed on Vercel.

Note:
SQLite is not fully supported in Vercel's serverless environment due to:

* Native module constraints
* Ephemeral filesystem

In a production setup, this should be replaced with a managed database such as PostgreSQL (e.g., Neon or Supabase).

---

## Future Improvements

* Replace SQLite with PostgreSQL for production readiness
* Add edit and delete functionality
* Add pagination for large datasets
* Add analytics or chart-based visualizations
* Add authentication and user-specific data

---
