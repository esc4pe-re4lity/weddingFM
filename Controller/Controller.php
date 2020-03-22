<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Controller
 *
 * @author Fiamma
 */
require(AUTOLOAD);

session_start();

class Controller {
    
    public function isEmailValid(){
        if(isset($_POST['email'])){
            if(!empty(trim($_POST['email']))){
                $data = [
                    'email' => filter_input(INPUT_POST, 'email', FILTER_SANITIZE_FULL_SPECIAL_CHARS)
                ];
                $user = new User($data);
                $userManager = new UserManager();
                $res = $userManager->isValid($user);
                if ($res === true) {
                    echo 'true';
                } else {
                    echo 'false';
                }
            }
        } else {
            $this->getError();
        }
    }

    public function addUser() {
        if (isset($_POST['firstName']) && isset($_POST['lastName']) && isset($_POST['email']) && isset($_POST['password']) && isset($_POST['confirmPassword'])) {
            if (!empty(trim($_POST['firstName'])) && !empty(trim($_POST['lastName'])) && !empty(trim($_POST['email'])) && !empty(trim($_POST['password'])) && !empty(trim($_POST['confirmPassword']))) {
                $data = [
                    'firstName' => filter_input(INPUT_POST, 'firstName', FILTER_SANITIZE_FULL_SPECIAL_CHARS),
                    'lastName' => filter_input(INPUT_POST, 'lastName', FILTER_SANITIZE_FULL_SPECIAL_CHARS),
                    'password' => filter_input(INPUT_POST, 'password', FILTER_SANITIZE_FULL_SPECIAL_CHARS),
                    'email' => filter_input(INPUT_POST, 'email', FILTER_SANITIZE_FULL_SPECIAL_CHARS)
                ];
                $user = new User($data);
                $user->chooseCharacter();
                $userManager = new UserManager();
                $res = $userManager->isValid($user);
                if ($res === true) {
                    $userManager->add($user);
                    $this->addBasket($user);
                    $this->addWishlist($user);
                    $this->sendEmail($user);
                    $this->loginUser();
                } else {
                    $_SESSION['error'] = "<p>You couldn't create an new account because the email has already beeing used. Maybe you have forgotten your password."
                            . "You can try to <a href='index.php?redirect=ATshop&amp;action=login'>login</a> with this email or "
                            . "<a href='index.php?redirect=ATshop&amp;action=login'>create a new account</a> with another email.</p>";
                    require(VIEW . '/adventure-time-shop/error.php');
                }
            } else {
                echo 'Empty field(s)';
            }
        } else {
            require(VIEW . '/adventure-time-shop/createAccount.php');
        }
    }

    public function getUser() {
        if (isset($_SESSION['user'])) {
            $user = $_SESSION['user'];
            $addressManager = new AddressManager();
            $purchaseManager = new PurchaseManager();
            $res1 = $addressManager->getAll($user);
            $res2 = $purchaseManager->getAllUserPurchase($user);
            if ($user->getIsAdmin() === 1) {
                require(VIEW . '/adventure-time-shop/admin/getUser.php');
            } else {
                require (VIEW . '/adventure-time-shop/user/getUser.php');
            }
        } else {
            header('Location: index.php?redirect=ATshop&action=login');
        }
    }

    public function updateUser() {
        if (isset($_SESSION['user'])) {
            $user = $_SESSION['user'];
            if (isset($_POST['firstName']) && isset($_POST['lastName']) && isset($_POST['email'])) {
                if (!empty(trim($_POST['firstName'])) && !empty(trim($_POST['lastName'])) && !empty(trim($_POST['email']))) {
                    $userManager = new UserManager();
                    $data = [
                        'firstName' => filter_input(INPUT_POST, 'firstName', FILTER_SANITIZE_FULL_SPECIAL_CHARS),
                        'lastName' => filter_input(INPUT_POST, 'lastName', FILTER_SANITIZE_FULL_SPECIAL_CHARS),
                        'email' => filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL)
                    ];
                    $user->hydrate($data);
                    $userManager->updateDetails($user);
                    header('Location: index.php?redirect=ATshop&action=getUser');
                } else {
                    echo 'empty fields';
                }
            } else {
                echo 'empty fields';
            }
        } else {
            header('Location: index.php?redirect=ATshop&action=login');
        }
    }
    
    public function updatePassword(){
        if (isset($_SESSION['user'])) {
            $user = $_SESSION['user'];
            if (isset($_POST['oldPassword']) && isset($_POST['newPassword'])) {
                if (!empty(trim($_POST['oldPassword'])) && !empty(trim($_POST['newPassword']))) {
                    $userManager = new UserManager();
                    $data1 = [
                        'password' => filter_input(INPUT_POST, 'oldPassword', FILTER_SANITIZE_FULL_SPECIAL_CHARS)
                    ];
                    $user->hydrate($data1);
                    $res = $userManager->verifyPassword($user);
                    if($res === true){
                        $data2 = [
                            'password' => filter_input(INPUT_POST, 'newPassword', FILTER_SANITIZE_FULL_SPECIAL_CHARS)
                        ];
                        $user->hydrate($data2);
                        $userManager->updatePassword($user);
                        header('Location: index.php?redirect=ATshop&action=getUser');
                    } else {
                        $_SESSION['error'] = "<p>You couldn't change your password because the current password that you entered is not the correct one. "
                                . "You can try again to <a href='index.php?redirect=ATshop&amp;action=getUser'>change your password</a>.</p>";
                        require(VIEW . '/adventure-time-shop/error.php');
                    }
                } else {
                    echo 'empty fields';
                }
            } else {
                echo 'empty fields';
            }
        } else {
            header('Location: index.php?redirect=ATshop&action=login');
        }
    }

    public function loginUser() {
        if (isset($_POST['oldPassword']) && isset($_POST['newPassword'])) {
            if (!empty(trim($_POST['oldPassword'])) && !empty(trim($_POST['newPassword']))) {
                $data = [
                    'oldPassword' => filter_input(INPUT_POST, 'email', FILTER_SANITIZE_FULL_SPECIAL_CHARS),
                    'newPassword' => filter_input(INPUT_POST, 'password', FILTER_SANITIZE_FULL_SPECIAL_CHARS)
                ];
                $user = new User($data);
                $userManager = new UserManager;
                $res = $userManager->login($user);
                if ($res === true) {
                    $this->getBasketUser($user);
                    $this->getWishlistUser($user);
                    $this->getAddressUser($user);
                    $_SESSION['user'] = $user;
                    $_SESSION['message'] = 'Welcome ' . ucfirst($user->getFirstName()) . ' !';
                    $_SESSION['image'] = '';
                    header('Location: index.php?redirect=ATshop');
                } else {
                    $_SESSION['error'] = "<p>You couldn't login because the email and the password doesn't match. One of them (or both) might be wrong."
                            . "You can try again to <a href='index.php?redirect=ATshop&amp;action=login'>login</a>.</p>";
                    require(VIEW . '/adventure-time-shop/error.php');
                }
            } else {
                echo 'empty fields';
            }
        } else {
            require(VIEW . '/adventure-time-shop/login.php');
        }
    }

    public function sendEmail(User $user) {
        $to = $user->getEmail();
        $firstName = ucfirst($user->getFirstName());
        $lastName = ucfirst($user->getLastName());
        $subject = 'Welcome to the Adventure Time Shop Family !';
        $message = <<<EOD
        <div style="background:no-repeat top center;margin:0;padding:0">
            <a href="louna-mitsou.fr/index.php?redirect=ATshop">
                <img src="https://78.media.tumblr.com/67c3bec55b8b93a58db3a03d9b61646e/tumblr_p8kkwmT8Ke1x3feeno1_1280.jpg" style="display:block;margin:auto;">
            </a>
            <div style="text-align:center">
                <p style="font-family:Arial,Helvetica,sans-serif;font-size:26px;color:#333333">Welcome $firstName $lastName</p>
                <p style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#595959;line-height:20px">
                    This is to confirm that you are from now on, a member of the Adventure Time Family.<br/><br/>
                    You can start to shop on our website the merchandise available right away. Don't forget to save an address for the shipping !<br/><br/>
                    Please enjoy yourself<br/><br/>
                    <em>It's Adventure Time !</em>
                </p>
                <br/>
                <img src="http://newnation.sg/wp-content/uploads/fist-bump-adventure.gif" alt="Finn and Jake Trustpound Gif"/>
            </div>
        </div>
EOD;
        $headers = 'MIME-Version: 1.0' . "\r\n";
        $headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
        mail($to, $subject, $message, $headers);
    }

    public function logoutUser() {
        // enregistrer le panier, la wishlist avec la variable de $_SESSION
        if (isset($_SESSION['user'])) {
            $user = $_SESSION['user'];
            $this->saveBasket($user);
            $this->saveWishlist($user);
        }
        session_destroy();
        session_start();
        $_SESSION['message'] = 'See yaaaaa!';
        $_SESSION['image'] = 'Public/images/at-shop/bye.png';
        // renvoyer vers une page qui dit qu'on a bien été déconnecté ?
        header('Location: index.php?redirect=ATshop');
    }

    public function deleteUser() {
        
    }

    public function addAddress() {
        if (isset($_SESSION['user'])) {
            $user = $_SESSION['user'];
            if (isset($_POST['fullName']) && isset($_POST['nameAddress']) && isset($_POST['line1']) && isset($_POST['postcode']) && isset($_POST['city']) && isset($_POST['country'])) {
                if (!empty(trim($_POST['fullName'])) && !empty(trim($_POST['nameAddress'])) && !empty(trim($_POST['line1'])) && !empty(trim($_POST['postcode'])) && !empty(trim($_POST['city']))) {
                    $addressManager = new AddressManager();
                    $data = [
                        'idUser' => $user->getIdUser(),
                        'fullName' => filter_input(INPUT_POST, 'fullName', FILTER_SANITIZE_FULL_SPECIAL_CHARS),
                        'nameAddress' => filter_input(INPUT_POST, 'nameAddress', FILTER_SANITIZE_FULL_SPECIAL_CHARS),
                        'line1' => filter_input(INPUT_POST, 'line1', FILTER_SANITIZE_FULL_SPECIAL_CHARS),
                        'line2' => filter_input(INPUT_POST, 'line2', FILTER_SANITIZE_FULL_SPECIAL_CHARS),
                        'postcode' => filter_input(INPUT_POST, 'postcode', FILTER_SANITIZE_FULL_SPECIAL_CHARS),
                        'city' => filter_input(INPUT_POST, 'city', FILTER_SANITIZE_FULL_SPECIAL_CHARS),
                        'country' => filter_input(INPUT_POST, 'country', FILTER_SANITIZE_FULL_SPECIAL_CHARS),
                        'inUse' => 1
                    ];
                    $address = new Address($data);
                    $addressManager->add($address);
                    if (isset($_GET['shipping'])) {
                        header('Location: index.php?redirect=ATshop&action=shipping');
                    } else {
                        header('Location: index.php?redirect=ATshop&action=getUser');
                    }
                } else {
                    echo 'empty fields';
                } 
            } else {
                echo 'empty fields';
            }
        } else {
            header('Location: index.php?redirect=ATshop&action=login');
        }
    }

    public function getAddressUser(User $user) {
        $addressManager = new AddressManager();
        $address = $addressManager->getAll($user);
    }

    public function getAddress() {
        if (isset($_SESSION['user'])) {
            $user = $_SESSION['user'];
            if (isset($_POST['idAddress'])) {
                if (!empty(trim($_POST['idAddress']))) {
                    $idAddress = filter_input(INPUT_POST, 'idAddress', FILTER_SANITIZE_NUMBER_INT);
                    $addressManager = new AddressManager();
                    $res = $addressManager->get($idAddress);
                    foreach ($res as $address) {
                        header('Content-Type: application/json');
                        echo json_encode([
                            'nameAddress' => $address->getNameAddress(),
                            'fullName' => $address->getFullName(),
                            'line1' => $address->getLine1(),
                            'line2' => $address->getLine2(),
                            'postcode' => $address->getPostcode(),
                            'city' => $address->getCity(),
                            'country' => $address->getCountry(),
                        ]);
                    }
                } else {
                    echo 'empty fields';
                }
            } else {
                echo 'no id address';
            }
        } else {
            header('Location: index.php?redirect=ATshop&action=login');
        }
    }

    public function updateAddress() {
        if (isset($_SESSION['user'])) {
            $user = $_SESSION['user'];
            if (isset($_GET['idAddress'])) {
                $idAddress = filter_input(INPUT_GET, 'idAddress', FILTER_SANITIZE_NUMBER_INT);
                if (isset($_POST['nameAddress']) && isset($_POST['fullName']) && isset($_POST['line1']) && isset($_POST['postcode']) && isset($_POST['city']) && isset($_POST['country'])) {
                    if (!empty(trim($_POST['nameAddress'])) && !empty(trim($_POST['fullName'])) && !empty(trim($_POST['line1'])) && !empty(trim($_POST['postcode'])) && !empty(trim($_POST['city']))) {
                        $addressManager = new AddressManager();
                        $data = [
                            'idAddress' => $idAddress,
                            'nameAddress' => filter_input(INPUT_POST, 'nameAddress', FILTER_SANITIZE_FULL_SPECIAL_CHARS),
                            'fullName' => filter_input(INPUT_POST, 'fullName', FILTER_SANITIZE_FULL_SPECIAL_CHARS),
                            'line1' => filter_input(INPUT_POST, 'line1', FILTER_SANITIZE_FULL_SPECIAL_CHARS),
                            'line2' => filter_input(INPUT_POST, 'line2', FILTER_SANITIZE_FULL_SPECIAL_CHARS),
                            'postcode' => filter_input(INPUT_POST, 'postcode', FILTER_SANITIZE_FULL_SPECIAL_CHARS),
                            'city' => filter_input(INPUT_POST, 'city', FILTER_SANITIZE_FULL_SPECIAL_CHARS),
                            'country' => filter_input(INPUT_POST, 'country', FILTER_SANITIZE_FULL_SPECIAL_CHARS)
                        ];
                        $address = new Address($data);
                        $addressManager->update($address);
                        header('Location: index.php?redirect=ATshop&action=getUser');
                    }
                } else {
                    echo 'empty fields';
                }
            } else {
                echo 'missing id';
            }
        } else {
            header('Location: index.php?redirect=ATshop&action=login');
        }
    }

    public function deleteAddress() {
        if (isset($_SESSION['user'])) {
            $user = $_SESSION['user'];
            if (isset($_POST['idAddress'])) {
                if (!empty(trim($_POST['idAddress']))) {
                    $addressManager = new AddressManager();
                    $data = [
                        'idAddress' => filter_input(INPUT_POST, 'idAddress', FILTER_SANITIZE_NUMBER_INT),
                        'inUse' => 0
                    ];
                    $address = new Address($data);
                    $addressManager->changeInUse($address);
                } else {
                    echo 'empty fields';
                }
            } else {
                echo 'no id';
            }
        } else {
            header('Location: index.php?redirect=ATshop&action=login');
        }
    }

    public function sendAdminEmail(Purchase $purchase) {
        if (isset($_SESSION['user'])) {
            $user = $_SESSION['user'];
            $to = 'fiamma.pellicane@gmail.com';
            $firstName = ucfirst($user->getFirstName());
            $lastName = ucfirst($user->getLastName());
            $idUser = $user->getIdUser();
            $subject = 'Congratulation! A new purchase has been sent!';
            $message = <<<EOD
            <div style="background:no-repeat top center;margin:0;padding:0">
                <a href="louna-mitsou.fr/index.php?redirect=ATshop">
                    <img src="https://78.media.tumblr.com/67c3bec55b8b93a58db3a03d9b61646e/tumblr_p8kkwmT8Ke1x3feeno1_1280.jpg" style="display:block;margin:auto;">
                </a>
                <div style="text-align:center">
                    <p style="font-family:Arial,Helvetica,sans-serif;font-size:26px;color:#333333">Congratulations!</p>
                    <p style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#595959;line-height:20px">
                        User id no. #$idUser ($firstName $lastName) just made an order.<br/><br/>
                        Have a look on the order and prepare it quick!<br/><br/>
                        Don't forget to go on your profile and change the status when you will sent the order.<br/><br/>
                    </p>
                    <div class="purchase-confirmed-buttons" style="margin: 10px 0;">
                        <a href="louna-mitsou.fr/index.php?redirect=ATshop&amp;action=getUser"
                            style="padding: 10px 15px;margin: 20px;border-radius: 2px;background-color: #73bcdf;color: white;
                                font-weight: bold;text-decoration:none;">
                            View profile
                        </a>
                    </div>
                    <br/>
                    <img src="https://media1.tenor.com/images/8373dd8b18dacf6292f73f004e2ac454/tenor.gif?itemid=8025388" alt="Yay Bmo Dancing"/>
                </div>
            </div>
EOD;
            $headers = 'MIME-Version: 1.0' . "\r\n";
            $headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
            mail($to, $subject, $message, $headers);
        }
    }

    public function sendEmailConfirmation(Purchase $purchase) {
        if (isset($_SESSION['user'])) {
            $user = $_SESSION['user'];
            $to = $user->getEmail();
            $firstName = ucfirst($user->getFirstName());
            $lastName = ucfirst($user->getLastName());
            $subject = 'Your purchase no. is confirmed';
            $message = <<<EOD
            <div style="background:no-repeat top center;margin:0;padding:0">
                <a href="louna-mitsou.fr/index.php?redirect=ATshop">
                    <img src="https://78.media.tumblr.com/67c3bec55b8b93a58db3a03d9b61646e/tumblr_p8kkwmT8Ke1x3feeno1_1280.jpg" style="display:block;margin:auto;">
                </a>
                <div style="text-align:center">
                    <p style="font-family:Arial,Helvetica,sans-serif;font-size:26px;color:#333333">Your purchase is confirmed</p>
                    <p style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#595959;line-height:20px">
                        Thank you so much for your order, $firstName.<br/><br/>
                        To make sure you haven't made any mistakes, you can have a look on your order<br/><br/>
                        To find out how fast your order is processed, your can check your profile.<br/><br/>
                    </p>
                    <div class="purchase-confirmed-buttons" style="margin: 10px 0;">
                        <a href="louna-mitsou.fr/index.php?redirect=ATshop&amp;action=getUser"
                            style="padding: 10px 15px;margin: 20px;border-radius: 2px;background-color: #73bcdf;color: white;
                                font-weight: bold;text-decoration:none;">
                            View your profile
                        </a>
                    </div>
                    <br/>
                    <img src="https://media1.tenor.com/images/8373dd8b18dacf6292f73f004e2ac454/tenor.gif?itemid=8025388" alt="Yay Bmo Dancing"/>
                </div>
            </div>
EOD;
            $headers = 'MIME-Version: 1.0' . "\r\n";
            $headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
            mail($to, $subject, $message, $headers);
        }
    }

    public function getHome() {
        if (!isset($_SESSION['basket'])) {
            $_SESSION['basket'] = array();
            $_SESSION['basket']['idItem'] = array();
            $_SESSION['basket']['quantityItem'] = array();
            $_SESSION['basket']['priceItem'] = array();
            $_SESSION['basket']['totalItem'] = 0;
            $_SESSION['basket']['totalPrice'] = 0.00;
        }
        if (!isset($_SESSION['wishlist'])) {
            $_SESSION['wishlist'] = array();
            $_SESSION['wishlist']['idItem'] = array();
            $_SESSION['wishlist']['totalItem'] = 0;
        }
        if (!isset($_SESSION['message'])) {
            $_SESSION['message'] = "";
        }
        if (!isset($_SESSION['image'])) {
            $_SESSION['image'] = "";
        }
        if (isset($_SESSION['user'])) {
            $user = $_SESSION['user'];
            if ($user->getIsAdmin() === 1) {
                $res = $this->getAllInstagramPosts();
                require(VIEW . '/adventure-time-shop/admin/home.php');
            } else {
                $res = $this->getAllItems();
                require(VIEW . '/adventure-time-shop/user/home.php');
            }
        } else {
            $res = $this->getAllItems();
            if (!empty($res)) {
                require(VIEW . '/adventure-time-shop/home.php');
            } else {
                require(VIEW . '/adventure-time-shop/home.php');
            }
        }
    }
    
    public function getError(){
        $_SESSION['error'] = "<h3>ERROR 404 : Page not found</h3>"
                . "<p>Dude, suckin' at something is the first step towards being sorta good at something. "
                . "<a href='index.php?redirect=ATshop'>Home</a> is where your heart is.</p>";
        if (isset($_SESSION['user'])) {
            $user = $_SESSION['user'];
            if ($user->getIsAdmin() === 1) {
                require(VIEW . '/adventure-time-shop/admin/error.php');
            } else {
                require(VIEW . '/adventure-time-shop/user/error.php');
            }
        } else {
            require(VIEW . '/adventure-time-shop/error.php');
        }
    }

}

// unset($_SESSION);
// session_destroy();
// utiliser ajax pour envoyer des infos pour ne charger qu'une partie de la page (exemple : pour mettre des articles dans le panier
// ajouter les items au panier ou à la wishlist
// s'occuper d'enregistrer le user dans une session
// authentification insta et récupération des données (authInsta dans le controller puis récupération des données avec un objet Instagram et affichage dans la vue)
// ajout d'une image aléatoire au profil de chaque utilisateur
// faire le menu utilisateur
// modification du profil utilisateur
// ajout d'une addresse dans le profil de l'utilisateur


// comment je fais pour récupérer un panier qui a été fait alors que la personne n'était pas connecté ?
// la personne fait son panier, puis quand elle veut procéder au checkout on lui demande de créer un compte
// elle crée son compte, reçoit un mail de confirmation puis clique sur le lien de validation et se connecte
// comment savoir que le panier qu'elle a fait lorsqu'elle n'était pas connecté est le sien ?