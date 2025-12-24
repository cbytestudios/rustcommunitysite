#!/bin/bash

set -e

echo "🚀 RUSTCOMMUNITY - VPS Installation Script"
echo "======================================"
echo ""

# Function to check if installation exists
check_installation() {
    if [ -d "node_modules" ] || [ -d "bot/dist" ] || [ -d "frontend/dist" ]; then
        return 0  # Installation exists
    fi
    return 1  # Installation doesn't exist
}

# Function to uninstall
uninstall() {
    echo "🗑️  Uninstalling RustCommunity..."
    echo ""
    
    # Stop PM2 process if running
    if pm2 list | grep -q rustcommunity; then
        echo "⏹️  Stopping PM2 process..."
        pm2 delete rustcommunity 2>/dev/null || true
        pm2 save 2>/dev/null || true
    fi
    
    # Remove node_modules and build files
    echo "🧹 Removing node_modules and build files..."
    rm -rf node_modules frontend/node_modules bot/node_modules 2>/dev/null || true
    rm -rf frontend/dist bot/dist 2>/dev/null || true
    rm -rf package-lock.json frontend/package-lock.json bot/package-lock.json 2>/dev/null || true
    
    # Remove Nginx config
    if [ -f "/etc/nginx/sites-enabled/rustcommunity" ]; then
        echo "🌐 Removing Nginx configuration..."
        sudo rm -f /etc/nginx/sites-enabled/rustcommunity
        sudo rm -f /etc/nginx/sites-available/rustcommunity
        sudo systemctl restart nginx 2>/dev/null || true
    fi
    
    echo "✅ Uninstall complete!"
    echo ""
}

# Check if already installed
if check_installation; then
    echo "⚠️  RustCommunity is already installed on this system."
    echo ""
    echo "What would you like to do?"
    echo "1) Continue with fresh install (uninstall first)"
    echo "2) Uninstall only"
    echo "3) Exit"
    echo ""
    read -p "Choose an option (1-3): " choice
    
    case $choice in
        1)
            uninstall
            echo "Proceeding with fresh installation..."
            echo ""
            ;;
        2)
            uninstall
            exit 0
            ;;
        3)
            echo "Exiting installation script."
            exit 0
            ;;
        *)
            echo "❌ Invalid choice. Exiting."
            exit 1
            ;;
    esac
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 20+ first."
    echo "   https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v)
echo "✅ Node.js version: $NODE_VERSION"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed."
    exit 1
fi

echo ""
echo "📦 Installing dependencies..."
npm install

echo ""
echo "🔧 Building projects..."
cd frontend && npm run build && cd ..
if [ ! -d "frontend/dist" ]; then
    echo "❌ Frontend build failed - dist folder not found"
    exit 1
fi
echo "✅ Frontend built successfully"

cd bot && npm run build && cd ..
if [ ! -f "bot/dist/index.js" ]; then
    echo "❌ Bot build failed - dist/index.js not found"
    echo "   Please check that TypeScript compiled correctly:"
    echo "   cd bot && npm run build"
    exit 1
fi
echo "✅ Bot built successfully"

echo ""
echo "📦 Installing Nginx..."
sudo apt-get install -y nginx

echo ""
echo "🔒 Installing SSL certificate tools..."
sudo apt-get install -y certbot python3-certbot-nginx

echo ""
echo "📝 SSL Certificate Setup"
echo "=================================="
echo ""
read -p "Enter your domain name (e.g., yourdomain.com): " DOMAIN_NAME

if [ -z "$DOMAIN_NAME" ]; then
    echo "❌ Domain name is required for SSL setup. Skipping SSL configuration."
    echo "   You can run SSL setup later with: sudo certbot --nginx -d yourdomain.com"
else
    echo ""
    echo "🔐 Requesting SSL certificate for $DOMAIN_NAME..."
    sudo certbot --nginx -d "$DOMAIN_NAME" --non-interactive --agree-tos -m admin@"$DOMAIN_NAME" 2>&1 || {
        echo "⚠️  SSL certificate request failed."
        echo "   Please ensure your domain points to this server's IP address."
        echo "   You can try again later with: sudo certbot --nginx -d $DOMAIN_NAME"
    }
fi

echo ""
echo "🔧 Configuring Nginx reverse proxy..."
sudo tee /etc/nginx/sites-available/rustcommunity > /dev/null <<EOF
server {
    listen 80;
    listen [::]:80;
    server_name $DOMAIN_NAME;

    # Redirect HTTP to HTTPS
    return 301 https://\$server_name\$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name $DOMAIN_NAME;

    # SSL certificates (set by certbot)
    ssl_certificate /etc/letsencrypt/live/$DOMAIN_NAME/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/$DOMAIN_NAME/privkey.pem;
    ssl_trusted_certificate /etc/letsencrypt/live/$DOMAIN_NAME/chain.pem;

    # SSL configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

echo "✅ Nginx config created"

echo ""
echo "🔗 Enabling Nginx site..."
sudo ln -sf /etc/nginx/sites-available/rustcommunity /etc/nginx/sites-enabled/rustcommunity
sudo rm -f /etc/nginx/sites-enabled/default

echo ""
echo "🔍 Testing Nginx configuration..."
sudo nginx -t

echo ""
echo "♻️  Restarting Nginx..."
sudo systemctl restart nginx

echo ""
echo "✅ Installation Complete!"
echo ""
echo "📝 Next Steps:"
echo "   1. Copy .env.example to .env"
echo "   2. Edit .env with your configuration:"
echo "      - DISCORD_TOKEN"
echo "      - STATUS_CHANNEL_ID"
echo "      - ANNOUNCEMENT_CHANNEL_ID"
echo "      - PORT (default: 3000)"
echo ""
echo "🚀 To start the application:"
echo "   npm start"
echo ""
echo "📡 Your site will be accessible at:"
echo "   https://$DOMAIN_NAME (port 443)"
echo "   http://$DOMAIN_NAME (port 80 - redirects to HTTPS)"
echo ""
