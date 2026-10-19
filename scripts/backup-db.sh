#!/usr/bin/env bash
# ==============================================================================
# Automated PostgreSQL Backup Script with 7-Day Retention
# Developer Portfolio - Production Disaster Recovery
# ==============================================================================
set -euo pipefail

BACKUP_DIR="${BACKUP_DIR:-/var/backups/portfolio-db}"
CONTAINER_NAME="${CONTAINER_NAME:-portfolio-postgres}"
POSTGRES_USER="${POSTGRES_USER:-postgres}"
POSTGRES_DB="${POSTGRES_DB:-portfolio_db}"
RETENTION_DAYS="${RETENTION_DAYS:-7}"

TIMESTAMP=$(date +"%Y-%m-%d_%H%M%S")
BACKUP_FILE="${BACKUP_DIR}/db_backup_${TIMESTAMP}.sql.gz"

echo "=================================================="
echo "🕒 [$(date '+%Y-%m-%d %H:%M:%S')] Starting PostgreSQL Database Backup"
echo "=================================================="

# 1. Ensure backup directory exists
mkdir -p "${BACKUP_DIR}"

# 2. Verify container is running
if ! docker ps --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
  echo "❌ Error: Docker container '${CONTAINER_NAME}' is not running!" >&2
  exit 1
fi

# 3. Perform pg_dump and compress with gzip
echo "📦 Dumping database '${POSTGRES_DB}' from container '${CONTAINER_NAME}'..."
if docker exec "${CONTAINER_NAME}" pg_dump -U "${POSTGRES_USER}" -d "${POSTGRES_DB}" --clean --if-exists | gzip > "${BACKUP_FILE}"; then
  # 4. Verify file was created and is non-empty
  if [ -s "${BACKUP_FILE}" ]; then
    FILESIZE=$(du -h "${BACKUP_FILE}" | cut -f1)
    echo "✅ Backup successfully created:"
    echo "   File: ${BACKUP_FILE}"
    echo "   Size: ${FILESIZE}"
  else
    echo "❌ Error: Backup file created but is empty!" >&2
    rm -f "${BACKUP_FILE}"
    exit 1
  fi
else
  echo "❌ Error: pg_dump execution failed!" >&2
  rm -f "${BACKUP_FILE}"
  exit 1
fi

# 5. Clean up backups older than RETENTION_DAYS
echo "🧹 Purging backups older than ${RETENTION_DAYS} days..."
DELETED_COUNT=$(find "${BACKUP_DIR}" -type f -name "db_backup_*.sql.gz" -mtime +"${RETENTION_DAYS}" | wc -l)
find "${BACKUP_DIR}" -type f -name "db_backup_*.sql.gz" -mtime +"${RETENTION_DAYS}" -exec rm -f {} +
echo "   Removed ${DELETED_COUNT} old backup(s)."

echo "🎉 Backup routine completed successfully at $(date '+%Y-%m-%d %H:%M:%S')!"
echo "=================================================="
