# Project Images Guide

## 📸 Adding Project Screenshots

Place your project screenshots in this directory (`public/projects/`) with the following filenames:

### Required Images:

1. **`studybuddy-quiz.png`** - StudyBuddy screenshot
   - Recommended: Quiz interface or topic dashboard
   - Size: 1200x630px (or similar aspect ratio)
   - Format: PNG or JPG

2. **`divvydo-split.png`** - DivvyDo screenshot
   - Recommended: Expense splitting interface with balance view
   - Size: 1200x630px
   - Format: PNG or JPG

3. **`smart-email-draft.png`** - Smart Email Assistant screenshot
   - Recommended: Email drafting interface or agent workflow
   - Size: 1200x630px
   - Format: PNG or JPG

4. **`coffee-check-monitor.png`** - Coffee Check screenshot
   - Recommended: Dashboard with active monitors and alerts
   - Size: 1200x630px
   - Format: PNG or JPG

5. **`fashion-ai-outfit.png`** - Fashion AI screenshot
   - Recommended: Outfit recommendation view with wardrobe
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
- Displays filename hint ("Add screenshot: /projects/studybuddy-quiz.png")
- Card still looks professional without images

### After Adding Images:
- **Image appears** at top of project card
- **Hover effect**: Image zooms slightly on hover
- **Metrics display** below image
- **Better visual hierarchy**

---

## ✨ Example Screenshots to Capture

### StudyBuddy:
- Quiz interface with question types
- Topic dashboard with progress bars
- Exam grading results with feedback
- PDF upload and processing flow

### DivvyDo:
- Expense splitting with multiple methods
- Balance dashboard (net + pairwise)
- Admin tools and CSV export
- Settlement recording view

### Smart Email Assistant:
- Email drafting interface
- Calendar integration view
- PII redaction demo
- Agent workflow diagram

### Coffee Check:
- Monitor dashboard with active checks
- Stock change alert notification
- Deal detection results
- Webhook/notification settings

### Fashion AI:
- Outfit recommendation cards
- Wardrobe browser by category
- Profile analysis results
- Color harmony visualization

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
    ├── studybuddy-quiz.png (add your screenshot)
    ├── divvydo-split.png (add your screenshot)
    ├── smart-email-draft.png (add your screenshot)
    ├── coffee-check-monitor.png (add your screenshot)
    └── fashion-ai-outfit.png (add your screenshot)
```

---

## 🔄 Updating Images

To update an image:
1. Replace the file with the same filename
2. Clear browser cache (Ctrl+Shift+R)
3. Image updates automatically

---

**Ready to add images?** Just drop your screenshots in this folder with the correct filenames and they'll appear instantly! 🎉

