#!/usr/bin/env bash
# ==============================================================================
# PostgreSQL Database Restoration Script
# Developer Portfolio - Production Disaster Recovery
# Usage: ./scripts/restore-db.sh /path/to/db_backup_YYYY-MM-DD_HHMMSS.sql.gz
# ==============================================================================
set -euo pipefail

BACKUP_FILE="${1:-}"
CONTAINER_NAME="${CONTAINER_NAME:-portfolio-postgres}"
POSTGRES_USER="${POSTGRES_USER:-postgres}"
POSTGRES_DB="${POSTGRES_DB:-portfolio_db}"

if [ -z "${BACKUP_FILE}" ]; then
  echo "❌ Error: Please provide the path to the backup file to restore."
  echo "Usage: $0 /var/backups/portfolio-db/db_backup_YYYY-MM-DD_HHMMSS.sql.gz"
  exit 1
fi

if [ ! -f "${BACKUP_FILE}" ]; then
  echo "❌ Error: File '${BACKUP_FILE}' does not exist!"
  exit 1
fi

echo "=================================================="
echo "⚠️  DATABASE RESTORATION WARNING ⚠️"
echo "Target Container: ${CONTAINER_NAME}"
echo "Target Database:  ${POSTGRES_DB}"
echo "Backup File:      ${BACKUP_FILE}"
echo "This will OVERWRITE the current contents of '${POSTGRES_DB}'."
echo "=================================================="

# Prompt for confirmation if running interactively
if [ -t 0 ]; then
  read -p "Are you sure you want to proceed with restore? (yes/no): " CONFIRM
  if [ "${CONFIRM}" != "yes" ]; then
    echo "Restoration cancelled by user."
    exit 0
  fi
fi

# 1. Verify container is running
if ! docker ps --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
  echo "❌ Error: Docker container '${CONTAINER_NAME}' is not running!" >&2
  exit 1
fi

# 2. Decompress and pipe into psql
echo "⏳ Restoring database from ${BACKUP_FILE}..."
if gunzip -c "${BACKUP_FILE}" | docker exec -i "${CONTAINER_NAME}" psql -U "${POSTGRES_USER}" -d "${POSTGRES_DB}"; then
  echo "✅ Database restored successfully!"
else
  echo "❌ Database restoration failed!" >&2
  exit 1
fi
