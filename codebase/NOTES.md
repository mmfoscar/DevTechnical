# Codebase Task 1 & 2
This is a minimal API that syncs orders and records funnel events. It has bugs and is incomplete.

## Your to-dos:
1. Fix all bugs in the existing code so the tests pass and the app behaves correctly.
2. Add one feature: Support an optional 'idempotencyKey' on 'POST /api/orders/sync'. If the same key is sent again, return the existing sync result without creating a duplicate or calling the warehouse twice.

## How to run

```bash
npm install
npm run test
npm start
```

## Success criteria
- `npm run test` passes.
- Your changes are minimal and focused (no refactors unless needed for the feature).
- You do NOT add new dependencies unless necessary.