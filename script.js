// script.js
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
      // Simulasi data produk
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
  
      // Cari produk berdasarkan ID
      const product = products.find(p => p.id == selectedProductId);
  
      if (product) {
        // Isi halaman dengan detail produk
        document.getElementById("MainImg").src = product.image;
        document.querySelector(".single-pro-details h6").textContent = `Home / ${product.category}`;
        document.querySelector(".single-pro-details h4").textContent = product.name;
        document.querySelector(".single-pro-details h2").textContent = `$${product.price}`;
        document.querySelector(".single-pro-details span").textContent = product.description;
      }
    }
  });
// ambil semua input quantity
const quantityInputs = document.querySelectorAll('.quantity');

// tambahkan event listener ke setiap input quantity
quantityInputs.forEach(input => {
    input.addEventListener('input', updateSubtotal);
});

// fungsi untuk mengupdate subtotal
function updateSubtotal() {
    // ambil semua baris dalam tabel
    const rows = document.querySelectorAll('#cartTable tr');

    // inisialisasi total belanjaan
    let totalBelanjaan = 0;

    // iterasi setiap baris
    rows.forEach(row => {
        // cari elemen-elemen yang dibutuhkan
        const priceElement = row.querySelector('.price');
        const quantityInput = row.querySelector('.quantity');
        const subtotalElement = row.querySelector('.subtotal');

        // pastikan semua elemen ada
        if (priceElement && quantityInput && subtotalElement) {
            // ambil harga dan jumlah
            const price = parseInt(priceElement.textContent.replace('Rp. ', '').replace('.', ''));
            const quantity = parseInt(quantityInput.value);

            // hitung subtotal
            const subtotal = price * quantity;

            // update subtotal di tampilan
            subtotalElement.textContent = `Rp. ${subtotal.toLocaleString('id-ID')}`;

            // tambahkan ke total belanjaan
            totalBelanjaan += subtotal;
        }
    });

    // update total belanjaan
    document.getElementById('total-belanjaan').textContent = totalBelanjaan.toLocaleString('id-ID');
    document.getElementById('total').textContent = totalBelanjaan.toLocaleString('id-ID');
}