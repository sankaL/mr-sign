# 2026-05-07 Dockerized App and Database

## Summary

Added a two-service Docker setup for local development and Railway deployment planning: one container for the Next.js app and one PostgreSQL container for the database.

## Edited Files

- `.dockerignore`
- `.env.example`
- `Dockerfile`
- `Makefile`
- `README.md`
- `apps/web/.env.example`
- `docker-compose.yml`
- `docs/eng/decisions/decision-log-001.md`
- `docs/eng/mr-sign-build-plan.md`
- `docs/eng/mr-sign-tech-stack.md`
- `docs/eng/task-output/2026-05-07-dockerized-app-and-database.md`

## Notes

- `make dev` now runs Docker Compose with the app and database services.
- The local database uses a named Docker volume for persistence.
- Railway planning now uses a Docker PostgreSQL service with a persistent volume mounted at `/var/lib/postgresql/data`.
- Follow-up review fixes bound the database port to loopback, require a non-placeholder auth secret at startup, and add `make db-migrate-deploy` for deploy-safe migrations.
