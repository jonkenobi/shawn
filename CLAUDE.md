# CLAUDE.md

## Project overview

**Jon's Tokyo** — a personal guide to Jon's favourite restaurants, cafes, and bars in Tokyo.
Shareable with friends and useful when you're already in an area and want to know what Jon liked nearby.

Two sections:
- **Areas** — Tokyo neighbourhoods rated on coffee / drinks / nature / shopping. Data served from the existing AWS Lambda + DynamoDB backend.
- **My Lists** — Jon's curated Google My Maps lists, embedded inline via iframe or linked out.

## Repo structure

```
frontend/          React + Vite + Tailwind v4 frontend (new app)
serverless-backend/ Existing AWS Lambda + DynamoDB + Terraform backend
src/               Old Angular app (being replaced — do not touch)
docker-compose.yml Runs the frontend locally via Docker
```

## How to run locally

Requires Docker Desktop running.

```bash
docker compose up --build
```

Then open: http://localhost:5173/shawn/

Hot-reload is enabled — edits to `frontend/src/` reflect immediately without rebuilding.

To stop: `Ctrl+C`, then `docker compose down`.

## Frontend stack

- React 19 + TypeScript
- Vite 6 (with `--host` flag so Docker port-forwarding works)
- Tailwind CSS v4 via `@tailwindcss/vite` plugin (no config file needed)

Key files:
- `frontend/src/data/lists.ts` — add/edit Google My Maps list IDs and names here
- `frontend/src/hooks/useAreas.ts` — fetches area data from the AWS API
- `frontend/src/components/AreasTab.tsx` — areas grid with vibe-score sorting
- `frontend/src/components/ListsTab.tsx` — My Lists grid with iframe embed support

## Adding a Google My Maps list

1. Go to [mymaps.google.com](https://mymaps.google.com) and open your map
2. Click **Share** → copy the URL
3. Extract the map ID — it's the long string after `/d/` in the URL
4. Open `frontend/src/data/lists.ts` and set `myMapsId` on the relevant list entry
5. The card will show a "View on map" button that expands an iframe embed

## Backend API

Existing AWS API Gateway (not changed in this rewrite):
- `GET /user/areas` — returns area records with scores (coffee, drinks, nature, shopping 1–5)
- `GET /user/places` — returns individual places (not used by new frontend yet)

Base URL: `https://pnsqr5ug4b.execute-api.ap-northeast-1.amazonaws.com/dev`

Backend infrastructure lives in `serverless-backend/terraform/`. Do not modify without understanding Terraform state.

## Branch

Active development branch: `claude/new-session-aylad9`
Main branch: `master`
