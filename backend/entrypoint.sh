#!/bin/sh

# Exit immediately if a command exits with a non-zero status.
set -e

echo "Running database migrations..."
# The 'up' command is idempotent, meaning it's safe to run multiple times.
# It will only apply migrations that haven't been applied yet.
npm run migrate up

echo "Migrations complete. Starting the server..."

# exec "$@" allows us to pass commands from the Dockerfile's CMD
# It also ensures that the Node process receives signals (like SIGTERM) correctly
# for graceful shutdown.
exec "$@"