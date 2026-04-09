# Claude Code — Project Workflow Rules

## Setup
Requires the Trello MCP server to be configured and connected.
Board lists must follow this naming convention: `Backlog`, `In Progress`, `In Review`, `Done`.

## Feature development sequence

Follow this order strictly. Do not proceed to the next step until the current one is complete and confirmed by the user.

### 1. Read the card
The user provides a Trello card ID or name.
- Fetch the card via Trello MCP: title, description, checklist items, labels
- Read it fully
- Ask one question if anything is ambiguous. Do not assume scope.

### 2. Branch
Create a new branch from `main` before touching any code:
```
git checkout main && git pull && git checkout -b feature/<card-slug>
```
Derive the branch slug from the card title (lowercase, hyphenated, e.g. `feature/user-auth-login`).
Move the card to `In Progress`.

### 3. Scaffold and write tests
- Create the test file(s) for the feature
- Write all tests you can derive from the card: happy paths, edge cases, error cases
- Use the card's checklist items as acceptance criteria if present
- Tests must be runnable but are expected to fail at this stage (no implementation yet)
- Commit: `git commit -m "test: scaffold for <card-slug>"`

### 4. Wait for review
Stop. Present the full test list to the user for review.
Do not start implementation until the user explicitly approves or requests changes.

### 5. Implementation
Develop the feature to make the approved tests pass.
- Run the test suite after each meaningful change
- Do not modify tests to make them pass — fix the implementation
- If a test is genuinely wrong, flag it to the user before changing it

### 6. Validation
Run the full test suite. All tests must pass before proceeding.
Show the test output to the user and wait for confirmation.

### 7. Pull request
Only open a PR once all tests pass and the user confirms:
```
gh pr create --base main --title "feat: <card-title>" --body "<card-description>"
```
After the PR is open, move the card to `In Review` and post the PR URL as a comment on the card.

## Hard rules

- Do not skip or reorder steps
- Do not write implementation code before tests are approved
- Do not open a PR with failing tests
- Do not commit directly to `main` or `master`
- Do not infer or expand scope beyond what the card describes
