@echo off
REM Firebase Indexes Deployment Script for Windows
REM This script deploys the Firestore indexes for Heri-Science application

echo 🔥 Deploying Firebase Firestore Indexes...
echo Project: digi-pet-8b8f8
echo.

REM Check if Firebase CLI is installed
firebase --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Firebase CLI is not installed.
    echo Install it with: npm install -g firebase-tools
    pause
    exit /b 1
)

REM Check if user is logged in
firebase projects:list >nul 2>&1
if errorlevel 1 (
    echo ❌ Not logged into Firebase.
    echo Please run: firebase login
    pause
    exit /b 1
)

echo ✅ Firebase CLI is ready
echo.

REM Deploy indexes
echo 📊 Deploying Firestore indexes...
firebase deploy --only firestore:indexes

if errorlevel 0 (
    echo.
    echo ✅ Indexes deployed successfully!
    echo.
    echo 📋 Deployed indexes for collections:
    echo    • processingSessions (3 indexes^)
    echo    • sciFiSessions (3 indexes^)
    echo    • artifacts (1 index^)
    echo    • chatMessages (1 index^)
    echo.
    echo 🔍 You can verify the indexes at:
    echo    https://console.firebase.google.com/project/digi-pet-8b8f8/firestore/indexes
    echo.
    echo ⏱️  Note: New indexes may take a few minutes to build.
) else (
    echo.
    echo ❌ Index deployment failed!
    echo Please check the error messages above and try again.
)

echo.
pause