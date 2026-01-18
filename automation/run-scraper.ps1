# Quick launcher for Facebook public page scraper
# Windows PowerShell script - NO LOGIN REQUIRED

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "FACEBOOK PUBLIC PAGE SCRAPER" -ForegroundColor Cyan
Write-Host "(No authentication required)" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if we're in the automation directory
$currentDir = Get-Location
if ($currentDir.Path -notlike "*automation*") {
    Write-Host "[INFO] Changing to automation directory..." -ForegroundColor Cyan
    cd automation
}

# Check if venv exists
if (-not (Test-Path ".\venv")) {
    Write-Host "[ERROR] Python virtual environment not found!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please run setup first:" -ForegroundColor Yellow
    Write-Host "  cd automation" -ForegroundColor Yellow
    Write-Host "  python -m venv venv" -ForegroundColor Yellow
    Write-Host "  .\venv\Scripts\Activate.ps1" -ForegroundColor Yellow
    Write-Host "  pip install -r requirements.txt" -ForegroundColor Yellow
    exit 1
}

# Check if .env exists
if (-not (Test-Path "..\\.env")) {
    Write-Host "[ERROR] .env file not found!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please create .env file with:" -ForegroundColor Yellow
    Write-Host "  FB_PAGE_URL=https://www.facebook.com/your-page" -ForegroundColor Yellow
    exit 1
}

# Check if FB_PAGE_URL is set (allow spaces and https)
$envContent = Get-Content "..\\.env" -Raw
if ($envContent -notmatch "FB_PAGE_URL=\s*(https?://|www\.)") {
    Write-Host "[ERROR] FB_PAGE_URL not configured in .env!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please add to .env:" -ForegroundColor Yellow
    Write-Host "  FB_PAGE_URL=https://www.facebook.com/your-business-page" -ForegroundColor Yellow
    exit 1
}

# Activate virtual environment
Write-Host "[INFO] Activating Python virtual environment..." -ForegroundColor Cyan
& .\venv\Scripts\Activate.ps1

Write-Host "[OK] Virtual environment activated" -ForegroundColor Green
Write-Host ""

# Check if script exists
if (-not (Test-Path ".\scraper.py")) {
    Write-Host "[ERROR] scraper.py not found!" -ForegroundColor Red
    exit 1
}

# Run the scraper
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Starting scraper..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

python scraper.py

# Check exit code
if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "[SUCCESS] Scraping completed" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Check automation/output/ for results" -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "[ERROR] Script failed" -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
}

Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
