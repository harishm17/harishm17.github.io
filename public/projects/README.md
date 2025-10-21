# Project Images Guide

## 📸 Adding Project Screenshots

Place your project screenshots in this directory (`public/projects/`) with the following filenames:

### Required Images:

1. **`market-insights.png`** - Market Insights Agent screenshot
   - Recommended: Dashboard view showing charts/metrics
   - Size: 1200x630px (or similar aspect ratio)
   - Format: PNG or JPG

2. **`email-assistant.png`** - Smart Email Assistant screenshot
   - Recommended: Email interface or agent workflow
   - Size: 1200x630px
   - Format: PNG or JPG

3. **`othello-bot.png`** - Othello Game Bot screenshot
   - Recommended: Game board with bot playing
   - Size: 1200x630px
   - Format: PNG or JPG

4. **`similarity-detection.png`** - Content Similarity Detection screenshot
   - Recommended: Web interface showing text comparison
   - Size: 1200x630px
   - Format: PNG or JPG

---

## 🎨 Image Guidelines

### Dimensions:
- **Recommended**: 1200x630px (16:9 aspect ratio)
- **Minimum**: 800x420px
- **Maximum**: 2400x1260px (for high-DPI displays)

### Format:
- **Best**: PNG (for UI screenshots with text)
- **Alternative**: JPG (for photos/images)
- **Optimize**: Compress images to < 500KB each

### Content Tips:
1. **Show the interface** - Actual app screenshots work best
2. **Highlight key features** - Focus on main functionality
3. **Use good lighting** - Clear, high-contrast images
4. **Crop appropriately** - Remove unnecessary chrome/toolbars
5. **Add context** - Show real data/usage if possible

---

## 🛠️ Image Optimization Tools

### Online:
- **TinyPNG**: https://tinypng.com/ (PNG compression)
- **Squoosh**: https://squoosh.app/ (Google's image optimizer)
- **Compressor.io**: https://compressor.io/

### CLI:
```bash
# Install ImageMagick
brew install imagemagick  # macOS
sudo apt-get install imagemagick  # Linux

# Resize and compress
convert input.png -resize 1200x630^ -gravity center -extent 1200x630 -quality 85 output.png
```

---

## 📱 Placeholder Behavior

### Before Adding Images:
- Shows a **gradient placeholder** with image icon
- Displays filename hint ("Add screenshot: /projects/market-insights.png")
- Card still looks professional without images

### After Adding Images:
- **Image appears** at top of project card
- **Hover effect**: Image zooms slightly on hover
- **Metrics display** below image
- **Better visual hierarchy**

---

## ✨ Example Screenshots to Capture

### Market Insights Agent:
- Dashboard with stock charts
- Agent response interface
- Technical analysis results
- News feed integration

### Smart Email Assistant:
- Email drafting interface
- Calendar integration view
- PII redaction demo
- Agent workflow diagram

### Othello Game Bot:
- Game board mid-game
- Bot move visualization
- Neural network evaluation
- Performance metrics graph

### Content Similarity Detection:
- Text comparison interface
- Similarity score display
- FastAPI web service
- Real-time detection demo

---

## 🚀 Quick Add Checklist

- [ ] Take/gather screenshots of each project
- [ ] Resize to recommended dimensions (1200x630px)
- [ ] Compress to < 500KB each
- [ ] Rename with exact filenames listed above
- [ ] Place in `public/projects/` directory
- [ ] Refresh website to see images
- [ ] Test on mobile devices

---

## 🎯 Pro Tips

1. **Use consistent styling** - Same background, similar framing
2. **Show real data** - Not lorem ipsum or placeholder content
3. **Add annotations** - Subtle arrows/highlights for key features
4. **Test dark mode** - Ensure images look good in both themes
5. **Mobile preview** - Check how images look on smaller screens

---

## 📊 File Structure

```
public/
└── projects/
    ├── README.md (this file)
    ├── market-insights.png (add your screenshot)
    ├── email-assistant.png (add your screenshot)
    ├── othello-bot.png (add your screenshot)
    └── similarity-detection.png (add your screenshot)
```

---

## 🔄 Updating Images

To update an image:
1. Replace the file with the same filename
2. Clear browser cache (Ctrl+Shift+R)
3. Image updates automatically

---

**Ready to add images?** Just drop your screenshots in this folder with the correct filenames and they'll appear instantly! 🎉

