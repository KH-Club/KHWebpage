---
name: safe-refactor
description: "Refactor existing KH volunteer camp code safely without changing behavior. Use when you need readability or structure improvements only."
argument-hint: "Refactor code safely without changing behavior"
user-invocable: true
disable-model-invocation: false
---

# Safe Refactor

## When to Use

- When refactoring existing code in the KH volunteer camp web app
- When you need readability or structure improvements without changing behavior
- When you want a small, scoped cleanup instead of a broad rewrite

## Procedure

1. Inspect the current code and understand the existing behavior.
2. Identify small refactor opportunities that improve readability or structure only.
3. Keep the behavior identical and avoid unrelated changes.
4. Prefer local edits that stay within the current file or feature boundary.
5. Validate that the refactor does not alter observable behavior.

## Decision Rules

- Do not change behavior.
- Do not refactor unrelated parts of the codebase.
- Do not introduce new abstractions unless they clearly reduce complexity.
- If a change could alter behavior, stop and call it out.
- Keep the scope as small as possible.

## Quality Checks

- The code should be easier to read or maintain after the refactor.
- The visible behavior should remain unchanged.
- The refactor should stay within the existing architecture.
- The plan should avoid churn and unnecessary file touches.

## Output Format

- Safe refactor opportunities
- Suggested minimal changes
- Validation notes
- If something is risky, say so instead of guessing
