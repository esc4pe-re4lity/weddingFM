<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<?php ob_start(); ?>

<footer>
    <div class="footer-container">
        <div class="footer-content">
            <div class="footer-AT">
                <a href="http://www.cartoonnetworkme.com/show/adventure-time">
                    <img src="Public/images/at-shop/cn.png" alt="cartoon network logo">
                </a>
                <p>
                    Are you ready to enter the amazing world of Adventure Time? 
                    Join Finn, the human boy, and Jake, the faithful dog, as they head off on wild adventures in the magical world of The Land of Ooo. 
                    Along the way they make friends like Marceline, Princess Bubblegum, Lady Rainicorn, Beemo and many, many others. 
                    They also have to deal with the grumpy Ice King, the mean ruler who really needs to chill out. 
                    Watch Adventure Time on Cartoon Network and escape into a wonderful world where the imagination roams free.
                </p>
            </div>
            <div class="footer-info">
                <a href="https://www.instagram.com/louna_mitsou/">
                    <i class="fab fa-instagram"></i>
                    Louna Mitsou
                </a>
                <span> - </span>
                <a href="http://www.louna-mitsou.fr/">
                    <i class="fas fa-envelope"></i>
                    Contact Me
                </a>
                <span> - </span>
                <span>2018 Copyright</span>
            </div>
        </div>
    </div>
</footer>

<?php
$footer = ob_get_clean();