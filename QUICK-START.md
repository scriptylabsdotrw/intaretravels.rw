# Quick Start - Server Setup & Deployment

## Server Info
- **IP**: 138.197.37.27
- **User**: root
- **Status**: Nginx installed, Node.js & PM2 needed

## Step 1: Initial Server Setup

Copy and run the setup script on your server:

```bash
# On your local machine, copy the script to server
scp scripts/setup-server.sh root@138.197.37.27:/root/

# Connect to server
ssh root@138.197.37.27

# Run the setup script
bash /root/setup-server.sh
```

This will install:
- Node.js 20
- pnpm
- PM2
- PostgreSQL
- Git

## Step 2: Clone Repository

On the server:

```bash
cd /var/www/intaretravels
git clone https://github.com/scriptylabsdotrw/intaretravels.rw.git .
```

## Step 3: Configure Environment

Create environment files:

```bash
# Web app environment
nano apps/web/.env.local
```

Add:
```env
NEXT_PUBLIC_SITE_URL=https://intaretravels.rw
DATABASE_URL=postgresql://intaretravels_user:IntareDB2024!Secure@localhost:5432/intaretravels
```

```bash
# Admin app environment
nano apps/admin/.env.local
```

Add:
```env
NEXT_PUBLIC_SITE_URL=https://admin.intaretravels.rw
ADMIN_USERNAME=admin
ADMIN_PASSWORD=intare2026
DATABASE_URL=postgresql://intaretravels_user:IntareDB2024!Secure@localhost:5432/intaretravels
```

## Step 4: Install & Build

```bash
cd /var/www/intaretravels

# Install dependencies
pnpm install

# Build applications
pnpm build
```

## Step 5: Configure Nginx

```bash
# Copy nginx config
sudo cp nginx.conf /etc/nginx/sites-available/intaretravels
sudo ln -s /etc/nginx/sites-available/intaretravels /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx
```

## Step 6: Start Applications

```bash
# Start web app
cd apps/web
pm2 start npm --name "intaretravels-web" -- start

# Start admin app
cd ../admin
pm2 start npm --name "intaretravels-admin" -- start

# Save PM2 configuration
pm2 save

# Check status
pm2 status
```

## Step 7: Setup SSL

```bash
# Install certbot (if not already installed)
sudo apt install certbot python3-certbot-nginx

# Get SSL certificates
sudo certbot --nginx -d intaretravels.rw -d www.intaretravels.rw
sudo certbot --nginx -d admin.intaretravels.rw
```

## Step 8: Setup SSH Keys for CI/CD

On your local machine:

### Windows (PowerShell):
```powershell
.\scripts\setup-ssh-keys.ps1
```

### Linux/Mac:
```bash
bash scripts/setup-ssh-keys.sh
```

Follow the prompts to:
1. Generate SSH key
2. Copy to server
3. Add to GitHub Secrets

## Step 9: Test Deployment

```bash
# Make a small change
git add .
git commit -m "Test CI/CD deployment"
git push origin main
```

Check GitHub Actions tab to see deployment progress.

## Verification

After setup, verify everything works:

```bash
# On server
pm2 status
sudo nginx -t
sudo systemctl status nginx
sudo systemctl status postgresql

# Check websites
curl -I https://intaretravels.rw
curl -I https://admin.intaretravels.rw
```

## Troubleshooting

### Can't connect to server
```bash
ssh -v root@138.197.37.27
```

### PM2 apps not starting
```bash
pm2 logs
pm2 restart all
```

### Nginx errors
```bash
sudo nginx -t
sudo tail -f /var/log/nginx/error.log
```

### Database connection issues
```bash
sudo systemctl status postgresql
sudo -u postgres psql -c "\l"
```

## Quick Commands

```bash
# Connect to server
ssh root@138.197.37.27

# Check app status
pm2 status

# View logs
pm2 logs intaretravels-web
pm2 logs intaretravels-admin

# Restart apps
pm2 restart all

# Manual deployment
cd /var/www/intaretravels
./deploy.sh
```

## Support

- Check logs: `pm2 logs`
- GitHub Actions: Repository → Actions tab
- Nginx logs: `/var/log/nginx/error.log`
- Full guide: See `DEPLOYMENT.md`
