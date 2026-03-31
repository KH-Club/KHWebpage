---
name: senior-frontend-code-review
description: "Review frontend code in the KH volunteer camp website as a senior engineer. Use when checking architecture consistency, code quality, reusability, and performance without rewriting everything."
argument-hint: "Review frontend code changes and return only high-impact findings"
user-invocable: true
disable-model-invocation: false
---

# Senior Frontend Code Review

## When to Use

- When reviewing frontend code changes in the KH volunteer camp web app
- When you need high-impact feedback on architecture, quality, reuse, or performance
- When you want a review that stays grounded in the current codebase and existing patterns

## Procedure

1. Inspect the relevant files and surrounding context.
2. Check architecture consistency, especially service -> hook -> component flow.
3. Look for code quality issues, duplicate logic, or missed shared abstractions.
4. Check performance risks such as redundant fetches, unnecessary renders, or costly effects.
5. Report only the highest-impact issues with concrete fixes.

## Decision Rules

- Do not focus on low-value style nitpicks.
- Do not suggest broad refactors unless the risk is high.
- Do not propose changes without evidence in the codebase.
- If there are no high-impact issues, say that clearly.

## Quality Checks

- Findings should be prioritized by impact and likelihood.
- Recommendations should be specific and actionable.
- Keep the review concise and practical.
- Ground every issue in the actual repository.

## Output Format

- Issues found
- Suggested fixes
- Optional improvements
- Mention file references when relevant
