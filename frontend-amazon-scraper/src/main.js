let currentPage = 1;
let currentKeyword = '';
let allProducts = [];

// Modal functionality for displaying messages to the user
const modal = document.getElementById('messageModal');
const modalMessage = document.getElementById('modalMessage');
const modalOkBtn = document.getElementById('modalOkBtn');
const closeModal = document.querySelector('.close-modal');

// Function to display modal with a message
function showModal(message) {
    modalMessage.textContent = message;
    modal.classList.add('show');
}

// Function to hide the modal
function hideModal() {
    modal.classList.remove('show');
}

// Add event listeners for modal buttons
modalOkBtn.addEventListener('click', hideModal);
closeModal.addEventListener('click', hideModal);

// Close modal when clicking outside of it
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        hideModal();
    }
});

// Add event listener for search button
document.getElementById('scrapeBtn').addEventListener('click', async () => {
    const keyword = document.getElementById('keyword').value;
    if (!keyword) {
        showModal('Please enter a product name');
        return;
    }

    await fetchProducts(keyword);
});

// Function to fetch products from the backend API
async function fetchProducts(keyword) {
  const loading = document.querySelector('.loading');
  const resultsDiv = document.getElementById('results');
  
  try {
    // Show loading spinner
    loading.classList.add('active');

    // Make API request to backend
    const response = await fetch(`http://localhost:3000/api/scrape?keyword=${encodeURIComponent(keyword)}`);
    const data = await response.json();

    // Handle case when no products are found
    if (data.length === 0) {
      resultsDiv.innerHTML = '<p class="no-results">No products found. Try a different search term.</p>';
      return;
    }

    // Generate HTML for each product and display them
    resultsDiv.innerHTML = data.map(product => `
      <div class="product">
        <img src="${product.imageUrl}" alt="${product.title}">
        <div class="product-content">
          <h2>${product.title}</h2>
          <p class="rating">${product.rating}</p>
          <p>${product.reviews}</p>
        </div>
      </div>
    `).join('');

  } catch (error) {
    // Handle errors during API request
    console.error('Error fetching data:', error);
    resultsDiv.innerHTML = '<p class="error">Failed to fetch products. Please try again later.</p>';
  } finally {
    // Hide loading spinner
    loading.classList.remove('active');
  }
}
