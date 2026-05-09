# 2026-05-08 Docker Dev Hot Reload

## Summary

- Fixed `make dev` so the app service runs the Next.js development server instead of the production `next start` server.
- Added a Dockerfile `dev` target based on the dependency stage.
- Updated Docker Compose to bind-mount the repository into the app container and keep dependency and `.next` paths on container volumes.
- Recreated the app service and confirmed the container runs `next dev --hostname 0.0.0.0`.

## Edited Files

- `Dockerfile`
- `docker-compose.yml`
- `docs/eng/mr-sign-build-plan.md`
- `docs/eng/task-output/2026-05-08-docker-dev-hot-reload.md`
