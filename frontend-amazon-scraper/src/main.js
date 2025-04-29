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

    await fetchProducts(keyword);
});

async function fetchProducts(keyword) {
  const loading = document.querySelector('.loading');
  const resultsDiv = document.getElementById('results');
  
  try {
    loading.classList.add('active');

    const response = await fetch(`http://localhost:3000/api/scrape?keyword=${encodeURIComponent(keyword)}`);
    const data = await response.json();

    if (data.length === 0) {
      resultsDiv.innerHTML = '<p class="no-results">No products found. Try a different search term.</p>';
      return;
    }

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
    console.error('Error fetching data:', error);
    resultsDiv.innerHTML = '<p class="error">Failed to fetch products. Please try again later.</p>';
  } finally {
    loading.classList.remove('active');
  }
}
