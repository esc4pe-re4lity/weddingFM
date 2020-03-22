<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<?php $title = "AT Shop - Login" ?>


<?php require('header.php'); ?>


<?php ob_start(); ?>
<section class="AT-login">
    <div class="login-container">
        <div class="login-header">
            <h3>Login</h3>
        </div>
        <div class="login-content">
            <div class="login-left">
                <form class="login" method="post" action="index.php?redirect=ATshop&amp;action=login">
                    <p>
                        <label for="email">Email</label>
                        <br/>
                        <input type="email" name="email" id="email" required/>
                    </p>
                    <p>
                        <label for="password">Password</label>
                        <br/>
                        <input type="password" name="password" id="password" required/>
                    </p>
                    <p>
                        <button class="login-button">Login</button>
                    </p>
                    <p>You don't have an account yet ? Please click <a href="index.php?redirect=ATshop&amp;action=createAccount">here</a></p>
                </form>
            </div>
            <div class="login-right">
                <img src="public/images/at-shop/jake-login.png" alt="princess bubblegum">
            </div>
        </div>
    </div>
</section>
<?php $section1 = ob_get_clean(); ?>


<?php require('footer.php'); ?>


<?php ob_start(); ?>
<?php $script = ob_get_clean(); ?>

<?php
require('template.php');
