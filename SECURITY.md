# 🔒 Security Guidelines

## 🚨 Important Security Notice

This project uses Firebase and other cloud services that require sensitive credentials. **NEVER** commit the following files to version control:

### ❌ Files to NEVER Commit:
- `*firebase-adminsdk*.json` - Firebase service account keys
- `*serviceAccountKey*.json` - Any service account credentials  
- `.env` files with real API keys
- Any file containing private keys or secrets

### ✅ Safe Practices:

1. **Use Environment Variables**
   ```bash
   # In .env (never commit this file)
   GEMINI_API_KEY=your_actual_key_here
   FIREBASE_PROJECT_ID=your_project_id
   ```

2. **Use .env.example Templates**
   ```bash
   # In .env.example (safe to commit)
   GEMINI_API_KEY=your_gemini_api_key_here
   FIREBASE_PROJECT_ID=your_firebase_project_id
   ```

3. **Proper .gitignore Patterns**
   ```gitignore
   # Firebase credentials
   *firebase-adminsdk*.json
   *serviceAccountKey*.json
   firebase-credentials.json
   
   # Environment files
   .env
   .env.local
   .env*.local
   ```

## 🛡️ If You Accidentally Committed Secrets:

1. **Immediately Revoke/Regenerate** the exposed credentials
2. **Force push** to remove from git history
3. **Update .gitignore** to prevent future accidents
4. **Notify team members** if working in a team

## 📞 Report Security Issues

If you find security vulnerabilities, please report them responsibly:
- **DO NOT** create public GitHub issues for security problems
- **Contact the maintainers** directly
- **Provide details** about the vulnerability

Remember: Security is everyone's responsibility! 🛡️