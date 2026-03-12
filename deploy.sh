#!/bin/bash

set -e  # Exit on any error

echo "🚀 Starting deployment..."
echo "📅 Deployment started at: $(date)"

# Store the current commit
CURRENT_COMMIT=$(git rev-parse HEAD)
echo "📝 Current commit: $CURRENT_COMMIT"

# Pull latest changes
echo "📥 Pulling latest code..."
git pull origin main

NEW_COMMIT=$(git rev-parse HEAD)
echo "📝 New commit: $NEW_COMMIT"

# Check if there are actual changes
if [ "$CURRENT_COMMIT" = "$NEW_COMMIT" ]; then
    echo "ℹ️ No new changes to deploy"
    exit 0
fi

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install --frozen-lockfile

# Generate Prisma client (if using Prisma)
if [ -f "prisma/schema.prisma" ]; then
    echo "🗄️ Generating Prisma client..."
    pnpm db:generate
    
    echo "🗄️ Updating database..."
    pnpm db:push
fi

# Build applications
echo "🔨 Building applications..."
pnpm build

# Check if PM2 processes exist, if not start them
if ! pm2 list | grep -q "intaretravels-web"; then
    echo "🆕 Starting web application..."
    cd apps/web
    pm2 start npm --name "intaretravels-web" -- start
    cd ../..
else
    echo "♻️ Restarting web application..."
    pm2 restart intaretravels-web
fi

if ! pm2 list | grep -q "intaretravels-admin"; then
    echo "🆕 Starting admin application..."
    cd apps/admin
    pm2 start npm --name "intaretravels-admin" -- start
    cd ../..
else
    echo "♻️ Restarting admin application..."
    pm2 restart intaretravels-admin
fi

# Save PM2 configuration
pm2 save

echo "✅ Deployment complete!"
echo "📅 Deployment finished at: $(date)"
echo ""
echo "📊 Application Status:"
pm2 status

echo ""
echo "🌐 URLs:"
echo "   - Website: https://intaretravels.rw"
echo "   - Admin: https://admin.intaretravels.rw"
