"""
Facebook Business Page Scraper
Extracts reviews, images, and metadata from public Facebook pages
NO AUTHENTICATION REQUIRED - Works with public pages only
"""
import asyncio
import json
import os
import re
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
                
                # Extract reviews
                await self._extract_reviews(page)
                
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
    
    async def _extract_reviews(self, page):
        """Extract reviews from Facebook reviews page - go directly to reviews URL"""
        print("")
        print("[INFO] Extracting reviews...")
        
        # Ensure no double slashes in URL
        base_url = self.page_url.rstrip('/')
        reviews_url = f"{base_url}/reviews"
        
        try:
            # Go directly to reviews URL
            print(f"[INFO] Navigating directly to reviews page: {reviews_url}")
            await page.goto(reviews_url, wait_until='networkidle', timeout=30000)
            await page.wait_for_timeout(3000)
            
            # Verify we're on the reviews page
            current_url = page.url
            print(f"  [INFO] Current URL: {current_url}")
            if '/reviews' not in current_url:
                print("  [WARN] Not on reviews page, waiting for redirect...")
                await page.wait_for_timeout(2000)
                current_url = page.url
                print(f"  [INFO] Updated URL: {current_url}")
            
            print("[INFO] Scrolling to load more reviews...")
            
            # Infinite scroll for reviews
            last_height = await page.evaluate('document.body.scrollHeight')
            scroll_attempts = 0
            max_scrolls = 10
            
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
            
            # Look for individual review cards - each review is in its own article element
            print("[INFO] Looking for individual review elements...")
            
            # Find all article elements first
            all_articles = await page.locator('[role="article"]').all()
            print(f"  [INFO] Found {len(all_articles)} article elements total")
            
            reviews_found = []
            seen_texts = set()  # Track unique reviews to avoid duplicates
            
            for elem in all_articles:
                try:
                    text = await elem.inner_text(timeout=1000)
                    if not text or len(text) < 50:
                        continue
                    
                    # Must contain "recommends Elite Painting" pattern to be a review
                    if 'recommends' not in text.lower() or 'elite painting' not in text.lower():
                        continue
                    
                    # Skip if it's the header/overview (contains "100% recommend" or follower count)
                    if '100% recommend' in text or 'followers' in text or 'following' in text:
                        continue
                    
                    # Skip if it's just the business response (starts with "Elite Painting" and is short)
                    lines = text.split('\n')
                    if len(lines) > 0 and lines[0].strip() == 'Elite Painting' and len(text) < 200:
                        continue
                    
                    # Extract a unique identifier from the review (first 100 chars of review text)
                    # Find the actual review text (after "recommends Elite Painting")
                    review_match = re.search(r'recommends[^\\n]*Elite Painting[^\\n]*\\n\\n(.{50,})', text, re.DOTALL | re.IGNORECASE)
                    if review_match:
                        review_snippet = review_match.group(1)[:100].strip()
                    else:
                        # Fallback: use first meaningful line
                        review_snippet = text[:100].strip()
                    
                    # Skip if we've seen this review before
                    if review_snippet in seen_texts:
                        continue
                    
                    seen_texts.add(review_snippet)
                    reviews_found.append(elem)
                    
                except Exception as e:
                    continue
            
            print(f"  [OK] Found {len(reviews_found)} unique review elements")
            
            if not reviews_found:
                print("  [WARN] No review elements found with standard selectors")
                # Try more aggressive selectors
                print("  [INFO] Trying alternative selectors...")
                alternative_selectors = [
                    'div[role="article"]',
                    'div[data-pagelet]',
                    'div[class*="review"]',
                    'div[class*="Review"]',
                    'span[dir="auto"]',
                    'div.x1n2onr6'  # Another common Facebook container class
                ]
                
                for alt_selector in alternative_selectors:
                    try:
                        alt_elements = await page.locator(alt_selector).all()
                        if alt_elements and len(alt_elements) > 0:
                            print(f"  [INFO] Found {len(alt_elements)} elements with {alt_selector}, checking for reviews...")
                            # Check if any contain review-like text
                            for elem in alt_elements[:10]:
                                try:
                                    text = await elem.inner_text(timeout=1000)
                                    if text and ('star' in text.lower() or 'review' in text.lower() or 'rating' in text.lower()):
                                        reviews_found.append(elem)
                                        print(f"  [OK] Found potential review element")
                                except:
                                    continue
                            if reviews_found:
                                break
                    except:
                        continue
                
                if not reviews_found:
                    # Try to find any text content that might be reviews
                    all_text = await page.locator('body').inner_text()
                    if 'review' in all_text.lower() or 'star' in all_text.lower():
                        print("  [INFO] Review content detected but couldn't parse structure")
                        print("  [INFO] Facebook reviews may require authentication or have changed structure")
            
            # Extract review data - look for actual reviews with star ratings
            for i, elem in enumerate(reviews_found[:30]):  # Check more elements
                try:
                    # First check if this element has star ratings (likely a review)
                    has_stars = False
                    rating = 5  # Default
                    
                    # Look for star indicators in various formats
                    star_selectors = [
                        'span[aria-label*="star"]',
                        'span[aria-label*="Star"]',
                        'span:has-text("★")',
                        'span:has-text("⭐")',
                        'div[aria-label*="star"]',
                        'div[aria-label*="Star"]'
                    ]
                    
                    for star_selector in star_selectors:
                        try:
                            star_elem = await elem.locator(star_selector).first
                            if await star_elem.count() > 0:
                                has_stars = True
                                # Try to get rating from aria-label
                                aria_label = await star_elem.get_attribute('aria-label', timeout=500)
                                if aria_label:
                                    # Extract number from aria-label like "5 out of 5 stars"
                                    match = re.search(r'(\d+)', aria_label)
                                    if match:
                                        rating = int(match.group(1))
                                else:
                                    # Count stars in text
                                    star_text = await star_elem.inner_text(timeout=500)
                                    if star_text:
                                        rating = star_text.count('★') + star_text.count('⭐')
                                        if rating == 0:
                                            rating = 5
                                break
                        except:
                            continue
                    
                    # Get text preview first to check content
                    text_preview = await elem.inner_text(timeout=1000)
                    if not text_preview or len(text_preview) < 10:
                        continue
                    
                    # Must contain "recommends" to be a real review, or have clear review indicators
                    if 'recommends' not in text_preview.lower():
                        # Check if it's a review by other indicators
                        if not has_stars and 'star' not in text_preview.lower():
                            # Skip if it's clearly a post (has date patterns like "January 2 at 1:08 PM")
                            if any(pattern in text_preview for pattern in ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']):
                                if 'at' in text_preview and ('PM' in text_preview or 'AM' in text_preview):
                                    continue  # This is a post, not a review
                    
                    # Skip obvious non-review content
                    skip_patterns = ['Send message', 'All reactions:', 'Like', 'Comment', 'Share', 'Elite Painting\nJanuary']
                    if any(pattern in text_preview for pattern in skip_patterns):
                        if 'recommends' not in text_preview.lower():
                            continue
                    
                    # Get full text
                    text = await elem.inner_text(timeout=2000)
                    
                    if not text or len(text) < 20:
                        continue
                    
                    # Extract author name - format is "Name recommends Elite Painting."
                    author = 'Customer'
                    try:
                        # Look for pattern like "Stef Candea recommends Elite Painting."
                        match = re.search(r'^([A-Z][a-z]+(?:\\s+[A-Z][a-z]+)*)\\s+recommends\\s+Elite\\s+Painting', text, re.MULTILINE | re.IGNORECASE)
                        if match:
                            author = match.group(1).strip()
                        else:
                            # Try to find name in the first line before "recommends"
                            lines = text.split('\n')
                            for line in lines[:5]:
                                line = line.strip()
                                if 'recommends' in line.lower() and 'elite' in line.lower():
                                    # Extract name before "recommends"
                                    parts = re.split(r'\\s+recommends', line, flags=re.IGNORECASE, maxsplit=1)
                                    if parts and len(parts[0].strip()) < 50:
                                        author = parts[0].strip()
                                        break
                    except:
                        pass
                    
                    # Extract review text - everything after the date, before "All reactions" or business response
                    review_text = text.strip()
                    
                    # Pattern: "Name recommends Elite Painting.\nDate\n·\nReview text here\nAll reactions:"
                    # Extract text between date and "All reactions:" or business response
                    match = re.search(
                        r'recommends[^\\n]*Elite Painting[^\\n]*\\n([^\\n]+\\s+\\d{4})[^\\n]*\\n[^\\n]*\\n(.+?)(?:\\nAll reactions:|\\nElite Painting|$)',
                        review_text,
                        re.DOTALL | re.IGNORECASE
                    )
                    
                    if match:
                        review_text = match.group(2).strip()
                    else:
                        # Fallback: try to find text after date pattern
                        match = re.search(
                            r'(January|February|March|April|May|June|July|August|September|October|November|December)\\s+\\d{1,2},\\s+\\d{4}[^\\n]*\\n[^\\n]*\\n(.+?)(?:\\nAll reactions:|\\nElite Painting|$)',
                            review_text,
                            re.DOTALL | re.IGNORECASE
                        )
                        if match:
                            review_text = match.group(2).strip()
                        else:
                            # Last resort: remove everything before first meaningful content
                            # Remove author and "recommends" line
                            review_text = re.sub(r'^[^\\n]+recommends[^\\n]+\\n', '', review_text, flags=re.IGNORECASE)
                            # Remove date line
                            review_text = re.sub(r'^[^\\n]*\\d{4}[^\\n]*\\n[^\\n]*\\n', '', review_text)
                    
                    # Remove "See more" / "See less" links
                    review_text = re.sub(r'\\s*…\\s*See more', '', review_text, flags=re.IGNORECASE)
                    review_text = re.sub(r'\\s*See more', '', review_text, flags=re.IGNORECASE)
                    review_text = re.sub(r'\\s*See less', '', review_text, flags=re.IGNORECASE)
                    
                    # Remove "All reactions:" and everything after it
                    review_text = re.sub(r'\\nAll reactions:.*$', '', review_text, flags=re.DOTALL | re.IGNORECASE)
                    
                    # Remove business response (starts with "Elite Painting")
                    review_text = re.sub(r'\\nElite Painting.*$', '', review_text, flags=re.DOTALL)
                    
                    # Remove reaction counts and time stamps (like "35w", "3y", "4y")
                    review_text = re.sub(r'\\b\\d+[wy]\\b', '', review_text)
                    
                    # Clean up extra whitespace and newlines
                    review_text = ' '.join(review_text.split())
                    
                    # Remove any remaining date patterns
                    review_text = re.sub(r'\\b(January|February|March|April|May|June|July|August|September|October|November|December)\\s+\\d{1,2},\\s+\\d{4}\\b', '', review_text, flags=re.IGNORECASE)
                    review_text = ' '.join(review_text.split())  # Clean again
                    
                    # Only add if we have meaningful review text
                    # Be more lenient - accept shorter reviews and don't filter out questions
                    if len(review_text) > 15:
                        self.results['reviews'].append({
                            'index': len(self.results['reviews']) + 1,
                            'text': review_text[:500],
                            'full_text': review_text,
                            'author': author,
                            'rating': rating,
                            'extracted_at': datetime.now().isoformat()
                        })
                        
                        print(f"  [OK] Review {len(self.results['reviews'])}: {author} - {review_text[:60]}...")
                        
                        if len(self.results['reviews']) % 5 == 0:
                            print(f"  [INFO] Collected {len(self.results['reviews'])} reviews...")
                            
                except Exception as e:
                    continue
            
            print(f"[OK] Total reviews extracted: {len(self.results['reviews'])}")
            
        except Exception as e:
            print(f"[WARN] Could not extract reviews: {e}")
            print("[INFO] Reviews may require authentication or be unavailable on public page")
    
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
