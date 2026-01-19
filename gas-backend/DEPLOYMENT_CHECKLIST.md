# Google Apps Script Deployment Checklist

Follow this checklist to deploy your contact form backend.

## ☐ Pre-Deployment

- [ ] Have access to Google account: `agarretson14.ag@gmail.com`
- [ ] Read through `SETUP_GUIDE.md`
- [ ] Have 15-20 minutes to complete setup

---

## ☐ Step 1: Google Sheet Setup

- [ ] Go to [sheets.google.com](https://sheets.google.com)
- [ ] Create new spreadsheet named "Udebrock Leads"
- [ ] Copy Sheet ID from URL
- [ ] Save Sheet ID: `_______________________________`

---

## ☐ Step 2: Google Drive Setup

- [ ] Go to [drive.google.com](https://drive.google.com)
- [ ] Create new folder named "Udebrock Project Photos"
- [ ] Copy Folder ID from URL
- [ ] Save Folder ID: `_______________________________`

---

## ☐ Step 3: Apps Script Setup

- [ ] Go to [script.google.com](https://script.google.com)
- [ ] Create new project named "Udebrock Form Backend"
- [ ] Copy ALL code from `Code.gs` in this folder
- [ ] Paste into Apps Script editor
- [ ] Replace `YOUR_SHEET_ID` with Sheet ID from Step 1
- [ ] Replace `YOUR_FOLDER_ID` with Folder ID from Step 2
- [ ] Verify email is `agarretson14.ag@gmail.com`
- [ ] Save the script (Ctrl+S or Cmd+S)

---

## ☐ Step 4: Test Setup (Recommended)

- [ ] Select `testSetup` from function dropdown
- [ ] Click Run (▶️)
- [ ] Grant permissions when prompted
- [ ] Check Google Sheet for test entry
- [ ] Check email for test notification
- [ ] Delete test entry from sheet

---

## ☐ Step 5: Deploy Web App

- [ ] Click "Deploy" → "New deployment"
- [ ] Select type: "Web app"
- [ ] Set description: "Production v1"
- [ ] Set "Execute as": Me
- [ ] Set "Who has access": Anyone
- [ ] Click "Deploy"
- [ ] Copy Web App URL
- [ ] Save Web App URL: `_______________________________`

---

## ☐ Step 6: Update Website

- [ ] Open `.env` file in project root
- [ ] Update `NEXT_PUBLIC_GAS_URL` with Web App URL
- [ ] Save `.env` file
- [ ] Restart dev server: `npm run dev`

---

## ☐ Step 7: Final Test

- [ ] Open website: http://localhost:3005
- [ ] Scroll to contact form
- [ ] Fill out form with test data
- [ ] Upload test image (optional)
- [ ] Add color selections (optional)
- [ ] Click "Send Request"
- [ ] Verify "Request Sent!" message appears
- [ ] Check Google Sheet for new lead entry
- [ ] Check Google Drive for new folder (if image uploaded)
- [ ] Check email for notification

---

## ✅ Deployment Complete!

Once all boxes are checked, your contact form is fully functional and will:
- Save all leads to Google Sheets
- Store uploaded images in Google Drive
- Send email notifications to `agarretson14.ag@gmail.com`
- Generate unique lead IDs for tracking

---

## 🔄 To Change Google Account Later

1. Log in to new Google account
2. Repeat Steps 1-6 above with new account
3. Update `.env` with new Web App URL
4. Previous deployment will remain active until you disable it

---

## 📞 Troubleshooting

**Problem:** Authorization errors  
**Solution:** Run `testSetup` function and grant all requested permissions

**Problem:** Form submission fails  
**Solution:** Verify Web App URL in `.env` is correct and complete

**Problem:** No email received  
**Solution:** Check spam folder, verify email in `Code.gs` is correct

**Problem:** Can't find Sheet/Folder  
**Solution:** Double-check IDs are copied correctly (no extra spaces)

---

**Need detailed instructions?** See `SETUP_GUIDE.md`
