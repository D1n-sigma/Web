// Cart management system
document.addEventListener('DOMContentLoaded', function() {
  // Initialize cart from localStorage or create empty array
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  document.querySelectorAll('.pro a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); // Jika ingin mencegah redirect untuk debug
        console.log('Produk diklik:', link);
    });
});
document.querySelectorAll('.pro').forEach(product => {
    product.addEventListener('click', () => {
        alert('Produk ini diklik!');
    });
});
  
  // Add to cart functionality for product detail page
  const addToCartButton = document.querySelector('.single-pro-details button.normal');
  if (addToCartButton) {
      addToCartButton.addEventListener('click', function() {
          // Get product details
          const productName = document.querySelector('.single-pro-details h4').textContent;
          const price = document.querySelector('.single-pro-details h2').textContent;
          const quantity = parseInt(document.querySelector('.single-pro-details input[type="number"]').value);
          const productImage = document.querySelector('#MainImg').src;

          // Create cart item object
          const cartItem = {
              name: productName,
              price: price,
              quantity: quantity,
              image: productImage,
              id: Date.now() // Unique identifier for the item
          };

          // Add to cart array
          cart.push(cartItem);
          
          // Save to localStorage
          localStorage.setItem('cart', JSON.stringify(cart));

          // Show success message
          alert('Product added to cart successfully!');
      });
  }
});

// Cart page functionality
document.addEventListener('DOMContentLoaded', function() {
  // Populate cart table if on cart page
  const cartTable = document.getElementById('cartTable');
  if (cartTable) {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      
      // Clear existing rows
      cartTable.innerHTML = '';
      
      // Add each cart item to the table
      cart.forEach(item => {
          const row = document.createElement('tr');
          row.innerHTML = `
              <td><a href="#" class="cart"><i class="fa-solid fa-circle-xmark"></i></a></td>
              <td><img src="${item.image}" alt="Product Image" class="cart-image"></td>
              <td>${item.name}</td>
              <td class="price">${item.price}</td>
              <td><input type="number" value="${item.quantity}" min="1" class="quantity"></td>
              <td class="subtotal">${formatCurrency(parseCurrency(item.price) * item.quantity)}</td>
          `;
          cartTable.appendChild(row);
      });

      // Initialize event listeners for remove buttons and quantity inputs
      initializeCartEventListeners();
      updateAllTotals();
  }
});

// Helper functions
function formatCurrency(amount) {
  return 'Rp. ' + amount.toLocaleString('id-ID');
}

function parseCurrency(priceString) {
  return parseInt(priceString.replace('Rp. ', '').replace(/\./g, ''));
}

function updateAllTotals() {
  const rows = document.querySelectorAll('#cartTable tr');
  let cartTotal = 0;

  rows.forEach(row => {
      const priceElement = row.querySelector('.price');
      const quantityInput = row.querySelector('.quantity');
      const subtotalElement = row.querySelector('.subtotal');

      if (priceElement && quantityInput && subtotalElement) {
          const price = parseCurrency(priceElement.textContent);
          const quantity = parseInt(quantityInput.value);
          const subtotal = price * quantity;
          
          subtotalElement.textContent = formatCurrency(subtotal);
          cartTotal += subtotal;
      }
  });

  // Update total displays
  const totalBelanjaanElement = document.getElementById('total-belanjaan');
  const totalElement = document.getElementById('total');

  if (totalBelanjaanElement) {
      totalBelanjaanElement.textContent = formatCurrency(cartTotal);
  }

  if (totalElement) {
      totalElement.textContent = formatCurrency(cartTotal);
  }
}

function initializeCartEventListeners() {
  // Quantity change handlers
  const quantityInputs = document.querySelectorAll('.quantity');
  quantityInputs.forEach(input => {
      input.addEventListener('input', function() {
          if (this.value < 1) this.value = 1;
          updateAllTotals();
          updateLocalStorage();
      });
  });

  // Remove button handlers
  const removeButtons = document.querySelectorAll('.fa-circle-xmark');
  removeButtons.forEach(button => {
      button.addEventListener('click', function(e) {
          e.preventDefault();
          const row = this.closest('tr');
          row.style.transition = 'opacity 0.3s ease';
          row.style.opacity = '0';
          
          setTimeout(() => {
              row.remove();
              updateAllTotals();
              updateLocalStorage();
          }, 300);
      });
  });
}

function updateLocalStorage() {
  const cart = [];
  const rows = document.querySelectorAll('#cartTable tr');
  
  rows.forEach(row => {
      cart.push({
          name: row.querySelector('td:nth-child(3)').textContent,
          price: row.querySelector('.price').textContent,
          quantity: parseInt(row.querySelector('.quantity').value),
          image: row.querySelector('.cart-image').src,
          id: Date.now()
      });
  });

  localStorage.setItem('cart', JSON.stringify(cart));
}
