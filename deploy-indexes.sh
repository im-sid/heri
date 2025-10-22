#!/bin/bash

# Firebase Indexes Deployment Script
# This script deploys the Firestore indexes for Heri-Science application

echo "🔥 Deploying Firebase Firestore Indexes..."
echo "Project: digi-pet-8b8f8"
echo ""

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI is not installed."
    echo "Install it with: npm install -g firebase-tools"
    exit 1
fi

# Check if user is logged in
if ! firebase projects:list &> /dev/null; then
    echo "❌ Not logged into Firebase."
    echo "Please run: firebase login"
    exit 1
fi

echo "✅ Firebase CLI is ready"
echo ""

# Deploy indexes
echo "📊 Deploying Firestore indexes..."
firebase deploy --only firestore:indexes

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Indexes deployed successfully!"
    echo ""
    echo "📋 Deployed indexes for collections:"
    echo "   • processingSessions (3 indexes)"
    echo "   • sciFiSessions (3 indexes)"
    echo "   • artifacts (1 index)"
    echo "   • chatMessages (1 index)"
    echo ""
    echo "🔍 You can verify the indexes at:"
    echo "   https://console.firebase.google.com/project/digi-pet-8b8f8/firestore/indexes"
    echo ""
    echo "⏱️  Note: New indexes may take a few minutes to build."
else
    echo ""
    echo "❌ Index deployment failed!"
    echo "Please check the error messages above and try again."
    exit 1
fi