# RUSTBORNE - VPS Installation Script (PowerShell)

Write-Host "🚀 RUSTBORNE - VPS Installation Script" -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Green
Write-Host ""

# Check if Node.js is installed
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Node.js is not installed. Please install Node.js 18+ first." -ForegroundColor Red
    Write-Host "   https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

$nodeVersion = node -v
Write-Host "✅ Node.js version: $nodeVersion" -ForegroundColor Green

# Check if npm is installed
if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Host "❌ npm is not installed." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "📦 Installing dependencies..." -ForegroundColor Cyan
npm install

Write-Host ""
Write-Host "🔧 Building projects..." -ForegroundColor Cyan
Push-Location frontend
npm run build
Pop-Location

Push-Location bot
npm run build
Pop-Location

Write-Host ""
Write-Host "✅ Installation Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Next Steps:" -ForegroundColor Yellow
Write-Host "   1. Copy .env.example to .env"
Write-Host "   2. Edit .env with your configuration:"
Write-Host "      - DISCORD_TOKEN"
Write-Host "      - STATUS_CHANNEL_ID"
Write-Host "      - ANNOUNCEMENT_CHANNEL_ID"
Write-Host "      - PORT (default: 3000)"
Write-Host ""
Write-Host "🚀 To start the application:" -ForegroundColor Green
Write-Host "   npm start" -ForegroundColor Cyan
Write-Host ""
