<?php
include 'koneksi.php';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Davidson Market - Shop</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="style.css" />
    <style>
        .pro {
            position: relative;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .pro:hover {
            transform: scale(1.02);
        }

        .product-link {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 1;
        }

        .cart-icon {
            position: relative;
            z-index: 2;
        }
    </style>
</head>
<body>
    <section id="header">
        <a href="#"><img src="Img/Logo.png" alt="Logo Davidson Market"></a>
        <div>
            <ul id="navbar">
                <li><a href="index.html">Home</a></li>
                <li><a class="active" href="shop.php">Shop</a></li>
                <li><a href="about.html">About</a></li>
                <li id="lg-bag"><a href="cart.html"><i class="fa-solid fa-bag-shopping"></i></a></li>
                <a href="#" id="close"><i class="fa-solid fa-xmark"></i></a>
            </ul>
        </div>
    </section>

    <section id="product1" class="section-p1">
        <h2>Koleksi Motor Davidson</h2>
        <p>Temukan Motor Impian Anda</p>
        <div class="pro-container">
            <?php 
            $query = mysqli_query($koneksi, "SELECT * FROM produk WHERE harga_produk != '0'");
            if (!$query) {
                echo "<p>Error pada query: " . mysqli_error($koneksi) . "</p>";
            } else {
                while ($row = mysqli_fetch_assoc($query)) {
                    
            ?>
            <div class="pro">
                <a href="sproduct.php?id=<?php echo htmlspecialchars($row['id_produk']); ?>" class="product-link"></a>
                
                <img src="img/Produk/<?php echo htmlspecialchars($row['no'] ?? 'default'); ?>.jpg" alt="Produk Davidson">
                <div class="des">
                    <span>Davidson</span>
                    <h5><?php echo htmlspecialchars($row['nama_produk']); ?></h5>
                    <div class="star">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                    </div>
                    <h4>Rp. <?php echo number_format($row['harga_produk'], 0, ',', '.'); ?></h4>
                </div>
                <a href="cart.php?action=add&id=<?php echo htmlspecialchars($row['id_produk']); ?>" class="cart-icon">
                    <i class="fas fa-shopping-cart"></i>
                </a>
            </div>
            <?php 
                }
            } 
            ?>
        </div>
    </section>

    <footer class="section-p1">
        <p>&copy; 2025 Davidson Market. All rights reserved.</p>
    </footer>

    <script src="script.js"></script>
</body>
</html>
