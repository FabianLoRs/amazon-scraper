# Amazon Product Scraper (Project)

This project demonstrates a simple web scraper that fetches product information (title, rating, review count, image URL) from the first page of Amazon search results for a given keyword.

## Project Structure

```plaintext
amazon-scraper/
├── backend-amazon-scraper/      # Bun/Express API for scraping
│   ├── node_modules/
│   ├── .gitignore
│   ├── bun.lock
│   ├── index.js                 # The main API code
│   ├── package.json
│   ├── package-lock.json
│   └── tsconfig.json 
│
├── frontend-amazon-scraper/      # Vite/Vanilla JS frontend
│   ├── node_modules/
│   ├── public/
│   |   ├──vite.svg
│   ├── src/
│   |   ├── main.js               # Frontend JavaScript logic
│   |   ├── style.css 
│   ├── .gitignore
│   ├── index.html                # Main HTML file                  
│   ├── package.json
│   └── package-lock.json
│
└── README.md       # This file
```
## Prerequisites

* [Bun](https://bun.sh/) installed (for running the backend and potentially the frontend)

## Setup

1.  **Clone the repository (if applicable):**
    ```bash
    git clone <repository-url>
    cd amazon-scraper
    ```

2.  **Install Backend Dependencies:**
    ```bash
    cd backend-amazon-scraper
    bun install
    ```

3.  **Install Frontend Dependencies:**
    ```bash
    cd ../frontend-amazon-scraper
    bun install
    # OR: npm install
    ```

## Running the Application

1.  **Start the Backend Server:**
    Open a terminal in the `backend-amazon-scraper` directory:
    ```bash
    cd backend
    bun run dev
    # OR for production mode: bun run start
    ```
    The backend API will start, typically on `http://localhost:3001`.

2.  **Start the Frontend Development Server:**
    Open *another* terminal in the `frontend-amazon-scraper` directory:
    ```bash
    cd frontend
    bun run dev
    # OR: npm run dev
    # OR: yarn dev
    ```
    Vite will start the frontend dev server, typically on `http://localhost:5173`.

3.  **Access the Application:**
    Open your web browser and navigate to the frontend URL provided by Vite (usually `http://localhost:5173`).

## How to Use

1.  Enter a search keyword (e.g., "wireless mouse", "coffee maker") into the input field.
2.  Click the "Scrape Amazon" button.
3.  Wait for the backend to fetch and parse the results. A "Loading..." indicator will show.
4.  The scraped product details will be displayed in a grid below the search bar.
5.  Error messages will be shown if the scraping fails or no keyword is entered.

## API Endpoint

* `GET /api/scrape?keyword=<yourKeyword>`
    * Initiates the scraping process for the specified keyword.
    * Returns a JSON array of product objects:
        ```json
        [
          {
            "title": "Product Title Example",
            "rating": 4.5, // number or null
            "numReviews": 1234, // number or null
            "imageUrl": "https://..."
          },
          // ... more products
        ]
        ```
    * Returns a JSON error object on failure (e.g., `{ "error": "Message" }`).

## Important Considerations

* **Amazon Blocking:** Amazon actively tries to prevent scraping. Your requests might be blocked (HTTP 4xx/5xx errors) if they detect bot-like behavior. Using valid User-Agent headers helps but isn't foolproof. More advanced techniques (proxies, CAPTCHA solving) are often needed for robust scraping, which are beyond the scope of this project.
* **Selector Fragility:** The CSS selectors used in `backend/server.ts` to find product data are specific to Amazon's current HTML structure. **These will break** when Amazon updates its website design. You will need to inspect the new HTML source and update the selectors in the backend code (`document.querySelectorAll(...)` and `productElement.querySelector(...)` calls).
* **Ethics and Legality:** Always respect website Terms of Service. Excessive scraping can overload servers. Use responsibly.
* **Error Handling:** Basic error handling is implemented, but real-world scrapers need more robust error checking, retries, and logging.
