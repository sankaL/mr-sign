#!/bin/bash
set -e

if [ ! -f .env ]; then
  echo ".env file not found, copying from .env.example..."
  cp .env.example .env
fi

is_port_in_use() {
  local port=$1
  nc -z 127.0.0.1 "$port" >/dev/null 2>&1
}

find_free_port() {
  local port=$1
  while is_port_in_use "$port"; do
    port=$((port + 1))
  done
  echo "$port"
}

update_env_var() {
  local key=$1
  local val=$2
  if grep -q "^${key}=" .env; then
    sed -e "s|^${key}=.*|${key}=${val}|" .env > .env.tmp && mv .env.tmp .env
  else
    echo "${key}=${val}" >> .env
  fi
}

APP_PORT=$(grep -E '^APP_PORT=' .env | cut -d'=' -f2)
APP_PORT=${APP_PORT:-3000}

APP_RUNNING=$(docker compose ps app --status running -q 2>/dev/null || true)

if [ -z "$APP_RUNNING" ] && is_port_in_use "$APP_PORT"; then
  NEW_APP_PORT=$(find_free_port "$APP_PORT")
  echo "Port $APP_PORT is already in use. Using $NEW_APP_PORT instead."
  update_env_var "APP_PORT" "$NEW_APP_PORT"
  update_env_var "NEXT_PUBLIC_SITE_URL" "http://localhost:${NEW_APP_PORT}"
  APP_PORT=$NEW_APP_PORT
fi

echo "Starting static site development environment at http://localhost:$APP_PORT..."
docker compose up --build
