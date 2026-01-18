# U Debrock Finishes - Website & Automation

A modern, security-first website for U Debrock Finishes with integrated automation tools for content management.

## 🏗️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Utility-first styling with custom theme
- **Framer Motion** - Smooth animations
- **Radix UI** - Accessible component primitives
- **React Hook Form** - Form management

### Backend & Automation
- **Python 3.14+** - Automation scripts
- **Playwright** - Browser automation
- **Google Gemini AI** - Content generation
- **Google Apps Script** - Backend integration

### Custom Design System
- **Forest** palette - Natural green tones
- **Walnut** palette - Rich brown tones  
- **Antique** palette - Warm gold tones
- **Cream** accent - Soft background
- **Custom fonts** - Zilla Slab (display) & Inter (body)
- **Tactile shadows** - Depth and texture

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Python 3.14+
- Git

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd udebrock-website
```

2. **Install Node dependencies**
```bash
npm install
```

3. **Set up Python environment**
```bash
cd automation
python -m venv venv

# Windows
.\venv\Scripts\Activate.ps1

# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
playwright install chromium
```

4. **Configure environment variables**
```bash
# Copy .env.example to .env
cp .env.example .env

# Edit .env with your credentials
# - Facebook credentials
# - Google Gemini API key
# - Square payment credentials
# - Google Apps Script URL
```

### Development

**Run the development server:**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

**Run Python automation:**
```bash
cd automation
.\venv\Scripts\Activate.ps1  # or source venv/bin/activate
python <script-name>.py
```

## 📁 Project Structure

```
udebrock-website/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout with fonts
│   ├── page.tsx             # Homepage
│   └── globals.css          # Global styles & Tailwind config
├── components/              # React components
│   ├── ui/                  # Reusable UI components
│   ├── sections/            # Page sections
│   └── forms/               # Form components
├── lib/                     # Utility functions
├── public/                  # Static assets
│   └── assets/
│       ├── images/          # Image files
│       ├── textures/        # Texture assets
│       └── icons/           # Icon files
├── automation/              # Python automation scripts
│   ├── venv/               # Python virtual environment
│   └── requirements.txt    # Python dependencies
├── gas-backend/            # Google Apps Script files
└── .env                    # Environment variables (gitignored)
```

## 🔒 Security

This project follows security-first practices:

- ✅ Environment variables for all secrets
- ✅ `.env` files gitignored
- ✅ Session files excluded from version control
- ✅ Python virtual environment isolated

**Never commit:**
- `.env` files
- API keys or passwords
- Session tokens
- Build artifacts

## 🎨 Custom Theme

The design system features natural, craftsman-inspired colors:

- **Forest (primary)**: Natural green tones for trustworthiness
- **Walnut (secondary)**: Rich wood tones for craftsmanship
- **Antique (accent)**: Warm gold tones for elegance
- **Cream (background)**: Soft, welcoming neutral

## 📦 Dependencies

### Frontend
- `next` - React framework
- `react` & `react-dom` - React library
- `framer-motion` - Animation library
- `lucide-react` - Icon library
- `react-hook-form` - Form handling
- `@radix-ui/react-*` - Accessible UI primitives

### Python
- `playwright` - Browser automation
- `python-dotenv` - Environment management
- `requests` - HTTP client
- `pillow` - Image processing
- `google-generativeai` - AI content generation

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Python (from automation/ directory)
python <script>.py   # Run automation script
```

## 📝 Environment Variables

See `.env.example` for all required environment variables. Key variables:

- `FB_EMAIL`, `FB_PASSWORD` - Facebook automation
- `GEMINI_API_KEY` - Google AI API
- `SQUARE_ACCESS_TOKEN` - Payment processing
- `NEXT_PUBLIC_GAS_URL` - Backend API endpoint
- `NEXT_PUBLIC_SITE_URL` - Site URL for metadata

## 🚢 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

### Manual
```bash
npm run build
npm run start
```

## 📄 License

© 2026 U Debrock Finishes. All rights reserved.
