# Environment Variables Update Needed

After deploying your Google Apps Script (following `gas-backend/SETUP_GUIDE.md`), you'll need to update your `.env` file.

## Required Environment Variable

Add or update this line in your `.env` file:

```env
NEXT_PUBLIC_GAS_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

## Where to Get the URL

1. Follow the setup guide in `gas-backend/SETUP_GUIDE.md`
2. Complete **Step 6: Deploy as Web App**
3. Copy the **Web App URL** provided after deployment
4. Paste it as the value for `NEXT_PUBLIC_GAS_URL` in your `.env` file

## Full .env Example

Your `.env` file should include (with your actual values):

```env
# Facebook Public Page Scraper
FB_PAGE_URL=https://www.facebook.com/mielitepainting/

# Google Gemini API (Phase 4)
GEMINI_API_KEY=your-gemini-api-key

# Google Apps Script (Phase 6) - UPDATE THIS AFTER DEPLOYMENT
NEXT_PUBLIC_GAS_URL=https://script.google.com/macros/s/AKfycbz.../exec

# Square Payments (Phase 7)
NEXT_PUBLIC_SQUARE_PAYMENT_URL=your-square-payment-link-placeholder

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_BUSINESS_EMAIL=contact@udebrockfinishes.com
NEXT_PUBLIC_BUSINESS_PHONE=(231) 555-0123
```

## After Updating

Restart your development server:

```bash
npm run dev
```

## Verify It Works

1. Open your website
2. Fill out the contact form
3. Submit
4. Check for "Request Sent!" success message
5. Verify data appears in your Google Sheet
6. Check your email for notification

---

**Current Status:** ⚠️ Needs deployment - follow `gas-backend/SETUP_GUIDE.md`
