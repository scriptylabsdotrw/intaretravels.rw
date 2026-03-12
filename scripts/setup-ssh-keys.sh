#!/bin/bash

# Setup SSH keys for CI/CD deployment
# Run this script on your LOCAL machine

set -e

echo "🔐 SSH Key Setup for Intare Travels CI/CD"
echo "=========================================="
echo ""

SERVER_IP="138.197.37.27"
SERVER_USER="root"
KEY_NAME="intaretravels_deploy"
KEY_PATH="$HOME/.ssh/$KEY_NAME"

# Check if key already exists
if [ -f "$KEY_PATH" ]; then
    echo "⚠️  SSH key already exists at $KEY_PATH"
    read -p "Do you want to use the existing key? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Aborted. Please remove or rename the existing key first."
        exit 1
    fi
else
    # Generate new SSH key
    echo "🔑 Generating new SSH key..."
    ssh-keygen -t ed25519 -C "github-actions-intaretravels" -f "$KEY_PATH" -N ""
    echo "✅ SSH key generated"
    echo ""
fi

# Display public key
echo "📋 Your PUBLIC key (safe to share):"
echo "-----------------------------------"
cat "${KEY_PATH}.pub"
echo "-----------------------------------"
echo ""

# Try to copy key to server
echo "📤 Attempting to copy key to server..."
echo "You will be prompted for your server password"
echo ""

if command -v ssh-copy-id &> /dev/null; then
    ssh-copy-id -i "${KEY_PATH}.pub" "${SERVER_USER}@${SERVER_IP}"
    echo "✅ Key copied to server"
else
    echo "⚠️  ssh-copy-id not found. Manual copy required."
    echo ""
    echo "Run these commands on your server:"
    echo "-----------------------------------"
    echo "mkdir -p ~/.ssh"
    echo "chmod 700 ~/.ssh"
    echo "echo '$(cat ${KEY_PATH}.pub)' >> ~/.ssh/authorized_keys"
    echo "chmod 600 ~/.ssh/authorized_keys"
    echo "-----------------------------------"
    echo ""
    read -p "Press Enter after you've added the key to the server..."
fi

# Test connection
echo ""
echo "🧪 Testing SSH connection..."
if ssh -i "$KEY_PATH" -o ConnectTimeout=10 -o BatchMode=yes "${SERVER_USER}@${SERVER_IP}" "echo 'Connection successful!'" 2>/dev/null; then
    echo "✅ SSH key authentication working!"
else
    echo "❌ SSH key authentication failed"
    echo "Please check the manual steps in SSH-SETUP.md"
    exit 1
fi

# Display private key for GitHub
echo ""
echo "🔐 Your PRIVATE key for GitHub Secrets:"
echo "========================================"
echo "Copy EVERYTHING below (including BEGIN and END lines)"
echo "and add it to GitHub as VPS_SSH_KEY secret"
echo ""
echo "----------------------------------------"
cat "$KEY_PATH"
echo "----------------------------------------"
echo ""

# Instructions
echo "📝 Next Steps:"
echo "=============="
echo ""
echo "1. Go to: https://github.com/scriptylabsdotrw/intaretravels.rw/settings/secrets/actions"
echo ""
echo "2. Add these secrets:"
echo "   - VPS_SSH_KEY: (paste the private key above)"
echo "   - VPS_HOST: $SERVER_IP"
echo "   - VPS_USERNAME: $SERVER_USER"
echo ""
echo "3. Test deployment:"
echo "   git push origin main"
echo ""
echo "4. Check GitHub Actions tab for deployment status"
echo ""
echo "✅ Setup complete!"
