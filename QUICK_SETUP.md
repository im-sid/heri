# Quick Firebase Setup Guide

## 🚀 Deploy Firebase Indexes (Required)

The session management system requires Firebase Firestore indexes to work properly. Follow these steps:

### Option 1: Automatic Deployment (Recommended)

**Windows:**
```bash
# Double-click or run in Command Prompt
deploy-indexes.bat
```

**Mac/Linux:**
```bash
# Make executable and run
chmod +x deploy-indexes.sh
./deploy-indexes.sh
```

### Option 2: Manual Deployment

```bash
# Install Firebase CLI (if not already installed)
npm install -g firebase-tools

# Login to Firebase
firebase login

# Deploy indexes
firebase deploy --only firestore:indexes
```

### Option 3: Let Firebase Auto-Create

1. Run the application
2. Try to save a session in AI Lab or Sci-Fi Writer
3. Check browser console for index creation links
4. Click the links to create indexes automatically

## ✅ Verification

After deployment, verify at:
https://console.firebase.google.com/project/digi-pet-8b8f8/firestore/indexes

All indexes should show status: **Enabled**

## 🔧 What Gets Created

- **processingSessions** collection indexes (3 indexes)
- **sciFiSessions** collection indexes (3 indexes)
- Existing **artifacts** and **chatMessages** indexes (preserved)

## 🚨 Important Notes

- **Indexes are required** for the gallery to load sessions properly
- **Building time**: New indexes may take 1-5 minutes to build
- **Fallback**: App will work with slower queries if indexes aren't ready
- **One-time setup**: Only needs to be done once per Firebase project

## 🆘 Troubleshooting

**Problem**: "The query requires an index" error
**Solution**: Run the deployment script or create indexes manually

**Problem**: Indexes stuck in "Building" status
**Solution**: Wait patiently, large collections take longer

**Problem**: Permission denied
**Solution**: Run `firebase login` and ensure you have Firestore admin access

## 📊 Collections Structure

```
Firestore Database
├── processingSessions/          # AI Lab sessions
│   ├── userId (string)
│   ├── name (string)
│   ├── originalImageUrl (string)
│   ├── processedImageUrl (string)
│   ├── chatMessages (array)
│   ├── createdAt (timestamp)
│   └── updatedAt (timestamp)
│
└── sciFiSessions/              # Sci-Fi Writer sessions
    ├── userId (string)
    ├── title (string)
    ├── artifactImageUrl (string)
    ├── messages (array)
    ├── createdAt (timestamp)
    └── updatedAt (timestamp)
```