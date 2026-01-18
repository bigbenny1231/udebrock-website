# 🚀 QUICK START - U Debrock Finishes

**Simple approach - No complex authentication!**

---

## ✅ 3-Step Setup (30 minutes)

### Step 1: Update `.env` File

Edit `C:\Users\Andrew\udebrock-website\.env`:

```env
# Your public Facebook business page
FB_PAGE_URL=https://www.facebook.com/your-actual-page

# Your Square payment link (get from Square Dashboard)
NEXT_PUBLIC_SQUARE_PAYMENT_URL=https://square.link/u/your-business

# Site info
NEXT_PUBLIC_BUSINESS_NAME=U Debrock Finishes
NEXT_PUBLIC_BUSINESS_EMAIL=contact@udebrockfinishes.com
NEXT_PUBLIC_BUSINESS_PHONE=(231) 555-0123
```

---

### Step 2: Scrape Your Facebook Page

```powershell
cd C:\Users\Andrew\udebrock-website\automation
.\run-scraper.ps1
```

**What happens**:
- ✅ Scrapes your public Facebook page (no login!)
- ✅ Extracts posts, images, description
- ✅ Saves to `automation/output/facebook_data_[timestamp].json`

**Time**: ~30 seconds

---

### Step 3: Get Your Square Payment Link

1. **Login to Square**: https://squareup.com/dashboard
2. **Navigate to**: Online → Payment Links
3. **Copy your link**: Something like `https://square.link/u/yourname`
4. **Add to `.env`**: 
   ```env
   NEXT_PUBLIC_SQUARE_PAYMENT_URL=https://square.link/u/yourname
   ```

**Time**: ~5 minutes

---

## 🎯 That's It!

You now have:
- ✅ Your Facebook content scraped and saved
- ✅ Square payment link ready to add to site
- ✅ No complex authentication
- ✅ No API keys to manage (except optional Gemini)

---

## 💻 How to Use in Your Website

### Add Payment Button

```tsx
// Example: components/ui/QuoteButton.tsx
export function QuoteButton() {
  return (
    <a
      href={process.env.NEXT_PUBLIC_SQUARE_PAYMENT_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-forest-600 hover:bg-forest-700 text-white px-8 py-4 rounded-lg font-display text-lg"
    >
      Request a Quote
    </a>
  );
}
```

### Use Scraped Data

```tsx
// Example: Load Facebook data in your page
import facebookData from '@/automation/output/facebook_data_latest.json';

export default function PortfolioPage() {
  return (
    <div>
      <h1>{facebookData.info.name}</h1>
      <p>{facebookData.info.about}</p>
      
      {facebookData.posts.map((post, i) => (
        <div key={i}>
          <p>{post.text}</p>
        </div>
      ))}
      
      <div className="grid grid-cols-3 gap-4">
        {facebookData.images.map((img, i) => (
          <img key={i} src={img.url} alt={img.alt} />
        ))}
      </div>
    </div>
  );
}
```

---

## 🔄 Regular Updates

### Re-scrape Facebook Page

Just run the scraper again whenever you want fresh content:

```powershell
cd automation
.\run-scraper.ps1
```

**Frequency**: Weekly, monthly, or whenever you update your Facebook page

---

## 📞 Customer Payment Flow

1. **Customer** visits your website
2. **Customer** clicks "Get Quote" button
3. **Redirected** to your Square payment page
4. **Customer** enters details and pays
5. **Square** processes payment
6. **You** get email notification from Square
7. **Customer** gets receipt from Square

**You manage**: Nothing! Square handles it all.

---

## 🎨 Website Features to Build

### Phase 1: Basic Site ✅
- [x] Next.js 15 setup
- [x] Custom design system
- [x] Project structure

### Phase 2: Content ⏳
- [ ] Homepage with services
- [ ] Portfolio/gallery section
- [ ] About page
- [ ] Contact information

### Phase 3: Integration ⏳
- [ ] Load Facebook data
- [ ] Display portfolio images
- [ ] Add Square payment button
- [ ] Contact form (optional)

### Phase 4: Polish ⏳
- [ ] SEO optimization
- [ ] Mobile responsiveness
- [ ] Performance optimization
- [ ] Deploy to production

---

## 🛠️ Useful Commands

### Development Server
```powershell
cd C:\Users\Andrew\udebrock-website
npm run dev
# Opens at http://localhost:3004
```

### Scrape Facebook
```powershell
cd automation
.\run-scraper.ps1
```

### Check Isolation
```powershell
.\verify-isolation.ps1
```

### Build for Production
```powershell
npm run build
npm run start
```

---

## 📁 Project Structure

```
udebrock-website/
├── app/                    # Next.js pages
│   ├── page.tsx           # Homepage
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Reusable UI
│   ├── sections/         # Page sections
│   └── forms/            # Forms
├── automation/           # Python scripts
│   ├── scrape_public_page.py    # Facebook scraper
│   ├── run-scraper.ps1          # Quick launcher
│   └── output/                  # Scraped data
├── public/              # Static assets
└── .env                 # Configuration
```

---

## 🎯 What's Different (Simpler!)

### You DON'T Need:
- ❌ Facebook login credentials
- ❌ Facebook session management
- ❌ Square API keys
- ❌ Square webhook setup
- ❌ Payment processing code
- ❌ PCI compliance work

### You DO Need:
- ✅ Public Facebook page URL
- ✅ Square payment link
- ✅ Basic website content

**Savings**: ~20 hours of development + ongoing maintenance

---

## 💡 Tips

### For Facebook Scraping
- Make sure your page is **public** (not private)
- Run scraper after you update Facebook content
- Check `automation/output/` for results
- Can be automated with Windows Task Scheduler

### For Square Payments
- Customize your Square payment page in Square Dashboard
- Add your logo and branding
- Set up automatic email notifications
- Test with a small transaction first

### For Website
- Use scraped data for portfolio section
- Update regularly with new projects
- Keep contact info current
- Test on mobile devices

---

## 📞 Need Help?

### Documentation
- `SIMPLIFIED_APPROACH.md` - Why this approach is better
- `automation/README.md` - Automation details
- `PROJECT_ISOLATION_REPORT.md` - Isolation verification
- `README.md` - Full project documentation

### Common Issues

**"FB_PAGE_URL not set"**  
→ Update `.env` with your actual page URL

**"Could not extract posts"**  
→ Facebook might have changed their HTML structure  
→ Page might not be fully public

**"Square link not working"**  
→ Verify link in Square Dashboard  
→ Make sure it's published (not draft)

---

## 🎉 You're Ready!

This simplified approach means:
- ✅ **Less complexity** - No auth, no APIs
- ✅ **More security** - No credentials, no payment data
- ✅ **Easier maintenance** - Less to break
- ✅ **Faster development** - Get to launch quicker

**Just update `.env` and start building your website!**

---

**Status**: ✅ Ready to Go  
**Complexity**: Minimal  
**Time to Launch**: Days (not weeks)
