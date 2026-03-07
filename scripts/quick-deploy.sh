#!/bin/bash

# Quick deployment script - run from local machine
# This pushes code and triggers deployment on server

SERVER_IP="138.197.37.27"
SERVER_USER="root"

echo "🚀 Deploying to intaretravels.rw..."

# Push to git
echo "📤 Pushing to repository..."
git add .
git commit -m "Deploy: $(date '+%Y-%m-%d %H:%M:%S')"
git push origin main

# Deploy on server
echo "🔄 Running deployment on server..."
ssh $SERVER_USER@$SERVER_IP << 'ENDSSH'
cd /var/www/intaretravels
./deploy.sh
ENDSSH

echo "✅ Deployment complete!"
echo ""
echo "Check status: ssh root@138.197.37.27 'pm2 status'"
echo "View logs: ssh root@138.197.37.27 'pm2 logs'"
