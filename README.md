# 🌋 Rust Server Website Theme

Rust server management platform with Discord bot and web interface.

## Installation

### Prerequisites

- VPS with Ubuntu 20.04+ (or similar Linux)
- SSH access
- 2GB RAM minimum (4GB recommended)
- Domain name (for SSL and port 80/443 setup)

### Step 1: Install Node.js

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Step 2: Clone & Deploy

```bash
git clone https://github.com/cbytestudios/rustcommunitysite.git
cd rustcommunitysite
chmod +x install.sh
./install.sh
```

The installation script will:
- ✅ Install all dependencies
- ✅ Build the frontend and bot
- ✅ Install Nginx and certbot
- ✅ Prompt for your domain name
- ✅ Automatically request and configure SSL certificates (Let's Encrypt)
- ✅ Configure Nginx as a reverse proxy for ports 80 & 443
- ✅ Redirect HTTP to HTTPS automatically

### Step 3: Configuration

After installation completes:

```bash
cp .env.example .env
nano .env  # Configure with your settings
```

Edit `.env` with these required values:

```env
DISCORD_TOKEN=your_bot_token_here
STATUS_CHANNEL_ID=your_status_channel_id
ANNOUNCEMENT_CHANNEL_ID=your_announcement_channel_id
PORT=3000
NODE_ENV=production
```

Get your Discord bot token from [Discord Developer Portal](https://discord.com/developers/applications).

### Step 4: Start the Application

```bash
npm start
```

Your site will be accessible at:
- **HTTPS (Secure):** https://yourdomain.com (port 443)
- **HTTP:** http://yourdomain.com (port 80 - redirects to HTTPS)

### Step 5: Process Management

Use PM2 for process management (recommended):

```bash
npm install -g pm2
pm2 start npm --name "rustcommunity" -- start
pm2 startup
pm2 save
pm2 logs rustcommunity
```

## Nginx & SSL (Automated)

The installation script automatically:
- Installs Nginx web server
- Installs Certbot for Let's Encrypt SSL certificates
- Configures Nginx as a reverse proxy
- Sets up automatic HTTPS with port 443
- Redirects port 80 HTTP traffic to HTTPS

**SSL certificates are free and auto-renewing** through Let's Encrypt.

If you need to manually renew or troubleshoot SSL:

```bash
# Renew SSL certificate
sudo certbot renew

# Check certificate status
sudo certbot certificates

# Restart Nginx to apply changes
sudo systemctl restart nginx
```

## Process Management

The application can be managed in several ways:

### PM2 (Recommended)

```bash
npm install -g pm2
pm2 start npm --name "rustcommunity" -- start
pm2 startup
pm2 save
pm2 logs rustcommunity
```

### Systemd Service

Create `/etc/systemd/system/rustcommunity.service`:

```ini
[Unit]
Description=Rust Community Site
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/path/to/rustcommunitysite
Environment=NODE_ENV=production
ExecStart=/usr/bin/npm start
Restart=always

[Install]
WantedBy=multi-user.target
```

Then enable and start:

```bash
sudo systemctl enable rustcommunity
sudo systemctl start rustcommunity
sudo systemctl status rustcommunity
```

## Troubleshooting

**Application won't start:**
```bash
node -v  # Should be v20+
npm install
npm start
```

**Discord bot not responding:**
- Check `DISCORD_TOKEN` is correct
- Verify channel IDs match your server
- Confirm bot is in your Discord server

**Port already in use:**
```bash
# Kill process on port 3000
sudo lsof -i :3000
sudo kill -9 <PID>

# Or change PORT in .env
```

**Out of memory:**
```bash
NODE_OPTIONS=--max-old-space-size=2048 npm start
```

## Commands

```bash
npm start          # Production
npm run build      # Build for production
npm install        # Install dependencies
pm2 logs           # View PM2 logs
```

## Features

- 🖥️ Server browser with live player counts
- 💬 Discord bot with commands (/servers, /status, /connect)
- 🎨 Dark themed web interface
- 📱 Mobile responsive
- ⚡ Real-time BattleMetrics integration
- 🔄 Auto-updating stats

## Tech Stack

- Frontend: React, Vite, TailwindCSS
- Bot: Discord.js, Node.js
- API: BattleMetrics integration
- Deploy: PM2, Nginx

Notes and next steps:
- The API endpoint `/api/status` queries the Rust server using `gamedig`. If `RUST_SERVER_HOST` and `RUST_SERVER_PORT` are not set it returns a friendly message.
- Replace the placeholder content in `pages/index.js` with your news, events, and donation links.
- For long-running production process use `pm2`, a systemd service, or containerize with Docker.

Example systemd unit (simple):

```ini
[Unit]
Description=Next.js Rust Server Site
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/path/to/site
Environment=RUST_SERVER_HOST=your.host
Environment=RUST_SERVER_PORT=28015
ExecStart=/usr/bin/npm start
Restart=always

[Install]
WantedBy=multi-user.target
```

