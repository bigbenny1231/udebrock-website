"""
Facebook Business Page Scraper
Extracts reviews, images, and metadata from public Facebook pages
NO AUTHENTICATION REQUIRED - Works with public pages only
"""
import asyncio
import json
import os
from datetime import datetime
from pathlib import Path
from playwright.async_api import async_playwright
from dotenv import load_dotenv

load_dotenv()

OUTPUT_DIR = Path(__file__).parent / "output"

class UdebrockScraper:
    def __init__(self, page_url: str):
        self.page_url = page_url.strip()
        self.results = {
            'business_name': 'U Debrock Finishes',
            'scraped_at': datetime.now().isoformat(),
            'page_url': self.page_url,
            'reviews': [],
            'images': [],
            'posts': [],
            'metadata': {}
        }
    
    async def scrape(self):
        """Main scraping orchestrator - NO LOGIN REQUIRED"""
        async with async_playwright() as p:
            # Launch browser without session file (public scraping)
            browser = await p.chromium.launch(
                headless=True,
                args=[
                    '--disable-blink-features=AutomationControlled',
                    '--disable-dev-shm-usage',
                    '--no-sandbox'
                ]
            )
            
            context = await browser.new_context(
                viewport={'width': 1920, 'height': 1080},
                user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                locale='en-US',
                timezone_id='America/New_York'
            )
            
            page = await context.new_page()
            
            try:
                print("=" * 60)
                print("FACEBOOK BUSINESS PAGE SCRAPER")
                print("=" * 60)
                print(f"[TARGET] {self.page_url}")
                print("")
                
                # Extract from main page with infinite scroll
                await self._extract_main_page(page)
                
                # Extract all content with infinite scroll on main page
                await self._extract_all_content(page)
                
                # Save results
                self._save_results()
                
            except Exception as e:
                print(f"[ERROR] Scraping failed: {e}")
                raise
            finally:
                await browser.close()
    
    async def _extract_main_page(self, page):
        """Extract basic info from main page"""
        print("[INFO] Loading main page...")
        await page.goto(self.page_url, wait_until='networkidle', timeout=30000)
        await page.wait_for_timeout(3000)
        
        print("[INFO] Extracting metadata...")
        
        # Business name
        try:
            name = await page.locator('h1').first.inner_text()
            self.results['metadata']['name'] = name
            self.results['business_name'] = name
            print(f"  [OK] Business: {name}")
        except:
            print("  [WARN] Could not extract business name")
        
        # About/Description
        try:
            about_selectors = [
                'div[data-ad-comet-preview="message"]',
                'div[data-testid="about_text"]',
                'div.x1y1aw1k.xn6708d.xwib8y2.x1ye3gou'
            ]
            
            for selector in about_selectors:
                try:
                    about = await page.locator(selector).first.inner_text(timeout=2000)
                    if about:
                        self.results['metadata']['about'] = about
                        print(f"  [OK] About: {about[:80]}...")
                        break
                except:
                    continue
        except:
            pass
        
        # Rating/Reviews count
        try:
            rating_elements = await page.locator('span:has-text("★")').all()
            for elem in rating_elements:
                text = await elem.inner_text()
                if '★' in text or 'star' in text.lower():
                    self.results['metadata']['rating'] = text
                    print(f"  [OK] Rating: {text}")
                    break
        except:
            pass
        
        # Contact info
        try:
            # Phone
            phone_elem = await page.locator('a[href^="tel:"]').first.inner_text(timeout=2000)
            if phone_elem:
                self.results['metadata']['phone'] = phone_elem
                print(f"  [OK] Phone: {phone_elem}")
        except:
            pass
        
        try:
            # Email
            email_elem = await page.locator('a[href^="mailto:"]').first
            email = await email_elem.get_attribute('href', timeout=2000)
            if email:
                self.results['metadata']['email'] = email.replace('mailto:', '')
                print(f"  [OK] Email: {self.results['metadata']['email']}")
        except:
            pass
        
        print(f"[OK] Metadata extracted: {len(self.results['metadata'])} fields")
    
    async def _extract_all_content(self, page):
        """Extract posts and images from main page with infinite scroll"""
        print("")
        print("[INFO] Scrolling main page to load all content...")
        
        # Perform infinite scroll on main page
        last_height = await page.evaluate('document.body.scrollHeight')
        scroll_attempts = 0
        max_scrolls = 15
        
        while scroll_attempts < max_scrolls:
            await page.evaluate('window.scrollTo(0, document.body.scrollHeight)')
            await page.wait_for_timeout(2000)
            
            new_height = await page.evaluate('document.body.scrollHeight')
            
            if new_height == last_height:
                await page.wait_for_timeout(1000)
                new_height = await page.evaluate('document.body.scrollHeight')
                if new_height == last_height:
                    break
            
            last_height = new_height
            scroll_attempts += 1
            print(f"  [INFO] Scroll {scroll_attempts}/{max_scrolls}")
        
        print(f"[OK] Completed {scroll_attempts} scrolls")
        
        # Extract posts
        print("[INFO] Extracting posts...")
        posts = await page.locator('[role="article"]').all()
        print(f"  [INFO] Found {len(posts)} post elements")
        
        for i, post in enumerate(posts[:30]):
            try:
                text = await post.inner_text()
                if text and len(text) > 30:
                    self.results['posts'].append({
                        'index': len(self.results['posts']) + 1,
                        'text': text[:500],
                        'full_text': text
                    })
                    if len(self.results['posts']) % 5 == 0:
                        print(f"  [INFO] Collected {len(self.results['posts'])} posts...")
            except:
                continue
        
        print(f"[OK] Total posts: {len(self.results['posts'])}")
        
        # Extract images
        print("[INFO] Extracting images...")
        images = await page.locator('img[src*="scontent"], img[src*="fbcdn"]').all()
        print(f"  [INFO] Found {len(images)} image elements")
        
        seen = set()
        for i, img in enumerate(images):
            try:
                src = await img.get_attribute('src')
                alt = await img.get_attribute('alt') or ''
                
                if src and ('scontent' in src or 'fbcdn' in src) and src not in seen:
                    # Skip tiny images (profile pics, icons, etc)
                    if 'p50x50' in src or 'p32x32' in src or 's50x50' in src:
                        continue
                    
                    seen.add(src)
                    self.results['images'].append({
                        'index': len(self.results['images']) + 1,
                        'url': src,
                        'alt': alt,
                        'source': 'facebook'
                    })
                    
                    if len(self.results['images']) % 10 == 0:
                        print(f"  [INFO] Collected {len(self.results['images'])} images...")
            except:
                continue
        
        print(f"[OK] Total images: {len(self.results['images'])}")
    
    async def _extract_reviews_OLD(self, page):
        """Extract reviews with infinite scroll"""
        print("")
        print("[INFO] Extracting reviews/posts...")
        
        # Try reviews tab first
        reviews_url = f"{self.page_url}/reviews"
        
        try:
            await page.goto(reviews_url, wait_until='networkidle', timeout=20000)
            await page.wait_for_timeout(2000)
            
            print("[INFO] Scrolling to load more reviews...")
            
            # Infinite scroll - Facebook loads content as you scroll
            last_height = await page.evaluate('document.body.scrollHeight')
            scroll_attempts = 0
            max_scrolls = 10
            
            while scroll_attempts < max_scrolls:
                # Scroll down
                await page.evaluate('window.scrollTo(0, document.body.scrollHeight)')
                await page.wait_for_timeout(2000)  # Wait for content to load
                
                # Check if new content loaded
                new_height = await page.evaluate('document.body.scrollHeight')
                
                if new_height == last_height:
                    # No new content, try one more time
                    await page.wait_for_timeout(1000)
                    new_height = await page.evaluate('document.body.scrollHeight')
                    if new_height == last_height:
                        break
                
                last_height = new_height
                scroll_attempts += 1
                print(f"  [INFO] Scroll {scroll_attempts}/{max_scrolls}")
            
            # Extract review/post elements
            elements = await page.locator('[role="article"]').all()
            
            print(f"[OK] Found {len(elements)} review/post elements")
            
            for i, elem in enumerate(elements[:30]):  # Get up to 30 reviews
                try:
                    text = await elem.inner_text()
                    if text and len(text) > 20:
                        
                        # Try to extract rating (look for stars)
                        rating = None
                        try:
                            rating_text = await elem.locator('span:has-text("★")').first.inner_text(timeout=500)
                            if rating_text:
                                rating = rating_text
                        except:
                            pass
                        
                        self.results['reviews'].append({
                            'index': i + 1,
                            'text': text[:500],
                            'full_text': text,
                            'rating': rating or 'Not specified',
                            'extracted_at': datetime.now().isoformat()
                        })
                        
                        print(f"  [OK] Review {i+1}: {text[:60]}...")
                except Exception as e:
                    continue
            
        except Exception as e:
            print(f"[WARN] Could not access reviews tab: {e}")
            print("[INFO] Extracting posts from main page instead...")
            
            # Fallback: extract posts from main page
            await page.goto(self.page_url, wait_until='networkidle')
            await page.wait_for_timeout(2000)
            
            # Scroll main page
            for i in range(5):
                await page.evaluate('window.scrollTo(0, document.body.scrollHeight)')
                await page.wait_for_timeout(1500)
            
            posts = await page.locator('[role="article"]').all()
            
            for i, post in enumerate(posts[:10]):
                try:
                    text = await post.inner_text()
                    if text and len(text) > 30:
                        self.results['posts'].append({
                            'index': i + 1,
                            'text': text[:500],
                            'full_text': text
                        })
                        print(f"  [OK] Post {i+1}: {text[:60]}...")
                except:
                    continue
        
        print(f"[OK] Total reviews: {len(self.results['reviews'])}, posts: {len(self.results['posts'])}")
    
    async def _extract_images(self, page):
        """Extract images with infinite scroll"""
        print("")
        print("[INFO] Extracting images...")
        
        # Navigate to photos tab
        photos_url = f"{self.page_url}/photos"
        
        try:
            await page.goto(photos_url, wait_until='networkidle', timeout=20000)
            await page.wait_for_timeout(2000)
            
            print("[INFO] Scrolling to load more photos...")
            
            # Infinite scroll for images
            last_height = await page.evaluate('document.body.scrollHeight')
            scroll_attempts = 0
            max_scrolls = 15  # More scrolls for images
            
            while scroll_attempts < max_scrolls:
                await page.evaluate('window.scrollTo(0, document.body.scrollHeight)')
                await page.wait_for_timeout(1500)
                
                new_height = await page.evaluate('document.body.scrollHeight')
                
                if new_height == last_height:
                    await page.wait_for_timeout(1000)
                    new_height = await page.evaluate('document.body.scrollHeight')
                    if new_height == last_height:
                        break
                
                last_height = new_height
                scroll_attempts += 1
                print(f"  [INFO] Scroll {scroll_attempts}/{max_scrolls}")
            
            # Extract image URLs
            images = await page.locator('img[src*="scontent"]').all()
            
            print(f"[OK] Found {len(images)} image elements")
            
            seen = set()
            for i, img in enumerate(images):
                try:
                    src = await img.get_attribute('src')
                    alt = await img.get_attribute('alt') or ''
                    
                    if src and 'scontent' in src and src not in seen:
                        seen.add(src)
                        self.results['images'].append({
                            'index': len(self.results['images']) + 1,
                            'url': src,
                            'alt': alt,
                            'source': 'facebook'
                        })
                        
                        if len(self.results['images']) % 10 == 0:
                            print(f"  [INFO] Collected {len(self.results['images'])} images...")
                        
                except:
                    continue
            
        except Exception as e:
            print(f"[WARN] Could not access photos tab: {e}")
            print("[INFO] Extracting images from main page instead...")
            
            # Fallback: images from main page
            await page.goto(self.page_url, wait_until='networkidle')
            
            for i in range(5):
                await page.evaluate('window.scrollTo(0, document.body.scrollHeight)')
                await page.wait_for_timeout(1000)
            
            images = await page.locator('img[src*="scontent"]').all()
            seen = set()
            
            for img in images[:50]:
                try:
                    src = await img.get_attribute('src')
                    if src and 'scontent' in src and src not in seen:
                        seen.add(src)
                        self.results['images'].append({
                            'index': len(self.results['images']) + 1,
                            'url': src,
                            'alt': '',
                            'source': 'facebook'
                        })
                except:
                    continue
        
        print(f"[OK] Total images extracted: {len(self.results['images'])}")
    
    def _save_results(self):
        """Save results to JSON file"""
        OUTPUT_DIR.mkdir(exist_ok=True)
        
        # Save with timestamp
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        output_file = OUTPUT_DIR / f'scraped_data_{timestamp}.json'
        
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(self.results, f, indent=2, ensure_ascii=False)
        
        # Also save as latest
        latest_file = OUTPUT_DIR / 'scraped_data_latest.json'
        with open(latest_file, 'w', encoding='utf-8') as f:
            json.dump(self.results, f, indent=2, ensure_ascii=False)
        
        print("")
        print("=" * 60)
        print("SCRAPING COMPLETE")
        print("=" * 60)
        print(f"[OUTPUT] Saved to: {output_file}")
        print(f"[OUTPUT] Latest: {latest_file}")
        print("")
        print("Summary:")
        print(f"  - Business: {self.results['business_name']}")
        print(f"  - Metadata: {len(self.results['metadata'])} fields")
        print(f"  - Reviews: {len(self.results['reviews'])}")
        print(f"  - Posts: {len(self.results['posts'])}")
        print(f"  - Images: {len(self.results['images'])}")
        print("")

async def main():
    """Main entry point"""
    print("")
    print("Starting Facebook business page scraper...")
    print("(No login required - works with public pages only)")
    print("")
    
    page_url = os.getenv('FB_PAGE_URL')
    
    if not page_url:
        print("[ERROR] FB_PAGE_URL not set in .env file")
        print("")
        print("Please add to .env:")
        print("  FB_PAGE_URL=https://www.facebook.com/your-business-page")
        return
    
    if page_url == 'https://www.facebook.com/your-business-page':
        print("[ERROR] Please update .env with your actual Facebook page URL")
        return
    
    scraper = UdebrockScraper(page_url)
    await scraper.scrape()

if __name__ == "__main__":
    asyncio.run(main())
