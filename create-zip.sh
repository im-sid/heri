#!/bin/bash

# Heri-Science ZIP Creator Script
# This script creates a complete ZIP file of the Heri-Science project

echo "========================================"
echo "   Heri-Science ZIP Creator"
echo "========================================"
echo ""

PROJECT_NAME="heri-Sci"
ZIP_NAME="heri-science-complete.zip"

# Colors
GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if project folder exists
if [ ! -d "$PROJECT_NAME" ]; then
    echo -e "${RED}Error: $PROJECT_NAME folder not found!${NC}"
    echo -e "${YELLOW}Please run this script from the parent directory containing $PROJECT_NAME${NC}"
    exit 1
fi

# Remove old zip if exists
if [ -f "$ZIP_NAME" ]; then
    echo -e "${YELLOW}Removing old ZIP file...${NC}"
    rm "$ZIP_NAME"
fi

# Create new ZIP
echo -e "${GREEN}Creating ZIP file...${NC}"
echo "This may take a moment..."
echo ""

# Exclude unnecessary files
zip -r "$ZIP_NAME" "$PROJECT_NAME" \
    -x "*/node_modules/*" \
    -x "*/venv/*" \
    -x "*/env/*" \
    -x "*/.next/*" \
    -x "*/build/*" \
    -x "*/__pycache__/*" \
    -x "*/.DS_Store" \
    -x "*/Thumbs.db" \
    -x "*/.env" \
    -x "*/.env.local" \
    -x "*/firebase-credentials.json" \
    -x "*/uploads/*" \
    -x "*/processed/*"

# Check if successful
if [ $? -eq 0 ]; then
    # Get file size
    SIZE=$(du -h "$ZIP_NAME" | cut -f1)
    
    echo ""
    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}   SUCCESS!${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo ""
    echo -e "${CYAN}ZIP File Created: $ZIP_NAME${NC}"
    echo -e "${CYAN}Location: $(pwd)/$ZIP_NAME${NC}"
    echo -e "${CYAN}Size: $SIZE${NC}"
    echo ""
    echo -e "${GREEN}Your complete Heri-Science project is ready!${NC}"
    echo ""
    echo -e "${YELLOW}Next steps:${NC}"
    echo "1. Extract the ZIP file"
    echo "2. Read SETUP.md for installation instructions"
    echo "3. Configure Firebase (see FIREBASE_SETUP.md)"
    echo "4. Run 'npm install' in frontend directory"
    echo "5. Run 'pip install -r requirements.txt' in backend directory"
    echo ""
    echo "========================================"
else
    echo -e "${RED}Error creating ZIP file${NC}"
    exit 1
fi



