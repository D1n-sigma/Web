document.getElementById('bar').addEventListener('click', () => {
    document.getElementById('navbar').classList.add('active');
});

document.getElementById('close').addEventListener('click', () => {
    document.getElementById('navbar').classList.remove('active');
});

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

document.addEventListener("DOMContentLoaded", () => {
    const productLinks = document.querySelectorAll(".view-product");
  
    productLinks.forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
  
        // Ambil data ID produk
        const productId = e.target.closest(".view-product").getAttribute("data-id");
  
        // Simpan ID ke LocalStorage
        localStorage.setItem("selectedProductId", productId);
  
        // Redirect ke halaman detail
        window.location.href = "sproduct.html";
        window.location.href = "sproduct2.html";
      });
    });
  });
  document.addEventListener("DOMContentLoaded", () => {
    const selectedProductId = localStorage.getItem("selectedProductId");
  
    if (selectedProductId) {
      const products = [
        {
          id: 1,
          name: "Man Bike",
          price: 999.00,
          image: "img/Produk/1.jpg",
          description: "A modern reinterpretation of the classic cruiser...",
          category: "Moto"
        },
        {
          id: 2,
          name: "Harley-Davidson Forty-Eight",
          price: 999.00,
          image: "img/Produk/2.jpg",
          description: "A powerful and iconic model in Harley-Davidson's line-up...",
          category: "Moto"
        }
      ];
  
      const product = products.find(p => p.id == selectedProductId);
  
      if (product) {

        document.getElementById("MainImg").src = product.image;
        document.querySelector(".single-pro-details h6").textContent = `Home / ${product.category}`;
        document.querySelector(".single-pro-details h4").textContent = product.name;
        document.querySelector(".single-pro-details h2").textContent = `$${product.price}`;
        document.querySelector(".single-pro-details span").textContent = product.description;
      }
    }
  });
 document.addEventListener("DOMContentLoaded", () => {
    const selectedProductId = localStorage.getItem("selectedProductId");
  
    if (selectedProductId) {
      const products = [
        {
          id: 1,
          name: "Man Bike",
          price: 999.00,
          image: "img/Produk/1.jpg",
          description: "A modern reinterpretation of the classic cruiser...",
          category: "Moto"
        },
        {
          id: 2,
          name: "Harley-Davidson Forty-Eight",
          price: 999.00,
          image: "img/Produk/2.jpg",
          description: "A powerful and iconic model in Harley-Davidson's line-up...",
          category: "Moto"
        }
      ];
  
      const product = products.find(p => p.id == selectedProductId);
  
      if (product) {

        document.getElementById("MainImg").src = product.image;
        document.querySelector(".single-pro-details h6").textContent = `Home / ${product.category}`;
        document.querySelector(".single-pro-details h4").textContent = product.name;
        document.querySelector(".single-pro-details h2").textContent = `$${product.price}`;
        document.querySelector(".single-pro-details span").textContent = product.description;
      }
    }
  });
document.addEventListener('DOMContentLoaded', function() {
  updateAllTotals();

  const quantityInputs = document.querySelectorAll('.quantity');
  quantityInputs.forEach(input => {
      input.addEventListener('input', function() {
          if (this.value < 1) this.value = 1;
          updateAllTotals();
      });
  });

  const removeButtons = document.querySelectorAll('.cart i.fa-circle-xmark');
  removeButtons.forEach(button => {
      button.addEventListener('click', function(e) {
          e.preventDefault();
          const row = this.closest('tr');
          if (row) {
              row.remove();
              updateAllTotals();
          }
      });
  });
});

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

  const totalBelanjaanElement = document.getElementById('total-belanjaan');
  const totalElement = document.getElementById('total');

  if (totalBelanjaanElement) {
      totalBelanjaanElement.textContent = formatCurrency(cartTotal);
  }

  if (totalElement) {
      totalElement.textContent = formatCurrency(cartTotal);
  }
}
