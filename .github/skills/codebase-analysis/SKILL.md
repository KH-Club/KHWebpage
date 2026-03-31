---
name: codebase-analysis
description: "Analyze the KH volunteer camp project before making changes. Use for inspecting structure, pages, services, hooks, Supabase usage, data flow, and reusable patterns without suggesting changes yet."
argument-hint: "Inspect project structure, data flow, and reusable parts without proposing changes"
user-invocable: true
disable-model-invocation: false
---

# Codebase Analysis

## When to Use

- Before making changes to the KH volunteer camp web app
- When you need a grounded view of the current project structure
- When you need to understand pages, services, hooks, components, and Supabase usage
- When you need to trace data flow and reusable patterns without proposing fixes yet

## Procedure

1. Inspect the app structure, routes, pages, shared components, hooks, services, and types.
2. Trace the data flow from service -> hook -> component, especially any Supabase usage and data mapping.
3. Identify existing features, reusable components, and patterns that are already in the codebase.
4. Report only what is verified in the code.
5. Stop at analysis; do not suggest changes, improvements, or refactors.

## Decision Rules

- If a feature or pattern is not present in the code, say it is unclear instead of guessing.
- If multiple implementations exist, compare them and describe the current pattern.
- If data flow crosses layers, describe the path explicitly and keep the summary grounded in file evidence.
- When identifying gaps, focus on camp discovery, registration,
  participant management, and UX — not random feature ideas.

## Quality Checks

- Use concise, evidence-based findings.
- Distinguish existing behavior from unknown or incomplete areas.
- Keep the output focused on structure, flow, and reusable parts only.
- Avoid recommendations, prioritization, or solutioning.

## Output Format

- High-level structure
- Data flow (service -> hook -> component)
- Existing reusable parts
- Missing features and UX gaps (relevant to volunteer camp platform only)
- If something is unclear, say so instead of guessing
