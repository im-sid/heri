# Firebase Setup & Indexing Guide

## Overview
This document explains how to set up Firebase Firestore indexes for the Heri-Science application's session management system.

## Required Collections & Indexes

### 1. Processing Sessions (`processingSessions`)
Used for AI Lab image processing sessions.

**Required Indexes:**
- `userId` (Ascending) + `createdAt` (Descending) - For fetching user sessions by creation date
- `userId` (Ascending) + `updatedAt` (Descending) - For fetching user sessions by last update
- `userId` (Ascending) + `isActive` (Ascending) + `updatedAt` (Descending) - For active session queries

### 2. Sci-Fi Sessions (`sciFiSessions`)
Used for Sci-Fi Writer creative sessions.

**Required Indexes:**
- `userId` (Ascending) + `createdAt` (Descending) - For fetching user sessions by creation date
- `userId` (Ascending) + `updatedAt` (Descending) - For fetching user sessions by last update
- `userId` (Ascending) + `isActive` (Ascending) + `updatedAt` (Descending) - For active session queries

### 3. Legacy Collections (Already Configured)
- `artifacts` - For processed images
- `chatMessages` - For chat history

## Deployment Methods

### Method 1: Firebase CLI (Recommended)
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firestore (if not already done)
firebase init firestore

# Deploy the indexes
firebase deploy --only firestore:indexes
```

### Method 2: Firebase Console (Manual)
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `digi-pet-8b8f8`
3. Navigate to **Firestore Database** → **Indexes**
4. Click **Create Index** for each required index:

#### Processing Sessions Indexes:
```
Collection ID: processingSessions
Fields:
- userId (Ascending)
- createdAt (Descending)
```

```
Collection ID: processingSessions
Fields:
- userId (Ascending)
- updatedAt (Descending)
```

```
Collection ID: processingSessions
Fields:
- userId (Ascending)
- isActive (Ascending)
- updatedAt (Descending)
```

#### Sci-Fi Sessions Indexes:
```
Collection ID: sciFiSessions
Fields:
- userId (Ascending)
- createdAt (Descending)
```

```
Collection ID: sciFiSessions
Fields:
- userId (Ascending)
- updatedAt (Descending)
```

```
Collection ID: sciFiSessions
Fields:
- userId (Ascending)
- isActive (Ascending)
- updatedAt (Descending)
```

### Method 3: Automatic Index Creation
When you run the application, Firebase will suggest creating indexes if they're missing. You'll see errors like:
```
The query requires an index. You can create it here: [Firebase Console Link]
```

## Index Status Verification

After deployment, verify indexes are created:

1. Go to Firebase Console → Firestore → Indexes
2. Check that all indexes show status: **Enabled**
3. If any show **Building**, wait for completion (usually 1-5 minutes)

## Troubleshooting

### Common Issues:

1. **"The query requires an index" Error**
   - Solution: Deploy the indexes using Firebase CLI or create them manually in console

2. **Index Building Takes Too Long**
   - Solution: Wait patiently, large collections take longer to index

3. **Permission Denied**
   - Solution: Ensure you're logged into Firebase CLI with correct permissions
   - Run: `firebase login` and select the correct Google account

4. **Project Not Found**
   - Solution: Initialize Firebase in your project directory
   - Run: `firebase init firestore`

### Fallback Queries
If indexes are not ready, the application will fall back to simpler queries without ordering, which may be slower but will still work.

## Performance Notes

- **Single-field indexes** are created automatically
- **Composite indexes** (multiple fields) must be created manually
- Indexes improve query performance but use additional storage
- Each index adds ~1KB per document

## Security Rules
Ensure your Firestore security rules allow authenticated users to read/write their own sessions:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Processing Sessions
    match /processingSessions/{sessionId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
    
    // Sci-Fi Sessions
    match /sciFiSessions/{sessionId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
  }
}
```

## Monitoring
Monitor index usage in Firebase Console → Firestore → Usage tab to ensure indexes are being utilized effectively.