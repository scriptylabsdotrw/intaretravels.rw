# Setup Summary - What We've Done

## ✅ Completed

### 1. CI/CD Pipeline Setup
- ✅ GitHub Actions workflows created
  - `ci.yml` - Automated testing and building
  - `deploy-vps.yml` - Production deployment
  - `preview.yml` - PR preview builds
  - `rollback.yml` - Emergency rollback
- ✅ Enhanced deploy.sh with error handling
- ✅ Documentation created (DEPLOYMENT.md, SSH-SETUP.md, QUICK-START.md)

### 2. Server Connection Verified
- ✅ Server IP: 138.197.37.27
- ✅ SSH connection working (password-based)
- ✅ Nginx installed (v1.24.0)
- ⚠️ Node.js needs installation
- ⚠️ PM2 needs installation

## 🔄 Next Steps (In Order)

### Step 1: Setup Server (15 minutes)

Copy and run the setup script on your server:

```bash
# From your local machine
scp scripts/setup-server.sh root@138.197.37.27:/root/

# Connect to server
ssh root@138.197.37.27

# Run setup
bash /root/setup-server.sh
```

This installs Node.js, pnpm, PM2, PostgreSQL, and Git.

### Step 2: Clone Repository (2 minutes)

On the server:
```bash
cd /var/www/intaretravels
git clone https://github.com/scriptylabsdotrw/intaretravels.rw.git .
```

### Step 3: Configure Environment (5 minutes)

Create `.env.local` files in `apps/web` and `apps/admin` with database credentials.

See QUICK-START.md for exact content.

### Step 4: Build & Deploy (10 minutes)

```bash
pnpm install
pnpm build
```

Start apps with PM2 (see QUICK-START.md).

### Step 5: Setup SSH Keys for CI/CD (5 minutes)

On your local Windows machine:
```powershell
.\scripts\setup-ssh-keys.ps1
```

This will:
1. Generate SSH key pair
2. Guide you to copy public key to server
3. Show private key to add to GitHub Secrets

### Step 6: Add GitHub Secrets (2 minutes)

Go to: https://github.com/scriptylabsdotrw/intaretravels.rw/settings/secrets/actions

Add:
- `VPS_SSH_KEY` - Private key from setup script
- `VPS_HOST` - 138.197.37.27
- `VPS_USERNAME` - root

### Step 7: Test Deployment (2 minutes)

```bash
git push origin main
```

Watch GitHub Actions tab for deployment progress.

## 📚 Documentation Created

1. **QUICK-START.md** - Fast setup guide (start here!)
2. **DEPLOYMENT.md** - Complete deployment guide
3. **SSH-SETUP.md** - SSH key setup details
4. **README.md** - Updated with CI/CD info

## 🛠️ Scripts Created

1. **scripts/setup-ssh-keys.ps1** - Windows SSH setup
2. **scripts/setup-ssh-keys.sh** - Linux/Mac SSH setup
3. **scripts/setup-server.sh** - Server initial setup
4. **deploy.sh** - Enhanced deployment script

## 🔐 Security Notes

- SSH keys for automated deployment
- Environment variables for secrets
- Firewall configured
- SSL certificates (setup in Step 4)

## 📊 Workflow Overview

```
Developer Push → GitHub Actions → Build & Test → Deploy to VPS → Health Check → Notify
```

## 🚨 Emergency Procedures

### Rollback Deployment
1. Go to GitHub Actions
2. Select "Rollback Deployment"
3. Run workflow (optionally specify commit SHA)

### Manual Fix
```bash
ssh root@138.197.37.27
cd /var/www/intaretravels
git checkout <previous-commit>
pnpm install && pnpm build
pm2 restart all
```

## 📞 Support

If you encounter issues:
1. Check QUICK-START.md for common solutions
2. Review GitHub Actions logs
3. Check server logs: `pm2 logs`
4. Review Nginx logs: `sudo tail -f /var/log/nginx/error.log`

## ⏱️ Total Setup Time

- Server setup: ~15 minutes
- Repository clone & build: ~12 minutes
- SSH keys & GitHub: ~7 minutes
- SSL certificates: ~5 minutes
- **Total: ~40 minutes**

## 🎯 Current Status

**Ready for Step 1**: Run server setup script

Follow QUICK-START.md for detailed instructions!
