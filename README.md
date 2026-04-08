# Stylist

A monorepo for the Stylist application.

## Structure

```
stylist/
├── apps/
│   ├── api/          # Hono + TypeScript REST API
│   └── web/          # Quasar + Vue 3 + TypeScript frontend
├── packages/
│   └── shared/       # Shared TypeScript types
├── services/
│   └── ai/           # FastAPI + Python AI service
└── infrastructure/   # Terraform (empty)
```

## Prerequisites

- Node.js >= 20
- pnpm >= 9
- Python >= 3.12

## Setup

```bash
# Install Node.js dependencies
pnpm install

# Set up Python AI service
cd services/ai
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -e ".[dev]"
```

## Development

```bash
# Run API
pnpm dev:api

# Run web
pnpm dev:web
```

## Building

```bash
# Build all packages and apps
pnpm build
```
