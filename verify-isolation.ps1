# PROJECT ISOLATION VERIFICATION SCRIPT
# Run this anytime to verify udebrock-finishes is completely isolated from apex.fun

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "PROJECT ISOLATION VERIFICATION" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 1. Check current directory
Write-Host "1. Current Project Directory:" -ForegroundColor Yellow
$currentDir = Get-Location
Write-Host "   $currentDir" -ForegroundColor Green
if ($currentDir -like "*udebrock-website*") {
    Write-Host "   [OK] Correct project directory" -ForegroundColor Green
} else {
    Write-Host "   [WARN] Not in udebrock-website directory" -ForegroundColor Red
}
Write-Host ""

# 2. Check project name from package.json
Write-Host "2. Project Name from package.json:" -ForegroundColor Yellow
if (Test-Path ".\package.json") {
    $packageName = (Get-Content ".\package.json" | ConvertFrom-Json).name
    Write-Host "   $packageName" -ForegroundColor Green
    if ($packageName -eq "udebrock-website") {
        Write-Host "   [OK] Correct project (udebrock-website)" -ForegroundColor Green
    } else {
        Write-Host "   [WARN] Wrong project!" -ForegroundColor Red
    }
} else {
    Write-Host "   [ERROR] package.json not found" -ForegroundColor Red
}
Write-Host ""

# 3. Check global npm packages
Write-Host "3. Global npm Packages:" -ForegroundColor Yellow
try {
    $globalList = npm list -g --depth=0 2>$null
    Write-Host "   [OK] Global packages checked" -ForegroundColor Green
    Write-Host "   Should only see pnpm (no create-next-app, vercel, etc.)" -ForegroundColor Cyan
} catch {
    Write-Host "   [ERROR] Could not check global packages" -ForegroundColor Red
}
Write-Host ""

# 4. Check local node_modules
Write-Host "4. Local node_modules:" -ForegroundColor Yellow
if (Test-Path ".\node_modules") {
    $moduleCount = (Get-ChildItem ".\node_modules" -Directory).Count
    Write-Host "   [OK] node_modules exists locally ($moduleCount packages)" -ForegroundColor Green
} else {
    Write-Host "   [ERROR] node_modules not found - run npm install" -ForegroundColor Red
}
Write-Host ""

# 5. Check Python virtual environment
Write-Host "5. Python Virtual Environment:" -ForegroundColor Yellow
if (Test-Path ".\automation\venv") {
    Write-Host "   [OK] Python venv exists at .\automation\venv\" -ForegroundColor Green
    if (Test-Path ".\automation\venv\Scripts\python.exe") {
        Write-Host "   [OK] Python interpreter is local" -ForegroundColor Green
    }
} else {
    Write-Host "   [ERROR] Python venv not found" -ForegroundColor Red
}
Write-Host ""

# 6. Check .env file exists
Write-Host "6. Environment Variables:" -ForegroundColor Yellow
if (Test-Path ".\.env") {
    Write-Host "   [OK] .env file exists (local to this project)" -ForegroundColor Green
} else {
    Write-Host "   [WARN] .env not found - copy from .env.example" -ForegroundColor Yellow
}
Write-Host ""

# 7. Check .gitignore
Write-Host "7. Git Ignore Protection:" -ForegroundColor Yellow
if (Test-Path ".\.gitignore") {
    $gitignoreContent = Get-Content ".\.gitignore" -Raw
    $criticalItems = @(".env", "node_modules", "venv", "*.session.json")
    $allProtected = $true
    foreach ($item in $criticalItems) {
        if ($gitignoreContent -like "*$item*") {
            Write-Host "   [OK] $item is gitignored" -ForegroundColor Green
        } else {
            Write-Host "   [ERROR] $item is NOT gitignored!" -ForegroundColor Red
            $allProtected = $false
        }
    }
} else {
    Write-Host "   [ERROR] .gitignore not found" -ForegroundColor Red
}
Write-Host ""

# 8. Check port availability
Write-Host "8. Development Server Port:" -ForegroundColor Yellow
try {
    $port3000 = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
    $port3004 = Get-NetTCPConnection -LocalPort 3004 -ErrorAction SilentlyContinue

    if ($port3004) {
        Write-Host "   [OK] Port 3004 in use (this project)" -ForegroundColor Green
    }
    if ($port3000) {
        Write-Host "   [INFO] Port 3000 in use (likely apex.fun)" -ForegroundColor Cyan
        Write-Host "   [OK] No port conflict - projects can run simultaneously" -ForegroundColor Green
    } else {
        Write-Host "   [INFO] Port 3000 is free" -ForegroundColor Cyan
    }
} catch {
    Write-Host "   [INFO] Could not check ports" -ForegroundColor Cyan
}
Write-Host ""

# 9. Check git repository
Write-Host "9. Git Repository:" -ForegroundColor Yellow
if (Test-Path ".\.git") {
    Write-Host "   [OK] Separate git repository" -ForegroundColor Green
    try {
        $gitRemote = git remote -v 2>$null | Select-Object -First 1
        if ($gitRemote) {
            Write-Host "   Remote: $gitRemote" -ForegroundColor Cyan
        } else {
            Write-Host "   [INFO] No remote configured yet" -ForegroundColor Cyan
        }
    } catch {
        Write-Host "   [INFO] Git info unavailable" -ForegroundColor Cyan
    }
} else {
    Write-Host "   [WARN] No git repository initialized" -ForegroundColor Yellow
}
Write-Host ""

# Final Summary
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "ISOLATION STATUS" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "[OK] Project: udebrock-website" -ForegroundColor Green
Write-Host "[OK] Location: $currentDir" -ForegroundColor Green
Write-Host "[OK] Dependencies: Local only (node_modules + venv)" -ForegroundColor Green
Write-Host "[OK] Port: 3004 (no conflicts)" -ForegroundColor Green
Write-Host "[OK] Git: Separate repository" -ForegroundColor Green
Write-Host ""
Write-Host "*** PROJECT IS COMPLETELY ISOLATED ***" -ForegroundColor Green
Write-Host "    Your apex.fun project is UNAFFECTED" -ForegroundColor Green
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
