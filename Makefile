COMPOSE ?= docker compose
APP_SERVICE ?= app

.PHONY: dev dev-down dev-logs db-migrate db-migrate-deploy db-seed db-seed-requests

dev:
	./scripts/dev.sh

dev-down:
	$(COMPOSE) down

dev-logs:
	$(COMPOSE) logs -f

db-migrate:
	$(COMPOSE) run --rm $(APP_SERVICE) corepack pnpm db:migrate

db-migrate-deploy:
	$(COMPOSE) run --rm $(APP_SERVICE) corepack pnpm db:migrate:deploy

db-seed:
	$(COMPOSE) run --rm $(APP_SERVICE) corepack pnpm db:seed

db-seed-requests:
	$(COMPOSE) run --rm $(APP_SERVICE) corepack pnpm db:seed:requests
