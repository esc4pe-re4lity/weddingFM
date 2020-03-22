<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Rooter
 *
 * @author Fiamma
 */
class Rooter {

    public function __construct() {
        $this->initURL();
    }

    private function initURL() {
        require CONTROLLER;
        $controller = new Controller();

        if (isset($_GET['action'])) {
            if ($_GET['action'] === 'createAccount') {
                $controller->addUser();
            } elseif ($_GET['action'] === 'login') {
                $controller->loginUser();
            } elseif ($_GET['action'] === 'logout') {
                $controller->logoutUser();
            } elseif ($_GET['action'] === 'getUser') {
                $controller->getUser();
            }  elseif ($_GET['action'] === 'updateUser') {
                $controller->updateUser();
            } elseif ($_GET['action'] === 'updatePassword') {
                $controller->updatePassword();
            } elseif ($_GET['action'] === 'getAddress') {
                $controller->getAddress();
            } elseif ($_GET['action'] === 'addAddress') {
                $controller->addAddress();
            } elseif ($_GET['action'] === 'updateAddress'){
                $controller->updateAddress();
            } elseif ($_GET['action'] === 'deleteAddress'){
                $controller->deleteAddress();
            } elseif($_GET['action'] === 'isEmailValid'){
                $controller->isEmailValid();
            } else {
                $controller->getError();
            }
        } else {
            require (VIEW . '/home.php');
        }
    }

}
