let currentPage = 1;
let currentKeyword = '';
let allProducts = [];

// Modal functionality
const modal = document.getElementById('messageModal');
const modalMessage = document.getElementById('modalMessage');
const modalOkBtn = document.getElementById('modalOkBtn');
const closeModal = document.querySelector('.close-modal');

function showModal(message) {
    modalMessage.textContent = message;
    modal.classList.add('show');
}

function hideModal() {
    modal.classList.remove('show');
}

modalOkBtn.addEventListener('click', hideModal);
closeModal.addEventListener('click', hideModal);

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        hideModal();
    }
});

document.getElementById('scrapeBtn').addEventListener('click', async () => {
    const keyword = document.getElementById('keyword').value;
    if (!keyword) {
        showModal('Please enter a product name');
        return;
    }

    currentKeyword = keyword;
    currentPage = 1;
    allProducts = [];
    await fetchProducts();
});

document.getElementById('loadMoreBtn').addEventListener('click', async () => {
  currentPage++;
  await fetchProducts();
});

async function fetchProducts() {
  const loading = document.querySelector('.loading');
  const resultsDiv = document.getElementById('results');
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  
  try {
    loading.classList.add('active');
    loadMoreBtn.classList.remove('visible');

    const response = await fetch(`http://localhost:3000/api/scrape?keyword=${encodeURIComponent(currentKeyword)}&page=${currentPage}`);
    const data = await response.json();

    if (data.length === 0) {
      if (currentPage === 1) {
        resultsDiv.innerHTML = '<p class="no-results">No products found. Try a different search term.</p>';
      } else {
        loadMoreBtn.classList.remove('visible');
      }
      return;
    }

    allProducts = [...allProducts, ...data];

    if (currentPage === 1) {
      resultsDiv.innerHTML = '';
    }

    resultsDiv.innerHTML = allProducts.map(product => `
      <div class="product">
        <img src="${product.imageUrl}" alt="${product.title}">
        <div class="product-content">
          <h2>${product.title}</h2>
          <p class="rating">${product.rating}</p>
          <p>${product.reviews}</p>
        </div>
      </div>
    `).join('');

    // Show load more button if we got a full page of results
    if (data.length >= 20) { // Assuming 20 items per page
      loadMoreBtn.classList.add('visible');
    } else {
      loadMoreBtn.classList.remove('visible');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    resultsDiv.innerHTML = '<p class="error">Failed to fetch products. Please try again later.</p>';
  } finally {
    loading.classList.remove('active');
  }
}
