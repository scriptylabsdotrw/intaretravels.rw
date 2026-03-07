#!/bin/bash

# Start applications with PM2

set -e

echo "🚀 Starting Intare Travels applications..."

cd /var/www/intaretravels

# Start web app
echo "🌐 Starting web app (port 3000)..."
cd apps/web
pm2 start npm --name "intaretravels-web" -- start
cd ../..

# Start admin app
echo "🔐 Starting admin app (port 3001)..."
cd apps/admin
pm2 start npm --name "intaretravels-admin" -- start
cd ../..

# Save PM2 configuration
pm2 save

echo ""
echo "✅ Applications started!"
echo ""
pm2 status
