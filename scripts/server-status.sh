#!/bin/bash

# Check server status

SERVER_IP="138.197.37.27"
SERVER_USER="root"

echo "📊 Checking intaretravels.rw server status..."
echo ""

ssh $SERVER_USER@$SERVER_IP << 'ENDSSH'
echo "=== PM2 Processes ==="
pm2 status

echo ""
echo "=== Nginx Status ==="
systemctl status nginx --no-pager | head -n 10

echo ""
echo "=== Database Status ==="
systemctl status postgresql --no-pager | head -n 10

echo ""
echo "=== Disk Usage ==="
df -h | grep -E "Filesystem|/$"

echo ""
echo "=== Memory Usage ==="
free -h

echo ""
echo "=== Recent Logs (last 20 lines) ==="
pm2 logs --lines 20 --nostream
ENDSSH
