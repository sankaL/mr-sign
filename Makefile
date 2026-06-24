COMPOSE ?= docker compose

.PHONY: dev dev-down dev-logs

dev:
	./scripts/dev.sh

dev-down:
	$(COMPOSE) down

dev-logs:
	$(COMPOSE) logs -f app
