# Claude Code — Project Workflow Rules

## Setup
Requires Trello MCP server connected.
Board lists: `Backlog`, `In Progress`, `In Review`, `Done`.

## Card format

Card descriptions should follow this structure, where AC and TC stand for acceptance critera and test cases:

```
## AC
- Given X, when Y, then Z

## TC
- Happy: ...
- Edge: ...
- Error: ...
```

`## TC` is optional — Claude will derive test cases from Acceptance critera (AC) `## AC` if absent.

## Feature development sequence

Follow this order strictly. Each step requires explicit user confirmation before proceeding.

### 1. Read the card
User provides a Trello card ID or name.
- Fetch via Trello MCP: title, description, labels
- Parse `## AC` and `## TC` sections from the description
- If `## TC` is present, use it directly
- If only `## AC` is present, derive test cases from it
- If neither is present, ask the user before proceeding
- Ask one question if anything else is ambiguous. Do not assume scope.

### 2. Branch
```
git checkout main && git pull && git checkout -b feature/<card-slug>
```
Derive slug from card title (lowercase, hyphenated: `feature/user-auth-login`).
Move card to `In Progress`.

### 3. Scaffold tests
- Create test files for the feature
- Cover happy paths, edge cases, error cases per TC (or derived from AC)
- Tests must be runnable; expected to fail at this stage

### 4. Wait for review
- Present the full test list. Do not begin implementation until the user approves.
- Commit: `git commit -m "test: scaffold for <card-slug>"`

### 5. Implementation
Be mindfull about token consumption.
Make the approved tests pass.
- Run tests after each meaningful change
- Do not modify tests to force a pass — fix the implementation
- If a test is wrong, flag it before changing it

### 6. Validation
- Run full test suite. All tests must pass.
- Show output and wait for user confirmation.

### 7. Pull request
```
gh pr create --base main --title "feat: <card-title>" --body "<card-description>"
```
Move card to `In Review`. Post PR URL as a card comment.

## Hard rules
- No step skipping or reordering
- No implementation before tests are approved
- No PR with failing tests
- No commits to `main` or `master`
- No scope beyond what the card describes