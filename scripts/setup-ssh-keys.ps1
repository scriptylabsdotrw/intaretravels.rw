# Setup SSH keys for CI/CD deployment
# Run this script on your LOCAL Windows machine

$ErrorActionPreference = "Stop"

Write-Host "🔐 SSH Key Setup for Intare Travels CI/CD" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

$SERVER_IP = "138.197.37.27"
$SERVER_USER = "root"
$KEY_NAME = "intaretravels_deploy"
$SSH_DIR = "$env:USERPROFILE\.ssh"
$KEY_PATH = "$SSH_DIR\$KEY_NAME"

# Create .ssh directory if it doesn't exist
if (-not (Test-Path $SSH_DIR)) {
    New-Item -ItemType Directory -Path $SSH_DIR | Out-Null
}

# Check if key already exists
if (Test-Path $KEY_PATH) {
    Write-Host "⚠️  SSH key already exists at $KEY_PATH" -ForegroundColor Yellow
    $response = Read-Host "Do you want to use the existing key? (y/n)"
    if ($response -ne "y") {
        Write-Host "❌ Aborted. Please remove or rename the existing key first." -ForegroundColor Red
        exit 1
    }
} else {
    # Generate new SSH key
    Write-Host "🔑 Generating new SSH key..." -ForegroundColor Green
    ssh-keygen -t ed25519 -C "github-actions-intaretravels" -f $KEY_PATH -N '""'
    Write-Host "✅ SSH key generated" -ForegroundColor Green
    Write-Host ""
}

# Display public key
Write-Host "📋 Your PUBLIC key (safe to share):" -ForegroundColor Cyan
Write-Host "-----------------------------------" -ForegroundColor Gray
Get-Content "${KEY_PATH}.pub"
Write-Host "-----------------------------------" -ForegroundColor Gray
Write-Host ""

# Instructions for copying to server
Write-Host "📤 Copy the key to your server:" -ForegroundColor Yellow
Write-Host ""
Write-Host "Option 1: Run this command (you'll need server password):" -ForegroundColor White
Write-Host "type `"${KEY_PATH}.pub`" | ssh ${SERVER_USER}@${SERVER_IP} `"cat >> ~/.ssh/authorized_keys`"" -ForegroundColor Cyan
Write-Host ""
Write-Host "Option 2: Manual copy - Run these on your server:" -ForegroundColor White
Write-Host "mkdir -p ~/.ssh" -ForegroundColor Gray
Write-Host "chmod 700 ~/.ssh" -ForegroundColor Gray
Write-Host "nano ~/.ssh/authorized_keys  # Paste the public key above" -ForegroundColor Gray
Write-Host "chmod 600 ~/.ssh/authorized_keys" -ForegroundColor Gray
Write-Host ""

Read-Host "Press Enter after you've added the key to the server"

# Test connection
Write-Host ""
Write-Host "🧪 Testing SSH connection..." -ForegroundColor Yellow
try {
    $result = ssh -i $KEY_PATH -o ConnectTimeout=10 -o BatchMode=yes "${SERVER_USER}@${SERVER_IP}" "echo 'Connection successful!'" 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ SSH key authentication working!" -ForegroundColor Green
    } else {
        throw "Connection failed"
    }
} catch {
    Write-Host "❌ SSH key authentication failed" -ForegroundColor Red
    Write-Host "Please check the manual steps in SSH-SETUP.md" -ForegroundColor Yellow
    exit 1
}

# Display private key for GitHub
Write-Host ""
Write-Host "🔐 Your PRIVATE key for GitHub Secrets:" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Copy EVERYTHING below (including BEGIN and END lines)" -ForegroundColor Yellow
Write-Host "and add it to GitHub as VPS_SSH_KEY secret" -ForegroundColor Yellow
Write-Host ""
Write-Host "----------------------------------------" -ForegroundColor Gray
Get-Content $KEY_PATH
Write-Host "----------------------------------------" -ForegroundColor Gray
Write-Host ""

# Copy to clipboard if possible
try {
    Get-Content $KEY_PATH | Set-Clipboard
    Write-Host "✅ Private key copied to clipboard!" -ForegroundColor Green
    Write-Host ""
} catch {
    Write-Host "⚠️  Could not copy to clipboard automatically" -ForegroundColor Yellow
}

# Instructions
Write-Host "📝 Next Steps:" -ForegroundColor Cyan
Write-Host "==============" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Go to: https://github.com/scriptylabsdotrw/intaretravels.rw/settings/secrets/actions" -ForegroundColor White
Write-Host ""
Write-Host "2. Add these secrets:" -ForegroundColor White
Write-Host "   - VPS_SSH_KEY: (paste the private key - already in clipboard!)" -ForegroundColor Gray
Write-Host "   - VPS_HOST: $SERVER_IP" -ForegroundColor Gray
Write-Host "   - VPS_USERNAME: $SERVER_USER" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Test deployment:" -ForegroundColor White
Write-Host "   git push origin main" -ForegroundColor Gray
Write-Host ""
Write-Host "4. Check GitHub Actions tab for deployment status" -ForegroundColor White
Write-Host ""
Write-Host "✅ Setup complete!" -ForegroundColor Green
