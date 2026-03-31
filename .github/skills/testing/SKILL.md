---
name: testing
description: "Write behavior-focused tests for the KH volunteer camp website using Vitest and React Testing Library. Use when covering hooks, services, and components with edge cases and regression checks."
argument-hint: "Write focused tests for the current codebase"
user-invocable: true
disable-model-invocation: false
---

# Testing

## When to Use

- When writing tests for hooks, services, and components in the KH volunteer camp web app
- When you need behavior-first coverage with Vitest and React Testing Library
- When you need edge cases and regression coverage without testing implementation details

## Procedure

1. Inspect the component, hook, or service and identify the behavior boundaries.
2. Derive test cases from real usage, edge cases, and failure paths.
3. Prioritize hooks and services first, then component behavior that matters to users.
4. Write focused tests that validate observable outcomes.
5. Run validation and adjust only test-related issues when needed.

## Decision Rules

- Do not test implementation details that users cannot observe.
- Do not introduce unrelated test scaffolding.
- Do not rewrite production code unless the task explicitly requires it.
- If behavior is unclear, call out the missing evidence before writing tests.

## Quality Checks

- Tests should reflect real user behavior.
- Edge cases should be covered where they matter.
- Keep the test scope small and purposeful.
- Prefer maintainable tests over brittle ones.

## Output Format

- Test cases
- Edge cases
- Mention file references when relevant
