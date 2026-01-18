# 📋 PROJECT APPROACH - SIMPLIFIED (OFFICIAL)

**Project**: U Debrock Finishes Website  
**Last Updated**: January 18, 2026  
**Status**: ✅ Active Approach

---

## 🎯 CRITICAL DECISIONS (Reference for All Future Work)

### 1. Facebook Content Scraping

**APPROACH**: Public page scraping (NO authentication)

**Why**:
- ✅ No login credentials needed
- ✅ No session management
- ✅ No expiration issues
- ✅ Simpler, faster, more reliable

**Implementation**:
- Script: `automation/scrape_public_page.py`
- Launcher: `automation/run-scraper.ps1`
- Config: `FB_PAGE_URL` in `.env`

**Requirement**: Facebook page must be public

---

### 2. Square Payments

**APPROACH**: Link-only (NO API integration)

**Why**:
- ✅ No API keys or tokens
- ✅ No webhook setup
- ✅ Square handles all payment security
- ✅ PCI compliance is Square's responsibility
- ✅ Saves ~20 hours of development

**Implementation**:
- Get payment link from Square Dashboard
- Add to `.env` as `NEXT_PUBLIC_SQUARE_PAYMENT_URL`
- Create button that links to Square page
- Square handles everything else

**Customer Flow**:
1. Click "Get Quote" on website
2. Redirect to Square payment page
3. Square processes payment
4. You get notification from Square

---

### 3. What We DON'T Use

**Removed/Deleted**:
- ❌ `auth_setup.py` (Facebook authentication)
- ❌ `PHASE2_INSTRUCTIONS.md` (auth instructions)
- ❌ `run-auth-setup.ps1` (auth launcher)
- ❌ `run-auth-setup.sh` (Unix auth launcher)
- ❌ `PHASE2_COMPLETE.md` (old Phase 2 docs)

**Not Needed**:
- ❌ Facebook login credentials
- ❌ Session files
- ❌ Square API keys
- ❌ Square webhooks
- ❌ Payment processing code

---

## 📝 Required Environment Variables

**Minimum Required**:
```env
# Facebook (public page URL only)
FB_PAGE_URL=https://www.facebook.com/your-business-page

# Square (payment link only - add later when ready)
NEXT_PUBLIC_SQUARE_PAYMENT_URL=https://square.link/u/placeholder
```

**Optional**:
```env
# AI content generation
GEMINI_API_KEY=your-gemini-api-key
```

**Site Config**:
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3004
NEXT_PUBLIC_BUSINESS_NAME=U Debrock Finishes
NEXT_PUBLIC_BUSINESS_EMAIL=contact@udebrockfinishes.com
NEXT_PUBLIC_BUSINESS_PHONE=(231) 555-0123
```

---

## 🚀 How to Run Facebook Scraper

**Windows (PowerShell)**:
```powershell
cd C:\Users\Andrew\udebrock-website\automation
.\run-scraper.ps1
```

**Manual**:
```powershell
cd automation
.\venv\Scripts\Activate.ps1
python scrape_public_page.py
```

**Output**: `automation/output/facebook_data_YYYYMMDD_HHMMSS.json`

---

## 🏗️ Tech Stack (Simplified)

### Frontend
- Next.js 15 (App Router)
- React + TypeScript
- Tailwind CSS v4 (custom theme)
- Framer Motion
- Radix UI components

### Automation
- Python 3.14+ (local venv)
- Playwright (browser automation)
- No authentication libraries needed

### Payments
- Square (link-only, no SDK)

### Optional
- Google Gemini AI (content generation)
- Google Apps Script (backend, if needed)

---

## 🔐 Security Model

**What We Store**:
- ✅ Public Facebook page URL (not sensitive)
- ✅ Public Square payment link (meant to be shared)
- ✅ Public contact info (meant to be shared)

**What We DON'T Store**:
- ❌ No passwords
- ❌ No API tokens (except optional Gemini)
- ❌ No session cookies
- ❌ No payment data

**Result**: Minimal attack surface, maximum security

---

## 📁 Current File Structure

```
udebrock-website/
├── app/                          # Next.js pages
├── components/                   # React components
├── automation/
│   ├── venv/                    # Python virtual env
│   ├── output/                  # Scraped data
│   ├── scrape_public_page.py   # ✅ Main scraper
│   ├── run-scraper.ps1         # ✅ Launcher
│   ├── README.md               # Documentation
│   └── requirements.txt        # Python deps
├── public/                      # Static assets
├── .env                        # Config (gitignored)
├── .env.example               # Template
├── PROJECT_APPROACH.md        # ✅ This file (reference)
├── QUICK_START.md            # Getting started
├── SIMPLIFIED_APPROACH.md    # Why this approach
└── APPROACH_UPDATE.md        # What changed
```

---

## 🎯 Development Workflow

### 1. Content Updates

When Facebook page is updated:
```powershell
cd automation
.\run-scraper.ps1
```

Data saved to `automation/output/` - use in website

### 2. Website Development

```powershell
npm run dev  # Runs on http://localhost:3004
```

### 3. Payment Setup (When Ready)

1. Get Square link from Dashboard
2. Update `.env`:
   ```env
   NEXT_PUBLIC_SQUARE_PAYMENT_URL=https://square.link/u/your-actual-link
   ```
3. Add button to site

---

## 🛡️ Project Isolation

**Location**: `C:\Users\Andrew\udebrock-website`

**Isolation Verified**:
- ✅ Local node_modules (303 packages)
- ✅ Local Python venv
- ✅ Port 3004 (not 3000)
- ✅ Separate git repository
- ✅ No global packages installed
- ✅ No impact on apex.fun project

**Verify Anytime**: `.\verify-isolation.ps1`

---

## 📊 Time Savings

| Task | Old Approach | New Approach | Saved |
|------|--------------|--------------|-------|
| Facebook Setup | 1-2 hours | 30 seconds | ~2 hours |
| FB Maintenance | Ongoing | None | Ongoing |
| Square Setup | 10-20 hours | 30 minutes | ~20 hours |
| Square Maintenance | Ongoing | None | Ongoing |
| **Total** | **22+ hours** | **30 minutes** | **~22 hours** |

---

## 📖 Documentation Index

**Start Here**:
- `QUICK_START.md` - 3-step setup guide

**Reference**:
- `PROJECT_APPROACH.md` - This file (official approach)
- `SIMPLIFIED_APPROACH.md` - Why this is better
- `APPROACH_UPDATE.md` - What changed from original plan

**Technical**:
- `automation/README.md` - Automation details
- `README.md` - Full project documentation
- `PROJECT_ISOLATION_REPORT.md` - Isolation verification

---

## ⚠️ Important Notes

1. **Facebook page MUST be public** - Private pages won't work with this approach
2. **Square link** - Add real link when ready, placeholder for now
3. **No authentication** - This is intentional and correct
4. **Old auth files deleted** - They were conflicting, correctly removed
5. **Approach saved** - AI assistant has this documented for future sessions

---

## 🔄 If Requirements Change

**If you need authenticated Facebook scraping later**:
- Would require rebuilding auth system
- Original files were deleted to avoid conflicts
- Not recommended unless absolutely necessary

**If you need Square API integration later**:
- Would require significant development (~20 hours)
- Link approach is recommended for most use cases
- Only use API if you need custom transaction handling

---

## ✅ Decision Log

| Date | Decision | Reason |
|------|----------|--------|
| 2026-01-18 | Use public Facebook scraping | Simpler, no auth needed |
| 2026-01-18 | Use Square payment links | Simpler, more secure |
| 2026-01-18 | Delete auth-related files | Avoid conflicting pathways |
| 2026-01-18 | Save approach to memory | Ensure consistency |

---

**THIS IS THE OFFICIAL APPROACH - Follow this for all future development**

---

**Created**: January 18, 2026  
**Status**: ✅ Active  
**Approved By**: User  
**Saved to AI Memory**: ✅ Yes
