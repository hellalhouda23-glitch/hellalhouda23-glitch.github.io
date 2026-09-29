# 🕌 زكاتي - Zakat Calculator

A beautiful, free, offline-first Progressive Web App for calculating Zakat (Islamic obligatory charity) accurately according to the Hanafi madhab. Monetized through **Monetag** ad network.

## ✨ Features

- 💰 Calculate Zakat on cash, gold, silver, and investments
- 🌍 Supports 9 currencies (DZD, SAR, AED, EGP, MAD, TND, USD, EUR, GBP)
- 📱 Installable as PWA (works on iOS, Android, Desktop)
- 🌙 Works completely offline
- 🗂️ Saves calculation history locally (no server, fully private)
- 🌐 Bilingual: Arabic (RTL) + English
- 🎨 Beautiful Islamic-themed design
- 📤 Share results via Web Share API
- 💵 **Monetized with Monetag** (Push, Banner, Pop-up, Vignette, Native ads)

## 🧮 Calculation Logic

Based on the **Hanafi madhab**:
- **Nisab**: 85 grams of gold OR 595 grams of silver (whichever is lower)
- **Zakat rate**: 2.5% of wealth above Nisab
- **Deductible**: Deferred debts

All math runs client-side. No data leaves your device.

## 📁 Files

```
├── index.html         Main HTML + Monetag ad placements
├── styles.css         All styling (RTL + LTR + ad containers)
├── app.js             Calculations + UI logic
├── manifest.json      PWA manifest
├── service-worker.js  Offline support
├── privacy.html       Privacy policy (required by Monetag)
└── README.md          This file
```

## 💰 Monetag Setup (Step-by-Step)

### 1. Create a Monetag Account
1. Sign up at **https://monetag.com**
2. Add a payment method (PayPal recommended)
3. Add your site (URL will be `https://YOUR_USERNAME.github.io/zakati/`)

### 2. Get Your Zone IDs
After site approval, Monetag gives you 5 different Zone IDs:

| Zone | Use For | File Location |
|---|---|---|
| `ZONE_ID_PUSH` | Push notifications | `index.html` `<head>` |
| `ZONE_ID_BANNER_MOBILE` | Mobile banner (300x250) | `index.html` after result card |
| `ZONE_ID_BANNER_DESKTOP` | Desktop banner (728x90) | `index.html` before bottom nav |
| `ZONE_ID_NATIVE` | Native ad in About screen | `index.html` About section |
| `ZONE_ID_POP` | Pop-up ad | `index.html` before `</body>` |
| `ZONE_ID_VIGNETTE` | Vignette (full-screen between screens) | `index.html` before `</body>` |

### 3. Replace Placeholders
Open `index.html` and replace all instances of `ZONE_ID_*` with your actual zone IDs from Monetag dashboard.

**Quick search & replace:**
- `ZONE_ID_PUSH` → your push zone ID
- `ZONE_ID_BANNER_MOBILE` → your mobile banner zone ID
- `ZONE_ID_BANNER_DESKTOP` → your desktop banner zone ID
- `ZONE_ID_NATIVE` → your native zone ID
- `ZONE_ID_POP` → your pop zone ID
- `ZONE_ID_VIGNETTE` → your vignette zone ID

### 4. Update Privacy Email
In `privacy.html`, replace `contact@zakati.app` with your actual contact email (required by Monetag).

### 5. Deploy & Verify
1. Push changes to GitHub
2. Wait 5-10 minutes for Monetag to detect the ad scripts
3. Check Monetag dashboard — ads should show "Active"

---

## 🚀 Deployment to GitHub Pages

### First-time Setup

1. **Create GitHub Repository**
   - Go to github.com → New repository
   - Name: `zakati` (or whatever you like)
   - Public ✅ (required for free GitHub Pages)
   - Click **Create repository**

2. **Upload Files**
   - Click **uploading an existing file**
   - Drag and drop ALL these files:
     - `index.html`
     - `styles.css`
     - `app.js`
     - `manifest.json`
     - `service-worker.js`
     - `privacy.html`
     - `README.md` (optional)
   - Commit message: `Initial commit - Zakat Calculator PWA with Monetag ads`
   - Click **Commit changes**

3. **Enable GitHub Pages**
   - Go to **Settings** → **Pages** (left sidebar)
   - Source: **Deploy from a branch**
   - Branch: **main** → **/ (root)**
   - Click **Save**
   - Wait 1-2 minutes

4. **Your site is live!**
   - URL: `https://YOUR_GITHUB_USERNAME.github.io/zakati/`
   - Visit and test everything

### Updating Later

Just edit files in GitHub and commit. Changes go live within 1-2 minutes.

---

## 💰 Expected Revenue (Monetag)

Based on similar Islamic-themed PWAs:

| Daily Visitors | Monthly Revenue (USD) |
|---|---|
| 100 | $5-15 |
| 500 | $25-70 |
| 1,000 | $50-140 |
| 5,000 | $250-700 |
| **Ramadan boost** 🚀 | **3-5x more** |

**Goal: $25 for Google Play Console** — Achievable in 1-3 months with proper SEO.

---

## 📈 SEO Tips

After deploying, maximize traffic:

1. **Submit to Google Search Console**
   - https://search.google.com/search-console
   - Submit your sitemap

2. **Share on social media**
   - Reddit: r/islam, r/arabs, r/muslim
   - Twitter/X: Arabic + English hashtags
   - Facebook: Islamic groups
   - WhatsApp/Telegram: Muslim community groups

3. **Backlinks from Islamic sites**
   - Contact Islamic blogs/webmasters
   - Submit to Islamic app directories

4. **Keywords to target**
   - حاسبة زكاة
   - zakat calculator
   - كيفية حساب الزكاة
   - نصاب الزكاة
   - زكاة المال
   - زكاة الذهب

---

## 🔒 Privacy

- No tracking
- No analytics
- No backend
- All data stored in browser localStorage only
- Only Monetag collects anonymized ad data (see `privacy.html`)

## 📜 License

Free to use, modify, and distribute.

---

صُنع بـ ❤️ لخدمة المسلمين
