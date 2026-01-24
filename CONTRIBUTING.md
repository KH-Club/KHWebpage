# Contributing to KH Webpage

Thank you for your interest in contributing! Please follow these guidelines to ensure a smooth collaboration process.

## Development Workflow

### 1. Create a Feature Branch

```bash
# Make sure you're on the latest develop branch
git checkout develop
git pull origin develop

# Create a new feature branch
git checkout -b feature/your-feature-name
```

**Branch naming conventions:**
- `feature/` - New features (e.g., `feature/add-camp-filter`)
- `fix/` - Bug fixes (e.g., `fix/image-loading-issue`)
- `refactor/` - Code refactoring (e.g., `refactor/camp-card-component`)
- `docs/` - Documentation updates (e.g., `docs/update-readme`)

### 2. Make Your Changes

- Write clean, readable code
- Follow the existing code style
- Add tests for new functionality
- Update documentation if needed

### 3. Verify Your Changes Locally

Before pushing, run these checks:

```bash
# Format your code
yarn format

# Check for linting errors
yarn lint

# Run type checking
yarn typecheck

# Run all tests
yarn test:run

# Build to ensure no build errors
yarn build
```

**All checks must pass before opening a PR.**

## Pull Request Process

### Step 1: Open a Pull Request

1. Push your branch to the remote repository:
   ```bash
   git push -u origin feature/your-feature-name
   ```

2. Go to GitHub and create a Pull Request

3. Fill in the PR template with:
   - **Summary**: Brief description of changes
   - **Test Plan**: How the changes were tested
   - Link any related issues

### Step 2: Make CI Pass Before Requesting Review

- Wait for the GitHub Actions CI pipeline to complete
- The CI runs:
  1. **Code Quality**: Prettier, ESLint, TypeScript checks
  2. **Build**: Production build verification
  3. **Test**: Unit tests with coverage

- **Do NOT request a review until all CI checks are green** ✅

- If CI fails:
  1. Check the CI logs to identify the issue
  2. Fix the issues locally
  3. Push the fixes
  4. Wait for CI to pass

### Step 3: Request Review and Wait for Approval

- Once CI passes, request a review from the code owner
- Address any feedback or requested changes
- Push additional commits as needed (CI will re-run)
- Wait for approval from the reviewer

### Step 4: Let the Owner Merge

- **Do NOT merge your own PR**
- Once approved, the repository owner will merge the PR
- The owner may choose to:
  - Squash and merge (preferred for clean history)
  - Merge commit
  - Rebase and merge

## Code Review Guidelines

### For Authors

- Keep PRs focused and small when possible
- Respond to feedback constructively
- Explain your decisions when needed

### For Reviewers

- Be respectful and constructive
- Focus on:
  - Code correctness
  - Performance implications
  - Test coverage
  - Code readability
  - Adherence to project conventions

## Quick Reference

| Step | Action | Who |
|------|--------|-----|
| 1 | Open PR | Contributor |
| 2 | Make CI pass | Contributor |
| 3 | Request review | Contributor |
| 4 | Review & approve | Reviewer |
| 5 | Merge | Owner |

## Getting Help

If you have questions or need help:
- Check existing issues and PRs
- Ask in the PR comments
- Contact the repository maintainers

---

Happy coding! 🏕️
