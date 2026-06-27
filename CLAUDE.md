# CLAUDE.md

## Project overview

**Shawn** — a personal guide to Jon's favourite restaurants, cafes, and bars in Tokyo. (App name is a placeholder for now.)
Shareable with friends and useful when you're already in an area and want to know what Jon liked nearby.

Two sections:
- **Areas** — Tokyo neighbourhoods rated on coffee / drinks / nature / shopping. Data served from the existing AWS Lambda + DynamoDB backend.
- **My Lists** — Jon's curated Google Maps lists, linked out.

## Repo structure

```
frontend/          React + Vite + Tailwind v4 frontend (new app)
serverless-backend/ AWS Lambda + DynamoDB + Terraform backend
legacy-angular-app/ Old Angular app (being replaced — do not touch)
docker-compose.yml Runs the frontend locally via Docker
```

## How to run locally

Requires Docker Desktop running.

```bash
docker compose up --build
```

Then open: http://localhost:5173/shawn/

Hot-reload is enabled — edits to `frontend/src/` reflect immediately without rebuilding.

To stop: `docker compose down`.

## Frontend stack

- React 19 + TypeScript
- Vite 6 (with `--host` flag so Docker port-forwarding works)
- Tailwind CSS v4 via `@tailwindcss/vite` plugin (no config file needed)

Key files:
- `frontend/src/data/lists.ts` — add/edit list entries (name, emoji, description, Google Maps `linkUrl`) here
- `frontend/src/hooks/useAreas.ts` — fetches area data from the AWS API
- `frontend/src/components/AreasTab.tsx` — areas grid with vibe-score sorting
- `frontend/src/components/ListsTab.tsx` — My Lists grid

## Adding a Google Maps list

1. You give me the Google Maps share URL (e.g. `https://maps.app.goo.gl/...`) and which list it belongs to.
2. I add/update the entry's `linkUrl` in `frontend/src/data/lists.ts` — no need to extract a map ID.

## Backend API

Existing AWS API Gateway (not changed in this rewrite):
- `GET /user/areas` — returns area records with scores (coffee, drinks, nature, shopping 1–5)
- `GET /user/places` — returns individual places (not used by new frontend yet)

Base URL: `https://pnsqr5ug4b.execute-api.ap-northeast-1.amazonaws.com/dev`

Backend infrastructure lives in `serverless-backend/terraform/`. Do not modify without understanding Terraform state.

## AI skills, agents, and MCP configs

If you use a skill that isn't yet committed in `.claude/skills/`, copy it into the repo's `.claude/` directory and commit it as part of the change.