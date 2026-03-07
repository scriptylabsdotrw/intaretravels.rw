#!/bin/bash

# Server Setup Script for intaretravels.rw
# Run this script on your VPS after first login

set -e

echo "=========================================="
echo "Intare Travels - Server Setup"
echo "=========================================="
echo ""

# Update system
echo "📦 Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install Node.js 20.x
echo "📦 Installing Node.js 20.x..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install pnpm
echo "📦 Installing pnpm..."
npm install -g pnpm

# Install PM2
echo "📦 Installing PM2..."
npm install -g pm2

# Install PostgreSQL
echo "📦 Installing PostgreSQL..."
sudo apt install -y postgresql postgresql-contrib

# Install Git
echo "📦 Installing Git..."
sudo apt install -y git

# Configure PostgreSQL
echo "🗄️ Configuring PostgreSQL..."
sudo -u postgres psql <<EOF
CREATE DATABASE intaretravels;
CREATE USER intaretravels_user WITH PASSWORD 'IntareDB2024!Secure';
GRANT ALL PRIVILEGES ON DATABASE intaretravels TO intaretravels_user;
ALTER DATABASE intaretravels OWNER TO intaretravels_user;
\q
EOF

# Create app directory
echo "📁 Creating application directory..."
sudo mkdir -p /var/www/intaretravels
sudo chown -R $USER:$USER /var/www/intaretravels

# Clone repository (you'll need to add your repo URL)
echo "📥 Ready to clone repository..."
echo "Run: cd /var/www/intaretravels && git clone YOUR_REPO_URL ."
echo ""

# Configure Nginx
echo "🌐 Configuring Nginx..."
sudo cp /var/www/intaretravels/nginx.conf /etc/nginx/sites-available/intaretravels.rw
sudo ln -sf /etc/nginx/sites-available/intaretravels.rw /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# Setup firewall
echo "🔥 Configuring firewall..."
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw --force enable

# Setup PM2 startup
echo "⚙️ Configuring PM2 startup..."
pm2 startup systemd -u $USER --hp /home/$USER

echo ""
echo "=========================================="
echo "✅ Server setup complete!"
echo "=========================================="
echo ""
echo "Next steps:"
echo "1. Clone your repository to /var/www/intaretravels"
echo "2. Create .env.local files in apps/web and apps/admin"
echo "3. Run: cd /var/www/intaretravels && pnpm install"
echo "4. Run: pnpm build"
echo "5. Run: ./scripts/start-apps.sh"
echo "6. Setup SSL: sudo certbot --nginx -d intaretravels.rw -d www.intaretravels.rw -d admin.intaretravels.rw"
echo ""
