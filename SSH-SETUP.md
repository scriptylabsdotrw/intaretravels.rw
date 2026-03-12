# SSH Setup for CI/CD Deployment

This guide will help you set up SSH key authentication for automated deployments.

## Server Information
- **IP Address**: 138.197.37.27
- **User**: root
- **Current Auth**: Password-based

## Step 1: Generate SSH Key for GitHub Actions

On your local machine, run:

```bash
ssh-keygen -t ed25519 -C "github-actions-intaretravels" -f ~/.ssh/intaretravels_deploy
```

When prompted:
- Press Enter for no passphrase (required for automated deployment)
- Press Enter again to confirm

This creates two files:
- `~/.ssh/intaretravels_deploy` (private key - keep secret!)
- `~/.ssh/intaretravels_deploy.pub` (public key - safe to share)

## Step 2: Copy Public Key to Server

### Option A: Using ssh-copy-id (Recommended)

```bash
ssh-copy-id -i ~/.ssh/intaretravels_deploy.pub root@138.197.37.27
```

Enter your server password when prompted.

### Option B: Manual Copy

1. Display your public key:
```bash
cat ~/.ssh/intaretravels_deploy.pub
```

2. Copy the output (starts with `ssh-ed25519`)

3. Connect to your server:
```bash
ssh root@138.197.37.27
```

4. Add the key to authorized_keys:
```bash
mkdir -p ~/.ssh
chmod 700 ~/.ssh
echo "YOUR_PUBLIC_KEY_HERE" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
exit
```

## Step 3: Test SSH Key Authentication

```bash
ssh -i ~/.ssh/intaretravels_deploy root@138.197.37.27
```

You should connect WITHOUT being asked for a password.

## Step 4: Add Private Key to GitHub Secrets

1. Display your private key:
```bash
cat ~/.ssh/intaretravels_deploy
```

2. Copy the ENTIRE output (including `-----BEGIN` and `-----END` lines)

3. Go to your GitHub repository:
   - Settings → Secrets and variables → Actions
   - Click "New repository secret"

4. Add these secrets:

   **Name**: `VPS_SSH_KEY`
   **Value**: Paste the entire private key

   **Name**: `VPS_HOST`
   **Value**: `138.197.37.27`

   **Name**: `VPS_USERNAME`
   **Value**: `root`

## Step 5: Verify GitHub Actions Can Connect

1. Go to your repository on GitHub
2. Click "Actions" tab
3. Select "Deploy to VPS" workflow
4. Click "Run workflow" → "Run workflow"
5. Watch the deployment logs

## Step 6: Update Local SSH Config (Optional)

For easier local connections, add to `~/.ssh/config`:

```
Host intaretravels
    HostName 138.197.37.27
    User root
    IdentityFile ~/.ssh/intaretravels_deploy
    IdentitiesOnly yes
```

Now you can connect with:
```bash
ssh intaretravels
```

## Troubleshooting

### "Permission denied (publickey)"

Check server permissions:
```bash
ssh root@138.197.37.27  # using password
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
cat ~/.ssh/authorized_keys  # verify key is there
exit
```

### "Host key verification failed"

Remove old host key:
```bash
ssh-keygen -R 138.197.37.27
```

Then try connecting again.

### GitHub Actions Still Failing

1. Verify secrets are set correctly in GitHub
2. Check that private key includes BEGIN and END lines
3. Ensure no extra spaces or line breaks in the key
4. Check GitHub Actions logs for specific error

## Security Best Practices

1. **Never commit private keys** to git
2. **Use different keys** for different purposes
3. **Rotate keys** periodically
4. **Disable password authentication** after key setup (optional):
   ```bash
   ssh root@138.197.37.27
   sudo nano /etc/ssh/sshd_config
   # Set: PasswordAuthentication no
   sudo systemctl restart sshd
   ```

## Quick Reference

```bash
# Connect to server
ssh root@138.197.37.27

# Or with SSH config:
ssh intaretravels

# Check server status
ssh root@138.197.37.27 "pm2 status && nginx -t"

# View logs
ssh root@138.197.37.27 "pm2 logs --lines 50"
```

## Next Steps

After SSH is configured:
1. Test manual deployment: `./deploy.sh` on server
2. Test GitHub Actions deployment: push to main branch
3. Set up monitoring and alerts
4. Configure automatic backups

---

Need help? Check the deployment logs or contact the team.
