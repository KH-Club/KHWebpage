---
name: debugging
description: "Trace bugs through service, hook, and component layers in the KH volunteer camp website. Use when you need the root cause, not just the symptom."
argument-hint: "Trace an issue through the codebase and identify the root cause"
user-invocable: true
disable-model-invocation: false
---

# Debugging

## When to Use

- When tracing an issue in the KH volunteer camp web app
- When you need to follow behavior through service, hook, and component layers
- When you need to identify a root cause before suggesting a fix

## Procedure

1. Inspect the visible symptom and the relevant user flow.
2. Trace the data flow through the component, hook, and service layers.
3. Compare the observed behavior against the code to isolate the root cause.
4. Confirm the smallest likely fix and any prevention improvement.
5. Report the evidence clearly and avoid guessing.

## Decision Rules

- Do not jump to conclusions based on symptoms alone.
- Do not invent missing behavior or schema.
- If evidence is incomplete, state what is missing instead of guessing.
- Keep the fix suggestion minimal and focused.

## Quality Checks

- Root cause should be backed by code evidence.
- Fix suggestion should be the smallest safe change.
- Preventive improvement should reduce the same class of bug in the future.
- Keep the analysis concise and grounded in the repository.

## Output Format

- Root cause
- Fix suggestion
- Preventive improvement
- Mention file references when relevant
