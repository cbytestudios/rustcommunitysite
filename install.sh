#!/bin/bash

set -e

echo "🚀 RUSTBORNE - VPS Installation Script"
echo "======================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
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
cd bot && npm run build && cd ..

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
