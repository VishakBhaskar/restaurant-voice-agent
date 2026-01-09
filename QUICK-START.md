# 🚀 Quick Start Guide - Birrieria Chalio Website

Get your restaurant website up and running in minutes!

## ⚡ Fastest Way to Preview

### Step 1: Generate Placeholder Images

Choose one method:

#### Method A: Interactive HTML Tool (Recommended)
```bash
# Just open this file in any browser:
generate-placeholders.html
```
- Click "Generate All Placeholders"
- Images will be created instantly
- Download them to the `images/` folder

#### Method B: Python Script
```bash
# Install Pillow (one-time)
pip install Pillow

# Run the script
python generate_images.py
```
All images will be automatically saved to the `images/` folder.

#### Method C: Manual Download
If the above methods don't work, manually download placeholder images:
1. Open `generate-placeholders.html` in a browser
2. Click "Generate Placeholder" on each image
3. Click "Download" for each image
4. Save to the `images/` folder

### Step 2: Open the Website
```bash
# Simply open index.html in your browser
index.html
```

That's it! Your website is now running with placeholder images.

---

## 🎨 For Production: Generate AI Food Images

### Quick AI Image Generation Steps

1. **Choose an AI Tool:**
   - **DALL-E 3** (Best quality): https://openai.com/dall-e-3
   - **Leonardo.AI** (Free tier): https://leonardo.ai
   - **Midjourney** (Pro quality): https://midjourney.com

2. **Use the Prompts:**
   - Open `IMAGE-GENERATION-GUIDE.md`
   - Copy each prompt for your menu items
   - Paste into your chosen AI tool
   - Generate and download

3. **Save Images:**
   - Save with exact filenames from the guide
   - Place in the `images/` folder
   - Overwrite placeholder images

4. **Optimize:**
   - Compress images at https://tinypng.com/
   - Keep quality high but reduce file size

---

## ⚙️ Quick Customization

### Change Phone Number

**In `script.js` (line 48):**
```javascript
function callRestaurant() {
    window.location.href = 'tel:YOUR_PHONE_NUMBER';
}
```

**In `index.html` footer (around line 180):**
```html
<a href="tel:YOUR_PHONE_NUMBER">(YOUR) PHONE-NUMBER</a>
```

### Change Address

**In `index.html` footer (around line 185):**
```html
<span>YOUR ADDRESS HERE</span>
```

### Change Hours

**In `index.html` footer (around line 190-210):**
```html
<div class="hours-item">
    <span>Monday</span>
    <span>YOUR HOURS</span>
</div>
```

### Change Colors

**In `styles.css` (lines 12-20):**
```css
:root {
    --gold: #D4AF37;      /* Change gold accent */
    --red: #DC3545;        /* Change button color */
    --bg-dark: #0A0A0A;    /* Change background */
}
```

---

## 🌐 Deploy Your Website

### Option 1: GitHub Pages (Free)
```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial website"

# Create repo on GitHub, then:
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```
Then enable GitHub Pages in your repo settings.

### Option 2: Netlify (Free, Instant)
1. Go to https://app.netlify.com/drop
2. Drag and drop your entire project folder
3. Done! Your site is live.

### Option 3: Vercel (Free, Fast)
1. Install: `npm i -g vercel`
2. Run: `vercel`
3. Follow prompts
4. Done!

---

## ✅ Pre-Launch Checklist

Before going live, verify:

- [ ] All images generated (24 total)
- [ ] Phone number updated (2 places)
- [ ] Address updated (1 place)
- [ ] Hours updated (7 days)
- [ ] Menu items and prices verified
- [ ] Tested on mobile device
- [ ] Tested call functionality
- [ ] All images compressed
- [ ] Tested in Chrome, Firefox, Safari

---

## 🆘 Troubleshooting

### Images not showing?
- Check that images are in the `images/` folder
- Verify filenames match exactly (case-sensitive)
- Clear browser cache (Ctrl+F5 or Cmd+Shift+R)

### Mobile menu not working?
- Check browser console for JavaScript errors
- Ensure `script.js` is loaded
- Try a different browser

### Colors look wrong?
- Check CSS file loaded properly
- Verify no browser extensions interfering
- Clear browser cache

### Can't generate Python images?
```bash
# Install Pillow
pip install Pillow

# If pip doesn't work, try:
pip3 install Pillow

# Or use conda:
conda install pillow
```

---

## 📚 More Resources

- **Full Documentation**: `README.md`
- **Image Prompts**: `IMAGE-GENERATION-GUIDE.md`
- **Interactive Generator**: `generate-placeholders.html`
- **Python Script**: `generate_images.py`

---

## 💡 Tips

1. **Test locally first** before deploying
2. **Compress all images** before going live
3. **Test on real mobile devices**, not just browser dev tools
4. **Update prices regularly** to keep menu current
5. **Monitor performance** with Google Lighthouse

---

## 🎉 You're Ready!

Your website is ready to launch. Generate beautiful AI food images, customize the content, and go live!

**Need help?** Check the full README.md or refer to the detailed guides.

---

**Built for Birrieria Chalio with ❤️**
