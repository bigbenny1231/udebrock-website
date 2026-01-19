# Google Apps Script Backend

This directory contains the Google Apps Script code for handling contact form submissions from the Udebrock Family Finishes website.

## Quick Links

- **Setup Guide:** See `SETUP_GUIDE.md` for complete step-by-step instructions
- **Code File:** `Code.gs` - Copy this entire file to Google Apps Script

## What This Does

- Receives form submissions from the website
- Logs leads to Google Sheets
- Saves uploaded images to Google Drive
- Sends email notifications
- Generates unique lead IDs

## Current Configuration

- **Email:** agarretson14.ag@gmail.com
- **Sheet Name:** "Udebrock Leads"
- **Drive Folder:** "Udebrock Project Photos"

## Setup Status

⚠️ **Not yet deployed** - Follow `SETUP_GUIDE.md` to:
1. Create Google Sheet
2. Create Google Drive folder
3. Deploy Apps Script
4. Update `.env` with Web App URL

## Files

- `Code.gs` - Main Apps Script code
- `SETUP_GUIDE.md` - Detailed setup instructions
- `README.md` - This file
