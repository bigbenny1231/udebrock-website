# Automation Scripts

Python automation scripts for U Debrock Finishes website content management.

## 🔧 Setup

### Prerequisites
- Python 3.14+ installed
- Virtual environment activated
- `.env` file configured with credentials

### First-Time Setup

1. **Navigate to automation directory:**
   ```bash
   cd automation
   ```

2. **Activate virtual environment:**
   
   **Windows:**
   ```powershell
   .\venv\Scripts\Activate.ps1
   ```
   
   **macOS/Linux:**
   ```bash
   source venv/bin/activate
   ```

3. **Verify installation:**
   ```bash
   python --version    # Should show 3.14+
   pip list           # Should show playwright, etc.
   ```

---

## 🔐 Phase 2: Facebook Session Capture

### Purpose
Captures Facebook authentication session for automated scraping without needing to login each time.

### Before Running

1. **Update `.env` in project root** with your Facebook credentials:
   ```env
   FB_EMAIL=your-actual-email@example.com
   FB_PASSWORD=your-actual-password
   FB_PAGE_URL=https://www.facebook.com/your-business-page
   ```

2. **Ensure virtual environment is activated** (see Setup above)

### Running the Script

**Windows:**
```powershell
cd automation
.\venv\Scripts\Activate.ps1
python auth_setup.py
```

**macOS/Linux:**
```bash
cd automation
source venv/bin/activate
python auth_setup.py
```

### What Happens

1. ✅ Script launches visible Chrome browser
2. ✅ Navigates to Facebook login
3. ✅ Fills in email/password from `.env`
4. ⏸️ **WAITS for you to:**
   - Click "Log In" button
   - Complete 2FA/security check
   - Wait until you see Facebook feed
5. ✅ Captures authenticated session
6. ✅ Saves to `playwright-state/fb-session.json`

### Timeline

- Total wait time: **120 seconds** (2 minutes)
- Manual steps should take: **30-60 seconds**

### After Completion

- ✅ Session file saved to: `automation/playwright-state/fb-session.json`
- ✅ Session is **gitignored** (never committed)
- ✅ Session can be reused for automated scraping
- ✅ Re-run script if session expires (usually 30-60 days)

### Security Notes

🔒 **Session file is sensitive:**
- Contains authenticated cookies
- Gitignored by default
- Local to this project only
- Never share or commit

🔒 **Credentials are protected:**
- Stored in `.env` (gitignored)
- Never hardcoded in scripts
- Never committed to git

---

## 📁 Directory Structure

```
automation/
├── venv/                     # Python virtual environment (local)
├── playwright-state/         # Session files (gitignored)
│   └── fb-session.json      # Captured session
├── output/                   # Generated content (gitignored)
├── requirements.txt          # Python dependencies
├── auth_setup.py            # Phase 2: Session capture
└── README.md                # This file
```

---

## 🔍 Troubleshooting

### "FB_EMAIL or FB_PASSWORD not set"
- Check `.env` file exists in **project root** (not automation folder)
- Verify variables are set correctly
- No quotes around values

### "Please update .env with your actual Facebook credentials"
- You're still using placeholder values
- Update with real credentials

### "Timeout" error
- Login took longer than 2 minutes
- Run script again and complete 2FA faster
- Check internet connection

### Browser doesn't open
- Verify Playwright browsers are installed:
  ```bash
  playwright install chromium
  ```

### Session expires quickly
- Facebook may require re-authentication
- Normal if account has security flags
- Re-run `auth_setup.py` as needed

---

## 🚀 Next Phases (Coming Soon)

- **Phase 3**: Facebook page scraper
- **Phase 4**: Content extraction with AI
- **Phase 5**: Image processing
- **Phase 6**: Google Apps Script integration

---

## 🛡️ Isolation Note

This automation is **local to udebrock-website project only.**

- ✅ Uses project-local Python venv
- ✅ All packages installed locally
- ✅ No global Python packages installed
- ✅ No impact on other projects (including apex.fun)
- ✅ Session files are project-specific

---

## 📞 Need Help?

1. Check this README
2. Review `.env.example` for required variables
3. Verify virtual environment is activated
4. Check `playwright-state/` folder exists and is writable
