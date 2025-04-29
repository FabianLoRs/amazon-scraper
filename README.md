# Amazon Product Scraper (Project)

This project demonstrates a simple web scraper that fetches product information (title, rating, review count, image URL) from the first page of Amazon search results for a given keyword.

## Project Structure

```plaintext
amazon-scraper/
├── backend/                      # Bun/Express API for scraping
│   ├── node_modules/
│   ├── server.ts                 # The main API code
│   ├── package.json
│   └── bun.lockb  
│
├── frontend-amazon-scraper/      # Vite/Vanilla JS frontend
│   ├── node_modules/
│   ├── public/
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
