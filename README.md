# Heri-Science Platform

## Quick Start

### Backend
```bash
cd heri-Sci/backend
python app.py
```
Backend runs on: http://localhost:5000

### Frontend
```bash
cd heri-Sci/frontend
npm run dev
```
Frontend runs on: http://localhost:3001

### Access the App
Open: http://localhost:3001/chatbot

## How to Use

1. Upload an artifact image
2. Click "Super-Resolution" (2x upscale) or "Image Restoration" (enhance)
3. Wait ~1 second
4. Use comparison slider to see before/after
5. Download the enhanced image

## Features

- **Super-Resolution**: 2x image upscaling with sharpening
- **Image Restoration**: Sharpen + contrast + color enhancement
- **Comparison Slider**: Drag to compare original vs enhanced
- **Download**: Save enhanced images as JPEG

## Tech Stack

- **Backend**: Flask + Python + PIL
- **Frontend**: Next.js + React + TypeScript
- **Algorithms**: Basic fast image processing (LANCZOS + PIL enhancements)
