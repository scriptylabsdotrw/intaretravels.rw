#!/bin/bash

echo "🚀 Starting deployment..."

# Pull latest changes
echo "📥 Pulling latest code..."
git pull origin main

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# Generate Prisma client
echo "🗄️ Generating Prisma client..."
pnpm db:generate

# Push database changes
echo "🗄️ Updating database..."
pnpm db:push

# Build applications
echo "🔨 Building applications..."
pnpm build

# Restart PM2 processes
echo "♻️ Restarting applications..."
pm2 restart intaretravels-web
pm2 restart intaretravels-admin

echo "✅ Deployment complete!"
pm2 status
