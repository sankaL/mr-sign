#!/bin/bash
set -e

# Ensure .env exists
if [ ! -f .env ]; then
  echo "⚠️ .env file not found, copying from .env.example..."
  cp .env.example .env
fi

# Function to check if a port is in use on localhost
is_port_in_use() {
  local port=$1
  nc -z 127.0.0.1 "$port" >/dev/null 2>&1
}

# Function to find the next free port
find_free_port() {
  local port=$1
  while is_port_in_use "$port"; do
    port=$((port + 1))
  done
  echo "$port"
}

# Helper to update env file
update_env_var() {
  local key=$1
  local val=$2
  if grep -q "^${key}=" .env; then
    # Use temp file to be safe across different sed versions (macOS/Linux)
    sed -e "s|^${key}=.*|${key}=${val}|" .env > .env.tmp && mv .env.tmp .env
  else
    echo "${key}=${val}" >> .env
  fi
}

# 1. Handle DB_PORT
DB_PORT=$(grep -E '^DB_PORT=' .env | cut -d'=' -f2)
DB_PORT=${DB_PORT:-5432}

# Check if db container is already running
DB_RUNNING=$(docker compose ps db --status running -q 2>/dev/null || true)

if [ -z "$DB_RUNNING" ]; then
  if is_port_in_use "$DB_PORT"; then
    echo "⚠️ Port $DB_PORT is already in use by another process."
    NEW_DB_PORT=$(find_free_port "$DB_PORT")
    echo "🔄 Dynamically shifting DB_PORT: $DB_PORT -> $NEW_DB_PORT"
    
    # Update DB_PORT in .env
    update_env_var "DB_PORT" "$NEW_DB_PORT"
    
    # Update DATABASE_URL in .env to match the new port
    CURRENT_DATABASE_URL=$(grep -E '^DATABASE_URL=' .env | cut -d'=' -f2-)
    if [ -n "$CURRENT_DATABASE_URL" ]; then
      NEW_DATABASE_URL=$(echo "$CURRENT_DATABASE_URL" | sed -E "s|localhost:[0-9]+|localhost:${NEW_DB_PORT}|" | sed -E "s|127\.0\.0\.1:[0-9]+|127.0.0.1:${NEW_DB_PORT}|")
      update_env_var "DATABASE_URL" "$NEW_DATABASE_URL"
    fi
    DB_PORT=$NEW_DB_PORT
  fi
else
  echo "ℹ️ Database container is already running on port $DB_PORT."
fi

# 2. Handle APP_PORT
APP_PORT=$(grep -E '^APP_PORT=' .env | cut -d'=' -f2)
APP_PORT=${APP_PORT:-3000}

# Check if app container is already running
APP_RUNNING=$(docker compose ps app --status running -q 2>/dev/null || true)

if [ -z "$APP_RUNNING" ]; then
  if is_port_in_use "$APP_PORT"; then
    echo "⚠️ Port $APP_PORT is already in use by another process."
    NEW_APP_PORT=$(find_free_port "$APP_PORT")
    echo "🔄 Dynamically shifting APP_PORT: $APP_PORT -> $NEW_APP_PORT"
    
    # Update APP_PORT in .env
    update_env_var "APP_PORT" "$NEW_APP_PORT"
    
    # Update BETTER_AUTH_URL and NEXT_PUBLIC_SITE_URL in .env
    CURRENT_AUTH_URL=$(grep -E '^BETTER_AUTH_URL=' .env | cut -d'=' -f2-)
    if [ -n "$CURRENT_AUTH_URL" ]; then
      NEW_AUTH_URL=$(echo "$CURRENT_AUTH_URL" | sed -E "s|localhost:[0-9]+|localhost:${NEW_APP_PORT}|" | sed -E "s|127\.0\.0\.1:[0-9]+|127.0.0.1:${NEW_APP_PORT}|")
      update_env_var "BETTER_AUTH_URL" "$NEW_AUTH_URL"
    fi
    
    CURRENT_SITE_URL=$(grep -E '^NEXT_PUBLIC_SITE_URL=' .env | cut -d'=' -f2-)
    if [ -n "$CURRENT_SITE_URL" ]; then
      NEW_SITE_URL=$(echo "$CURRENT_SITE_URL" | sed -E "s|localhost:[0-9]+|localhost:${NEW_APP_PORT}|" | sed -E "s|127\.0\.0\.1:[0-9]+|127.0.0.1:${NEW_APP_PORT}|")
      update_env_var "NEXT_PUBLIC_SITE_URL" "$NEW_SITE_URL"
    fi
    APP_PORT=$NEW_APP_PORT
  fi
else
  echo "ℹ️ App container is already running on port $APP_PORT."
fi

echo "🚀 Starting development environment (DB on localhost:$DB_PORT, App on http://localhost:$APP_PORT)..."
docker compose up --build
