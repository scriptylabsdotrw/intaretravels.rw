# Deployment Guide - Intare Travels

Complete guide for deploying the Intare Travels platform to a VPS.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Initial Server Setup](#initial-server-setup)
3. [GitHub Actions Setup](#github-actions-setup)
4. [Manual Deployment](#manual-deployment)
5. [Monitoring & Maintenance](#monitoring--maintenance)
6. [Troubleshooting](#troubleshooting)

## Prerequisites

- Ubuntu 20.04+ VPS
- Domain names configured:
  - `intaretravels.rw` → Server IP
  - `admin.intaretravels.rw` → Server IP
- SSH access to server
- GitHub repository access

## Initial Server Setup

### 1. Connect to Server

```bash
ssh username@your-server-ip
```

### 2. Update System

```bash
sudo apt update && sudo apt upgrade -y
```

### 3. Install Node.js & pnpm

```bash
# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install pnpm
npm install -g pnpm

# Verify installations
node --version
pnpm --version
```

### 4. Install PM2

```bash
npm install -g pm2

# Setup PM2 to start on boot
pm2 startup
# Follow the command it outputs
```

### 5. Install Nginx

```bash
sudo apt install -y nginx

# Start and enable Nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

### 6. Install PostgreSQL (if using database)

```bash
sudo apt install -y postgresql postgresql-contrib

# Start PostgreSQL
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Create database and user
sudo -u postgres psql
CREATE DATABASE intaretravels;
CREATE USER intaretravels_user WITH PASSWORD 'your-secure-password';
GRANT ALL PRIVILEGES ON DATABASE intaretravels TO intaretravels_user;
\q
```

### 7. Clone Repository

```bash
# Create directory
sudo mkdir -p /var/www/intaretravels
sudo chown -R $USER:$USER /var/www/intaretravels

# Clone repository
cd /var/www
git clone https://github.com/scriptylabsdotrw/intaretravels.rw.git intaretravels
cd intaretravels

# Install dependencies
pnpm install
```

### 8. Configure Environment Variables

```bash
# Create .env files
nano apps/web/.env.local
```

Add:
```env
NEXT_PUBLIC_SITE_URL=https://intaretravels.rw
DATABASE_URL=postgresql://intaretravels_user:your-password@localhost:5432/intaretravels
```

```bash
nano apps/admin/.env.local
```

Add:
```env
NEXT_PUBLIC_SITE_URL=https://admin.intaretravels.rw
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-password
DATABASE_URL=postgresql://intaretravels_user:your-password@localhost:5432/intaretravels
```

### 9. Build Applications

```bash
pnpm build
```

### 10. Start Applications with PM2

```bash
# Start web app
cd apps/web
pm2 start npm --name "intaretravels-web" -- start
cd ../..

# Start admin app
cd apps/admin
pm2 start npm --name "intaretravels-admin" -- start
cd ../..

# Save PM2 configuration
pm2 save

# Check status
pm2 status
```

### 11. Configure Nginx

```bash
sudo nano /etc/nginx/sites-available/intaretravels
```

Add:
```nginx
# Public Website
server {
    listen 80;
    server_name intaretravels.rw www.intaretravels.rw;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# Admin Portal
server {
    listen 80;
    server_name admin.intaretravels.rw;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/intaretravels /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 12. Setup SSL with Let's Encrypt

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get SSL certificates
sudo certbot --nginx -d intaretravels.rw -d www.intaretravels.rw
sudo certbot --nginx -d admin.intaretravels.rw

# Auto-renewal is configured automatically
# Test renewal
sudo certbot renew --dry-run
```

### 13. Configure Firewall

```bash
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw enable
sudo ufw status
```

## GitHub Actions Setup

### 1. Generate SSH Key for GitHub Actions

On your server:
```bash
ssh-keygen -t ed25519 -C "github-actions" -f ~/.ssh/github_actions
cat ~/.ssh/github_actions.pub >> ~/.ssh/authorized_keys
cat ~/.ssh/github_actions
```

Copy the private key output.

### 2. Add GitHub Secrets

Go to your GitHub repository:
1. Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Add these secrets:

- **VPS_HOST**: Your server IP address
- **VPS_USERNAME**: Your SSH username
- **VPS_SSH_KEY**: The private key you copied above

### 3. Make Deploy Script Executable

```bash
chmod +x /var/www/intaretravels/deploy.sh
```

### 4. Test Deployment

Push to main branch:
```bash
git add .
git commit -m "Test deployment"
git push origin main
```

Check GitHub Actions tab to see deployment progress.

## Manual Deployment

If you need to deploy manually:

```bash
ssh username@your-server-ip
cd /var/www/intaretravels
./deploy.sh
```

## Monitoring & Maintenance

### Check Application Status

```bash
pm2 status
pm2 logs intaretravels-web
pm2 logs intaretravels-admin
```

### View Real-time Logs

```bash
pm2 logs intaretravels-web --lines 100
pm2 logs intaretravels-admin --lines 100
```

### Restart Applications

```bash
pm2 restart intaretravels-web
pm2 restart intaretravels-admin
```

### Check Nginx Status

```bash
sudo systemctl status nginx
sudo nginx -t  # Test configuration
```

### View Nginx Logs

```bash
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### Database Backup

```bash
# Backup database
pg_dump -U intaretravels_user intaretravels > backup_$(date +%Y%m%d).sql

# Restore database
psql -U intaretravels_user intaretravels < backup_20240312.sql
```

### Disk Space

```bash
df -h
du -sh /var/www/intaretravels
```

## Troubleshooting

### Application Won't Start

```bash
# Check logs
pm2 logs intaretravels-web --err
pm2 logs intaretravels-admin --err

# Check if port is in use
sudo lsof -i :3000
sudo lsof -i :3001

# Restart
pm2 restart all
```

### Nginx Issues

```bash
# Test configuration
sudo nginx -t

# Check error logs
sudo tail -f /var/log/nginx/error.log

# Restart Nginx
sudo systemctl restart nginx
```

### SSL Certificate Issues

```bash
# Check certificate status
sudo certbot certificates

# Renew certificates
sudo certbot renew

# Force renewal
sudo certbot renew --force-renewal
```

### Database Connection Issues

```bash
# Check PostgreSQL status
sudo systemctl status postgresql

# Check connections
sudo -u postgres psql -c "SELECT * FROM pg_stat_activity;"

# Restart PostgreSQL
sudo systemctl restart postgresql
```

### Out of Memory

```bash
# Check memory usage
free -h

# Check PM2 memory usage
pm2 monit

# Restart applications
pm2 restart all
```

### Deployment Failed

```bash
# Check GitHub Actions logs in repository
# SSH to server and check:
cd /var/www/intaretravels
git status
git log -1

# Manual deployment
./deploy.sh
```

### Rollback to Previous Version

Use GitHub Actions:
1. Go to Actions tab
2. Select "Rollback Deployment"
3. Click "Run workflow"
4. Enter commit SHA (optional)

Or manually:
```bash
cd /var/www/intaretravels
git log  # Find commit SHA
git checkout <commit-sha>
pnpm install
pnpm build
pm2 restart all
```

## Performance Optimization

### Enable Gzip Compression

Add to Nginx config:
```nginx
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json;
```

### Enable Caching

Add to Nginx config:
```nginx
location /_next/static {
    proxy_pass http://localhost:3000;
    proxy_cache_valid 200 365d;
    add_header Cache-Control "public, immutable";
}
```

### PM2 Cluster Mode

For better performance:
```bash
pm2 delete intaretravels-web
pm2 start npm --name "intaretravels-web" -i max -- start
pm2 save
```

## Security Best Practices

1. **Keep system updated**
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

2. **Use strong passwords**
   - Database passwords
   - Admin portal password
   - SSH keys instead of passwords

3. **Configure fail2ban**
   ```bash
   sudo apt install fail2ban
   sudo systemctl enable fail2ban
   ```

4. **Regular backups**
   - Database backups
   - Code backups
   - Environment files

5. **Monitor logs regularly**
   ```bash
   pm2 logs
   sudo tail -f /var/log/nginx/error.log
   ```

## Support

For issues or questions:
- Check GitHub Issues
- Review logs: `pm2 logs`
- Contact development team

---

Last updated: March 2026
