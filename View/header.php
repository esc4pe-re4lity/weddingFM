<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<?php ob_start(); ?>
<div id="AT-fixed-nav">
    <ul id="AT-nav">
        <li>
            <a href="index.php?redirect=ATshop&amp;action=getBasket">
                <i class="fas fa-shopping-basket"></i>
                <span class="total-items-basket"><?= $_SESSION['basket']['totalItem'] ?></span>
                <span class="nav-name">Basket</span>
                <span class="price-items-basket"><?= $_SESSION['basket']['totalPrice'] ?></span>€
            </a>
            <div id="itemAddedToBasket">
                <img class="itemAddedToBasket-image" src="<?=$_SESSION['image']?>">
                <span class="itemAddedToBasket-name"></span>
                <span class="itemAddedToBasket-quantity"></span>
                <span class="itemAddedToBasket-price"></span>
                <span class="itemAddedToBasket-text"><?=$_SESSION['message']?></span>
            </div>
        </li>
        <li>
            <a href="index.php?redirect=ATshop&amp;action=getWishlist">
                <i class="fas fa-heart"></i>
                <span class="total-items-wishlist"><?= $_SESSION['wishlist']['totalItem'] ?></span>
                <span class="nav-name">Wishlist</span>
            </a>
            <div id="itemAddedToWishlist">
                <img class="itemAddedToWishlist-image" src="">
                <span class="itemAddedToWishlist-name"></span>
                <span class="itemAddedToWishlist-text"></span>
            </div>
        </li>
        <li>
            <a href="index.php?redirect=ATshop&amp;action=login">
                <i class="fas fa-user"></i>
                <span class="nav-name">Login</span>
            </a>
        </li>
    </ul>
</div>
<div id="AT-logo">
    <h1 style="display: none;">Adventure Time Shop</h1>
    <a href="index.php?redirect=ATshop">
        <img src="Public/images/atshop/atshop.png" alt="adventure time logo" id="logo">
    </a>
    <p>Adventure Time Merchandise sold by a fan to honor the greatest TV show on Earth</p>
</div>
<div id=""></div>

<?php
$header = ob_get_clean();
