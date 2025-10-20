# Heri-Science ZIP Creator Script
# This script creates a complete ZIP file of the Heri-Science project

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Heri-Science ZIP Creator" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$projectName = "heri-Sci"
$zipName = "heri-science-complete.zip"
$currentPath = Get-Location

# Check if project folder exists
if (-not (Test-Path $projectName)) {
    Write-Host "Error: $projectName folder not found!" -ForegroundColor Red
    Write-Host "Please run this script from the parent directory containing $projectName" -ForegroundColor Yellow
    exit 1
}

# Remove old zip if exists
if (Test-Path $zipName) {
    Write-Host "Removing old ZIP file..." -ForegroundColor Yellow
    Remove-Item $zipName -Force
}

# Create new ZIP
Write-Host "Creating ZIP file..." -ForegroundColor Green
Write-Host "This may take a moment..." -ForegroundColor Gray
Write-Host ""

try {
    Compress-Archive -Path $projectName -DestinationPath $zipName -CompressionLevel Optimal
    
    # Get file info
    $zipFile = Get-Item $zipName
    $sizeInMB = [math]::Round($zipFile.Length / 1MB, 2)
    
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "   SUCCESS!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "ZIP File Created: $zipName" -ForegroundColor Cyan
    Write-Host "Location: $($zipFile.FullName)" -ForegroundColor Cyan
    Write-Host "Size: $sizeInMB MB" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Your complete Heri-Science project is ready!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "1. Extract the ZIP file" -ForegroundColor White
    Write-Host "2. Read SETUP.md for installation instructions" -ForegroundColor White
    Write-Host "3. Configure Firebase (see FIREBASE_SETUP.md)" -ForegroundColor White
    Write-Host "4. Run 'npm install' in frontend directory" -ForegroundColor White
    Write-Host "5. Run 'pip install -r requirements.txt' in backend directory" -ForegroundColor White
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Cyan
    
} catch {
    Write-Host "Error creating ZIP file: $_" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")



