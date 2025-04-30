// index.js
import express from 'express';
import axios from 'axios';
import { JSDOM } from 'jsdom';

const app = express();
const PORT = 3000;

// Middleware para agregar headers CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/api/scrape', async (req, res) => {
  // Get search keyword from query parameters
  const keyword = req.query.keyword;
  
  console.log('Looking for products:', keyword);
  
  // Validate that keyword is provided
  if (!keyword) {
    return res.status(400).json({ error: 'Keyword is required' });
  }

  try {
    // Make HTTP request to Amazon with custom headers to mimic a browser
    const response = await axios.get(`https://www.amazon.com/s?k=${encodeURIComponent(keyword)}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Cache-Control': 'max-age=0',
        'Sec-Ch-Ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
        'Sec-Ch-Ua-Mobile': '?0',
        'Sec-Ch-Ua-Platform': '"Windows"',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-User': '?1',
        'Upgrade-Insecure-Requests': '1'
      }
    });

    console.log('Amazon Response Status:', response.status);
    
    // Parse HTML response using JSDOM
    const dom = new JSDOM(response.data);
    const productList = [];

    // Try different selectors to find product elements
    const selectors = [
      '[data-component-type="s-search-result"]',
      '.s-result-item',
      '.s-card-container'
    ];

    let products = [];
    for (const selector of selectors) {
      products = dom.window.document.querySelectorAll(selector);
      if (products.length > 0) {
        console.log(`Found products using selector: ${selector}`);
        break;
      }
    }

    console.log('Number of products found:', products.length);

    // Extract product information from each product element
    products.forEach(item => {
      // Try different selectors for title
      const titleElement = item.querySelector('h2 a span') || 
                          item.querySelector('.a-size-medium.a-color-base.a-text-normal') ||
                          item.querySelector('.a-size-base-plus.a-color-base.a-text-normal') ||
                          item.querySelector('span.a-text-normal');

      // Try different selectors for rating
      const ratingElement = item.querySelector('.a-icon-alt') ||
                           item.querySelector('i[data-hook="average-star-rating"] span') ||
                           item.querySelector('.a-icon-star-small span');

      // Try different selectors for reviews
      const reviewsElement = item.querySelector('.a-size-base.s-underline-text') ||
                            item.querySelector('span[data-hook="total-review-count"]') ||
                            item.querySelector('span.a-size-base');

      // Try different selectors for image
      const imageElement = item.querySelector('.s-image') ||
                          item.querySelector('img.s-product-image') ||
                          item.querySelector('img[src*="images/I"]');

      // Extract text content from elements
      const title = titleElement ? titleElement.textContent.trim() : null;
      const rating = ratingElement ? ratingElement.textContent.trim() : null;
      const reviews = reviewsElement ? reviewsElement.textContent.trim() : null;
      const imageUrl = imageElement ? imageElement.getAttribute('src') : null;

      if (title) {
        console.log('Product found:', {
          title,
          rating: rating ? rating : "No rating available",
          reviews: reviews ? reviews : "No reviews available",
          imageUrl: imageUrl ? 'Image found' : 'No image'
        });
        
        // Add product to the list
        productList.push({
          title,
          rating: rating ? rating : "No rating available",
          reviews: reviews ? reviews : "No reviews available",
          imageUrl
        });
      }
    });

    console.log('Processed products:', productList.length);
    // Send the list of products as JSON response
    res.json(productList);
  } catch (error) {
    console.error('Error during scraping:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    }
    // Send error response
    res.status(500).json({ 
      error: 'Failed to fetch data',
      details: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
