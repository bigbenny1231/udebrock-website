# Deploy Website for Mobile Testing & Demo

## Quick Options to Show Your Boss Tomorrow

### Option 1: Test Locally on Your Phone (Right Now - Free)

**Requirements:** Your phone and computer on the same Wi-Fi network

1. **Find your computer's local IP address:**
   ```powershell
   ipconfig
   ```
   Look for "IPv4 Address" (usually something like `192.168.1.xxx`)

2. **Start the dev server on your computer:**
   ```powershell
   npm run dev
   ```
   Note: It's running on port 3004 (not 3000)

3. **On your phone's browser, go to:**
   ```
   http://YOUR_IP_ADDRESS:3004
   ```
   Example: `http://192.168.1.100:3004`

4. **Make sure Windows Firewall allows the connection:**
   - Windows will prompt you - click "Allow access"
   - Or manually allow port 3004 in Windows Firewall

**Pros:** Free, instant, works right now  
**Cons:** Only works when your computer is on and on same network

---

### Option 2: Deploy to Vercel (Best for Tomorrow - Free)

**Time:** ~10 minutes  
**Cost:** Free  
**Result:** Live URL you can share anywhere

#### Steps:

1. **Push to GitHub** (if not already):
   ```powershell
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Go to Vercel:**
   - Visit: https://vercel.com
   - Sign up/login with GitHub

3. **Import Project:**
   - Click "Add New" → "Project"
   - Select your `udebrock-website` repository
   - Click "Import"

4. **Configure:**
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

5. **Environment Variables:**
   Add these in Vercel dashboard:
   ```
   NEXT_PUBLIC_GAS_URL=your-google-apps-script-url
   NEXT_PUBLIC_SQUARE_PAYMENT_URL=your-square-link
   FB_PAGE_URL=https://www.facebook.com/mielitepainting/
   ```

6. **Deploy:**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Get your live URL: `https://udebrock-website.vercel.app`

**Pros:** Free, permanent URL, works anywhere, fast  
**Cons:** Takes 10 minutes to set up

---

### Option 3: Chrome DevTools Mobile View (For Testing Now)

**To see mobile view in Chrome:**

1. Open your site: `http://localhost:3004`
2. Press `F12` or right-click → "Inspect"
3. Click the **device toolbar icon** (phone/tablet icon) or press `Ctrl+Shift+M`
4. Select a device (iPhone, Android, etc.) from the dropdown
5. Test different screen sizes

**This simulates mobile but doesn't test actual touch/gestures**

---

## Recommended: Deploy to Vercel

For showing your boss tomorrow, **Option 2 (Vercel)** is best because:
- ✅ Works on any phone/device
- ✅ No need for your computer to be on
- ✅ Professional URL you can share
- ✅ Free forever
- ✅ Automatic HTTPS
- ✅ Fast loading

---

## After Deployment

Once deployed, update your Google Apps Script URL in Vercel's environment variables so the contact form works on the live site.
