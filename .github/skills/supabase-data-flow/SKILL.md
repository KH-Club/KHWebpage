---
name: supabase-data-flow
description: "Design or update Supabase data flow in the KH volunteer camp project. Use when you need to inspect services and types first, keep mapping in the service layer, and expose data through hooks with loading and error state."
argument-hint: "Design or update Supabase-backed data flow safely"
user-invocable: true
disable-model-invocation: false
---

# Supabase Data Flow

## When to Use

- When designing or updating Supabase-backed data flow in the KH volunteer camp web app
- When you need to inspect existing services, hooks, and types before making changes
- When you need a typed service -> hook -> component flow for new or updated data

## Procedure

1. Inspect the existing services, hooks, and types before touching data flow.
2. Verify the current Supabase schema and mapping assumptions from the codebase.
3. Keep all database-to-frontend mapping inside the service layer.
4. Expose the result through a hook that owns loading and error state.
5. Keep components focused on rendering and interaction only.

## Decision Rules

- Do not assume schema or field names.
- Do not call Supabase directly inside components.
- Do not invent tables, columns, or relationships.
- If schema is unclear, state what evidence is missing instead of guessing.
- Prefer the smallest safe change that fits the current architecture.

## Quality Checks

- The data flow should follow service -> hook -> component.
- The service should own queries and mapping.
- The hook should own state coordination.
- The component should stay presentational.

## Output Format

- Data flow summary
- Service changes
- Hook changes
- Open questions
- If something is unclear, call it out instead of guessing
