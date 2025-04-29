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
