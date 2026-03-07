#!/bin/bash

# Initial deployment script for intaretravels.rw
# Run this from your local machine

SERVER_IP="138.197.37.27"
SERVER_USER="root"
DOMAIN="intaretravels.rw"
REPO_URL="https://github.com/yourusername/intaretravels.git"  # Update this

echo "🚀 Starting initial deployment to $DOMAIN"
echo "================================================"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Step 1: Installing required software...${NC}"
ssh $SERVER_USER@$SERVER_IP << 'ENDSSH'
# Update system
apt update && apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# Install pnpm
npm install -g pnpm

# Install PM2
npm install -g pm2

# Install PostgreSQL
apt install -y postgresql postgresql-contrib

# Install Git
apt install -y git

# Install certbot for SSL
apt install -y certbot python3-certbot-nginx
ENDSSH

echo -e "${GREEN}✓ Software installed${NC}"

echo -e "${YELLOW}Step 2: Setting up database...${NC}"
ssh $SERVER_USER@$SERVER_IP << 'ENDSSH'
sudo -u postgres psql << EOF
CREATE DATABASE intaretravels;
CREATE USER intaretravels_user WITH PASSWORD 'IntareDB2024!Secure';
GRANT ALL PRIVILEGES ON DATABASE intaretravels TO intaretravels_user;
ALTER DATABASE intaretravels OWNER TO intaretravels_user;
\q
EOF
ENDSSH

echo -e "${GREEN}✓ Database created${NC}"

echo -e "${YELLOW}Step 3: Cloning repository...${NC}"
ssh $SERVER_USER@$SERVER_IP << ENDSSH
# Create directory
mkdir -p /var/www/intaretravels
cd /var/www/intaretravels

# Clone repository (update URL)
git clone $REPO_URL .
ENDSSH

echo -e "${GREEN}✓ Repository cloned${NC}"

echo -e "${YELLOW}Step 4: Setting up environment...${NC}"
ssh $SERVER_USER@$SERVER_IP << 'ENDSSH'
cd /var/www/intaretravels

# Create web environment
cat > apps/web/.env.local << EOF
NEXT_PUBLIC_SITE_URL=https://intaretravels.rw
DATABASE_URL=postgresql://intaretravels_user:IntareDB2024!Secure@localhost:5432/intaretravels
EOF

# Create admin environment
cat > apps/admin/.env.local << EOF
NEXT_PUBLIC_SITE_URL=https://admin.intaretravels.rw
DATABASE_URL=postgresql://intaretravels_user:IntareDB2024!Secure@localhost:5432/intaretravels
ADMIN_USERNAME=admin
ADMIN_PASSWORD=AdminIntare2024!Secure
EOF
ENDSSH

echo -e "${GREEN}✓ Environment configured${NC}"

echo -e "${YELLOW}Step 5: Installing dependencies and building...${NC}"
ssh $SERVER_USER@$SERVER_IP << 'ENDSSH'
cd /var/www/intaretravels

# Install dependencies
pnpm install

# Setup database
pnpm db:generate
pnpm db:push

# Build applications
pnpm build
ENDSSH

echo -e "${GREEN}✓ Applications built${NC}"

echo -e "${YELLOW}Step 6: Starting applications with PM2...${NC}"
ssh $SERVER_USER@$SERVER_IP << 'ENDSSH'
cd /var/www/intaretravels

# Start web app
cd apps/web
pm2 start npm --name "intaretravels-web" -- start

# Start admin app
cd ../admin
pm2 start npm --name "intaretravels-admin" -- start

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup systemd -u root --hp /root
ENDSSH

echo -e "${GREEN}✓ Applications started${NC}"

echo -e "${YELLOW}Step 7: Configuring Nginx...${NC}"
ssh $SERVER_USER@$SERVER_IP << 'ENDSSH'
cd /var/www/intaretravels

# Copy nginx config
cp nginx.conf /etc/nginx/sites-available/intaretravels.rw

# Enable site
ln -sf /etc/nginx/sites-available/intaretravels.rw /etc/nginx/sites-enabled/

# Remove default site
rm -f /etc/nginx/sites-enabled/default

# Test nginx config
nginx -t

# Reload nginx
systemctl reload nginx
ENDSSH

echo -e "${GREEN}✓ Nginx configured${NC}"

echo -e "${YELLOW}Step 8: Setting up SSL certificates...${NC}"
ssh $SERVER_USER@$SERVER_IP << 'ENDSSH'
# Get SSL certificates
certbot --nginx -d intaretravels.rw -d www.intaretravels.rw -d admin.intaretravels.rw --non-interactive --agree-tos --email admin@intaretravels.rw --redirect
ENDSSH

echo -e "${GREEN}✓ SSL certificates installed${NC}"

echo -e "${YELLOW}Step 9: Configuring firewall...${NC}"
ssh $SERVER_USER@$SERVER_IP << 'ENDSSH'
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable
ENDSSH

echo -e "${GREEN}✓ Firewall configured${NC}"

echo -e "${YELLOW}Step 10: Making deploy script executable...${NC}"
ssh $SERVER_USER@$SERVER_IP << 'ENDSSH'
cd /var/www/intaretravels
chmod +x deploy.sh
ENDSSH

echo -e "${GREEN}✓ Deploy script ready${NC}"

echo ""
echo "================================================"
echo -e "${GREEN}🎉 Deployment Complete!${NC}"
echo ""
echo "Your sites are now live at:"
echo "  • https://intaretravels.rw"
echo "  • https://admin.intaretravels.rw"
echo ""
echo "Admin credentials:"
echo "  Username: admin"
echo "  Password: AdminIntare2024!Secure"
echo ""
echo "Useful commands:"
echo "  ssh root@$SERVER_IP 'pm2 status'"
echo "  ssh root@$SERVER_IP 'pm2 logs'"
echo "  ssh root@$SERVER_IP 'cd /var/www/intaretravels && ./deploy.sh'"
echo ""
