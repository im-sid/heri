# Professional Image Enhancement Algorithms

## Super-Resolution (6-Stage Pipeline)

### Stage 1: Pre-processing
- RGB conversion
- Input size optimization (max 2000px)
- LANCZOS resampling if needed

### Stage 2: LANCZOS 2x Upscaling
- High-quality interpolation
- 2x resolution increase
- Preserves image quality

### Stage 3: Edge-Preserving Sharpening
- Adaptive sharpness (1.6x - 2.5x)
- Based on intensity setting
- Preserves natural edges

### Stage 4: Adaptive Contrast Enhancement
- Smart contrast boost (1.15x - 1.45x)
- Intensity-based
- Maintains color balance

### Stage 5: Unsharp Masking (Detail Recovery)
- Fine detail enhancement
- Adaptive radius (2.0 - 2.5)
- Percent: 150-250 based on intensity
- Threshold: 3 (prevents noise amplification)

### Stage 6: Final Optimization
- Color saturation boost (intensity > 60%)
- Brightness fine-tuning (intensity > 70%)
- Final polish for professional results

**Result:** Professional 2x resolution increase with preserved details

---

## Image Restoration (8-Stage Adaptive Pipeline)

### Stage 1: Image Analysis
- Brightness analysis (0-255 scale)
- Variance calculation (noise detection)
- Adaptive flags:
  - Dark: brightness < 110
  - Bright: brightness > 170
  - Noisy: variance > 2500
  - Low contrast: variance < 800

### Stage 2: Adaptive Denoising
- Conditional processing (only if noisy)
- Median filter (size 3)
- Smooth filter
- Preserves important details

### Stage 3: Edge-Preserving Sharpening
- Intensity-based (1.7x - 2.7x)
- Stronger than standard sharpening
- Restores clarity to damaged images

### Stage 4: Adaptive Contrast Restoration
- Conditional processing based on analysis:
  - Low contrast: 1.4x - 1.9x boost
  - Dark images: 1.35x - 1.8x boost
  - Bright images: 1.25x - 1.6x boost
  - Normal: 1.2x - 1.5x boost
- Intelligent adaptation

### Stage 5: Color Restoration
- Saturation boost (1.2x - 1.5x)
- Faded color recovery
- Natural color enhancement

### Stage 6: Detail Enhancement
- Conditional unsharp mask (intensity > 50%)
- Adaptive radius (1.5 - 2.5)
- Percent: 120-200
- Fine detail recovery

### Stage 7: Adaptive Brightness Correction
- Dark images: Brighten 1.15x - 1.30x
- Bright images: Dim 0.90x - 0.95x
- Normal: Skip
- Intelligent compensation

### Stage 8: Final Polish
- Edge enhancement (intensity > 80%)
- Professional finish
- Crisp, clean results

**Result:** Intelligent damage repair with adaptive processing

---

## Key Features

### Quality
- LANCZOS resampling (highest quality interpolation)
- Multi-stage pipelines (6-8 stages)
- Unsharp masking for fine details
- Edge-preserving techniques

### Intelligence
- Automatic image analysis
- Adaptive processing (skips unnecessary steps)
- Condition-based enhancements
- Smart parameter adjustment

### Speed
- Optimized PIL operations
- Conditional processing (skip when not needed)
- Input size limits (max 2000px)
- Fast JPEG output
- Processing time: 1-3 seconds typical

### Professional Results
- 2x resolution increase (Super-Resolution)
- Intelligent damage repair (Restoration)
- Natural-looking enhancements
- Preserved image characteristics
- Ready for professional use

---

## Usage

Both algorithms are called from the Flask backend when you:
1. Upload an image
2. Click "Super-Resolution" or "Image Restoration"
3. Python algorithms process it
4. Results returned in 1-3 seconds

The algorithms automatically adapt to your image's characteristics for best results!

