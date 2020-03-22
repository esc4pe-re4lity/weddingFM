<?php

require_once 'User.php';
require_once 'Manager.php';

class UserManager extends Manager {

    public function isValid(User $user) {
        $req = $this->db->prepare('SELECT email FROM user WHERE email=:email');
        $req->execute([
            'email' => $user->getEmail()]);
        if ($req->rowCount() === 0) {
            return true;
        } else {
            return false;
        }
    }

    public function add(User $user) {
        $req = $this->db->prepare('INSERT INTO user(firstName, lastName, email, password, image, creationDate)'
                . 'VALUES (:firstName, :lastName, :email, :password, :image, NOW())');
        $req->execute([
            'firstName' => $user->getFirstName(),
            'lastName' => $user->getLastName(),
            'email' => $user->getEmail(),
            'password' => $user->getPassword(),
            'image' => $user->getImage()
        ]);
        $user->hydrate([
            'idUser' => $this->db->lastInsertId(),
            'isAdmin' => 0,
            'creationDate' => date("Y-m-d H:i:s")
        ]);
    }

    public function get($idUser) {
        $req = $this->db->prepare('SELECT * FROM user WHERE idUser=:idUser');
        $req->execute(['idUser' => $idUser]);
        $req->setFetchMode(PDO::FETCH_CLASS | PDO::FETCH_PROPS_LATE, 'User');
        $users = $req->fetchAll();
        return $users;
    }

    public function getIdUser(User $user) {
        $req = $this->db->prepare('SELECT idUser FROM user WHERE pseudo=:pseudo OR email=:email');
    }
    
    public function verifyPassword(User $user){
        $req = $this->db->prepare('SELECT * FROM user WHERE idUser=:idUser AND password=:password');
        $req->execute([
            'idUser' => $user->getIdUser(),
            'password' => $user->getPassword(),
        ]);
        $row = $req->fetch();
        if ($row['password'] === $user->getPassword()) {
            return true;
        } else {
            return false;
        }
    }

    public function updatePassword(User $user) {
        $req = $this->db->prepare('UPDATE user SET password=:password WHERE idUser=:idUser');
        $req->execute([
            'password' => $user->getPassword(),
            'idUser' => $user->getIdUser()
        ]);
    }

    public function updateDetails(User $user) {
        $req = $this->db->prepare('UPDATE user SET firstName=:firstName, lastName=:lastName, email=:email WHERE idUser=:idUser');
        $req->execute([
            'firstName' => $user->getFirstName(),
            'lastName' => $user->getLastName(),
            'email' => $user->getEmail(),
            'idUser' => $user->getIdUser()
        ]);
    }

    public function delete($idUser) {
        
    }

    public function login(User $user) {
        $req = $this->db->prepare('SELECT * FROM user WHERE email=:email AND password=:password');
        $req->execute([
            'email' => $user->getEmail(),
            'password' => $user->getPassword(),
        ]);
        $row = $req->fetch();
        if ($row['email'] === $user->getEmail() && $row['password'] === $user->getPassword()) {
            $user->hydrate($row);
            return true;
        } else {
            return false;
        }
    }

}

?>
