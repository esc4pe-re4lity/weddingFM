<?php

require_once 'Address.php';
require_once 'User.php';
require_once 'Manager.php';

class AddressManager extends Manager {

    public function add(Address $address) {
        $req = $this->db->prepare('INSERT INTO address(idUser, nameAddress, line1, line2, postcode, city, country, fullName, inUse)'
                . 'VALUES (:idUser, :nameAddress, :line1, :line2, :postcode, :city, :country, :fullName, :inUse)');
        $req->execute([
            'idUser' => $address->getIdUser(),
            'nameAddress' => $address->getNameAddress(),
            'line1' => $address->getLine1(),
            'line2' => $address->getLine2(),
            'postcode' => $address->getPostcode(),
            'city' => $address->getCity(),
            'country' => $address->getCountry(),
            'fullName' => $address->getFullName(),
            'inUse' => $address->getInUse(),
        ]);
        $address->hydrate([
            'idAddress' => $this->db->lastInsertId()
        ]);
    }

    public function getAll(User $user) {
        $req = $this->db->prepare('SELECT * FROM address WHERE idUser=:idUser AND inUse=1');
        $req->execute(['idUser' => $user->getIdUser()]);
        $req->setFetchMode(PDO::FETCH_CLASS | PDO::FETCH_PROPS_LATE, 'Address');
        $address = $req->fetchAll();
        return $address;
    }

    public function get($data) {
        $req = $this->db->prepare('SELECT * FROM address WHERE idAddress=:idAddress');
        $req->execute(['idAddress' => $data]);
        $req->setFetchMode(PDO::FETCH_CLASS | PDO::FETCH_PROPS_LATE, 'Address');
        $address = $req->fetchAll();
        return $address;
    }

    public function update(Address $address) {
        $req = $this->db->prepare('UPDATE address SET nameAddress=:nameAddress, line1=:line1, line2=:line2, postcode=:postcode,' .
                ' city=:city, country=:country, fullName=:fullName WHERE idAddress=:idAddress');
        $req->execute([
            'nameAddress' => $address->getNameAddress(),
            'line1' => $address->getLine1(),
            'line2' => $address->getLine2(),
            'postcode' => $address->getPostcode(),
            'city' => $address->getCity(),
            'country' => $address->getCountry(),
            'fullName' => $address->getFullName(),
            'idAddress' => $address->getIdAddress()
        ]);
    }

    public function changeInUse(Address $address) {
        $req = $this->db->prepare('UPDATE address SET inUse=:inUse WHERE idAddress=:idAddress');
        $req->execute([
            'inUse' => $address->getInUse(),
            'idAddress' => $address->getIdAddress()
        ]);
    }

    public function delete(User $user) {
        
    }

}

?>
