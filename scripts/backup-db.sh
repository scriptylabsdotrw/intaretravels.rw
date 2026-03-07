#!/bin/bash

# Backup database from server to local machine

SERVER_IP="138.197.37.27"
SERVER_USER="root"
BACKUP_DIR="./backups"
DATE=$(date +%Y%m%d_%H%M%S)

echo "💾 Backing up database..."

# Create local backup directory
mkdir -p $BACKUP_DIR

# Create backup on server and download
ssh $SERVER_USER@$SERVER_IP << ENDSSH
cd /tmp
pg_dump -U intaretravels_user intaretravels > intaretravels_backup_$DATE.sql
ENDSSH

# Download backup
scp $SERVER_USER@$SERVER_IP:/tmp/intaretravels_backup_$DATE.sql $BACKUP_DIR/

# Clean up server
ssh $SERVER_USER@$SERVER_IP "rm /tmp/intaretravels_backup_$DATE.sql"

echo "✅ Backup saved to: $BACKUP_DIR/intaretravels_backup_$DATE.sql"
