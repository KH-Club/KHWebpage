---
name: feature-planning
description: "Plan a new feature for the KH volunteer camp project. Use when you need to analyze the existing implementation, identify what is missing, and propose a feature that fits the current structure without introducing new frameworks."
argument-hint: "Analyze the current app, identify gaps, and propose a minimal feature plan"
user-invocable: true
disable-model-invocation: false
---

# Feature Planning

## When to Use

- When planning a new feature for the KH volunteer camp web app
- When you need to study the current implementation before proposing a feature
- When you want a feature plan that fits the existing pages, services, hooks, and Supabase usage
- When you need a minimal, practical set of changes instead of a broad redesign

## Procedure

1. Analyze the existing implementation: routes, pages, services, hooks, shared components, and types.
2. Identify what is already implemented and what is missing or incomplete for the requested feature.
3. Propose a feature that fits the current architecture and existing data flow.
4. Map the feature to the best existing place in the app, such as a page, service, or hook.
5. Keep the required changes minimal and scoped to the current structure.

## Decision Rules

- If a capability already exists, reuse it instead of duplicating it.
- If the data shape or schema is unclear, say so instead of guessing.
- Do not introduce new frameworks, backend services, or parallel architecture.
- Keep the feature aligned with service -> hook -> component patterns.
- Prefer changes that extend current components and services over new abstractions.

## Quality Checks

- The feature should be directly relevant to the volunteer camp platform.
- The plan should be grounded in the actual codebase.
- The proposal should be realistic to implement within the existing Vite + React + Supabase stack.
- The output should stay concise and practical.

## Output Format

- Feature description
- Where it fits (page / service / hook)
- Required changes (minimal)
- If something is unclear, call it out instead of guessing
