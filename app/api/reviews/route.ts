import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Read the latest scraped data
    const filePath = path.join(process.cwd(), 'automation', 'output', 'scraped_data_latest.json');
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ 
        reviews: [],
        message: 'No scraped data found. Run the scraper first.' 
      });
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(fileContent);

    // Extract and format reviews
    const reviews = (data.reviews || [])
      .filter((review: any) => {
        // Only include reviews with actual text content
        const text = review.text || review.full_text || '';
        return text.length > 20; // Minimum length to be considered a valid review
      })
      .map((review: any, index: number) => {
        const text = review.text || review.full_text || '';
        // Clean up text - remove extra whitespace and newlines
        const cleanText = text.replace(/\s+/g, ' ').trim();
        
        // Extract project type from review text if possible
        let project = 'Painting Project';
        const textLower = cleanText.toLowerCase();
        if (textLower.includes('cabin') || textLower.includes('exterior')) {
          project = 'Exterior Painting';
        } else if (textLower.includes('fence')) {
          project = 'Fence Staining';
        } else if (textLower.includes('interior') || textLower.includes('walls')) {
          project = 'Interior Painting';
        } else if (textLower.includes('cabinet')) {
          project = 'Cabinet Refinishing';
        } else if (textLower.includes('house')) {
          project = 'Exterior Painting';
        }
        
        return {
          id: index + 1,
          text: cleanText,
          author: review.author || review.name || 'Customer',
          location: review.location || 'Northern Michigan',
          project: review.project || project,
          rating: typeof review.rating === 'number' ? review.rating : 5,
          date: review.date || review.timestamp || review.extracted_at || ''
        };
      });

    return NextResponse.json({ reviews });
  } catch (error) {
    console.error('Error reading reviews:', error);
    return NextResponse.json({ 
      reviews: [],
      error: 'Failed to load reviews' 
    }, { status: 500 });
  }
}
