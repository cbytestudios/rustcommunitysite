# 🌋 Rust Server Website Theme

Rust server management platform with Discord bot and web interface.

## Installation

### Prerequisites

- VPS with Ubuntu 20.04+ (or similar Linux)
- SSH access
- 2GB RAM minimum (4GB recommended)
- Domain name (optional, for Nginx setup)

### Step 1: Install Node.js

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Step 2: Clone & Deploy

```bash
git clone https://github.com/cbytestudios/rustcommunitysite.git
cd rustcommunitysite
chmod +x install.sh
./install.sh
cp .env.example .env
nano .env  # Configure with your settings
```

### Step 3: Configuration

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

Or use PM2 for process management (recommended):

```bash
npm install -g pm2
pm2 start npm --name "rustcommunity" -- start
pm2 startup
pm2 save
pm2 logs rustcommunity
```

## Nginx Configuration

```bash
sudo apt-get install -y nginx
```

Create `/etc/nginx/sites-available/rustcommunity`:

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable and restart:

```bash
sudo ln -s /etc/nginx/sites-available/rustcommunity /etc/nginx/sites-enabled/
sudo systemctl restart nginx
```

## SSL Certificate (Let's Encrypt)

```bash
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
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
node -v  # Should be v18+
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

