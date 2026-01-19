# Google Apps Script Setup Guide
## Udebrock Family Finishes - Lead Management System

This guide will help you set up the Google Apps Script backend to receive and manage contact form submissions.

---

## 📋 Prerequisites

- Google Account: `agarretson14.ag@gmail.com` (or any Gmail account)
- Access to Google Drive, Sheets, and Apps Script

---

## 🚀 Step-by-Step Setup

### Step 1: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it: **"Udebrock Leads"**
4. Copy the **Sheet ID** from the URL:
   ```
   https://docs.google.com/spreadsheets/d/[THIS_IS_THE_SHEET_ID]/edit
   ```
5. Save this ID for Step 4

### Step 2: Create Google Drive Folder

1. Go to [Google Drive](https://drive.google.com)
2. Create a new folder
3. Name it: **"Udebrock Project Photos"**
4. Open the folder and copy the **Folder ID** from the URL:
   ```
   https://drive.google.com/drive/folders/[THIS_IS_THE_FOLDER_ID]
   ```
5. Save this ID for Step 4

### Step 3: Create Google Apps Script Project

1. Go to [Google Apps Script](https://script.google.com)
2. Click **"New Project"**
3. Name it: **"Udebrock Form Backend"**
4. Delete the default `myFunction()` code
5. Copy **ALL** the code from `gas-backend/Code.gs` in this repository
6. Paste it into the Apps Script editor

### Step 4: Configure the Script

In the Apps Script editor, update these constants at the top:

```javascript
const SHEET_ID = "YOUR_SHEET_ID";          // Replace with Step 1 Sheet ID
const DRIVE_FOLDER_ID = "YOUR_FOLDER_ID";  // Replace with Step 2 Folder ID
const NOTIFICATION_EMAIL = "agarretson14.ag@gmail.com"; // Your email (already set)
```

**Example:**
```javascript
const SHEET_ID = "1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t";
const DRIVE_FOLDER_ID = "1zYxWvUtSrQpOnMlKjIhGfEdCbA9876543210";
const NOTIFICATION_EMAIL = "agarretson14.ag@gmail.com";
```

### Step 5: Test the Setup (Optional but Recommended)

1. In Apps Script, select the function dropdown (next to "Debug")
2. Choose **`testSetup`**
3. Click **Run** (▶️)
4. You may need to authorize the script:
   - Click **"Review Permissions"**
   - Choose your Google account
   - Click **"Advanced"** → **"Go to Udebrock Form Backend (unsafe)"**
   - Click **"Allow"**
5. Check your Google Sheet - you should see a test lead entry
6. Check your email - you should receive a test notification

### Step 6: Deploy as Web App

1. Click **"Deploy"** → **"New deployment"**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **"Web app"**
4. Configure:
   - **Description:** `Production v1`
   - **Execute as:** `Me (your-email@gmail.com)`
   - **Who has access:** `Anyone`
5. Click **"Deploy"**
6. Copy the **Web App URL** (it will look like):
   ```
   https://script.google.com/macros/s/AKfycbz.../exec
   ```

### Step 7: Update Your Website Environment Variables

1. Open `.env` in your project root
2. Update the `NEXT_PUBLIC_GAS_URL` with your Web App URL:
   ```env
   NEXT_PUBLIC_GAS_URL=https://script.google.com/macros/s/AKfycbz.../exec
   ```
3. Save the file
4. Restart your Next.js dev server:
   ```bash
   npm run dev
   ```

---

## ✅ Testing the Complete Flow

1. Open your website: `http://localhost:3005`
2. Scroll to the contact form
3. Fill out all fields
4. Upload a test image (optional)
5. Add color selections (optional)
6. Click **"Send Request"**
7. You should see: **"Request Sent!"**
8. Check:
   - ✅ Google Sheet has new lead entry
   - ✅ Google Drive has new folder with images (if uploaded)
   - ✅ Email notification received

---

## 🔄 Changing to a Different Google Account Later

To switch to a different Google account:

1. **Create new resources** with the new account:
   - New Google Sheet
   - New Drive folder
2. **Copy the existing script**:
   - Go to your current Apps Script project
   - Select all code (Ctrl+A)
   - Copy it (Ctrl+C)
3. **Create new Apps Script project** with new account:
   - Log in to the new Google account
   - Go to [script.google.com](https://script.google.com)
   - Create new project
   - Paste the code
4. **Update the IDs**:
   - Update `SHEET_ID` with new Sheet ID
   - Update `DRIVE_FOLDER_ID` with new Folder ID
   - Update `NOTIFICATION_EMAIL` with new email
5. **Redeploy**:
   - Deploy as Web App (Step 6)
   - Update `.env` with new Web App URL

---

## 📊 What Gets Tracked

### Google Sheet Columns:
- Lead ID (auto-generated: `UDF-ABC123-XYZ`)
- Timestamp
- Name, Email, Phone
- Project Type
- Message
- Color Selections (Primary, Secondary, Stain)
- Needs Color Help (Yes/No)
- Status (New, Contacted, Quoted, etc.)
- Notes (manual entry)

### Google Drive:
- Folder per lead: `UDF-ABC123_John-Smith/`
  - Project photos: `image-1.jpg`, `image-2.jpg`, etc.
- Shared folder: `Color Previews/`
  - Color preview screenshots: `UDF-ABC123_preview.png`

### Email Notification:
Sent to `agarretson14.ag@gmail.com` with:
- Lead details
- Project description
- Color selections
- Special flags for SW consultation needs

---

## 🔧 Troubleshooting

### "Authorization Required" Error
- Re-run Step 5 and authorize the script

### "Cannot find Sheet" Error
- Double-check your `SHEET_ID` in Step 4

### "Cannot find Folder" Error
- Double-check your `DRIVE_FOLDER_ID` in Step 4
- Make sure the folder is in the same Google account as the script

### Form Submission Fails
- Check that `NEXT_PUBLIC_GAS_URL` in `.env` is correct
- Verify the Web App is deployed with "Anyone" access
- Check the Apps Script execution logs for errors

### No Email Received
- Check spam folder
- Verify `NOTIFICATION_EMAIL` is correct
- Check Apps Script execution logs

---

## 📞 Need Help?

If you encounter issues:
1. Check the Apps Script execution logs: **Executions** tab in Apps Script
2. Verify all IDs are correct
3. Test with the `testSetup()` function first
4. Ensure all permissions are granted

---

## 🎉 You're All Set!

Once configured, your contact form will:
- ✅ Save all leads to Google Sheets
- ✅ Store project photos in Google Drive
- ✅ Send instant email notifications
- ✅ Generate unique lead IDs for tracking
- ✅ Organize everything automatically

Your leads are now professionally managed! 🚀
