<?php

require_once 'User.php';

class Address {

    protected $idAddress,
            $idUser,
            $nameAddress,
            $line1,
            $line2,
            $postcode,
            $city,
            $country,
            $fullName,
            $inUse;

    public function __construct($data = []) {
        if (!empty($data)) {
            $this->hydrate($data);
        }
    }

    public function hydrate($data) {
        foreach ($data as $attr => $value) {
            $method = 'set' . ucfirst($attr);
            if (is_callable([$this, $method])) {
                $this->$method($value);
            }
        }
    } 

    public function getIdAddress() {
        return $this->idAddress;
    }

    public function getIdUser() {
        return $this->idUser;
    }

    public function getNameAddress() {
        return $this->nameAddress;
    }

    public function getLine1() {
        return $this->line1;
    }

    public function getLine2() {
        return $this->line2;
    }

    public function getPostcode() {
        return $this->postcode;
    }

    public function getCity() {
        return $this->city;
    }

    public function getCountry() {
        switch ($this->country){
            case 'fr': return 'France';
                break;
            case 'be': return 'Belgium';
                break;
            case 'es': return 'Spain';
                break;
            case 'it': return 'Italy';
                break;
            case 'en': return 'United Kingdom';
                break;
            default : return $this->country;
        }
    }

    public function getFullName() {
        return $this->fullName;
    }
    
    public function getInUse(){
        return $this->inUse;
    }

    public function setIdAddress($idAddress) {
        $this->idAddress = (int) $idAddress;
    }

    public function setIdUser($idUser) {
        $this->idUser = (int) $idUser;
    }

    public function setNameAddress($nameAddress) {
        $this->nameAddress = $nameAddress;
    }

    public function setLine1($line1) {
        $this->line1 = $line1;
    }

    public function setLine2($line2) {
        $this->line2 = $line2;
    }

    public function setPostcode($postcode) {
        $this->postcode = $postcode;
    }

    public function setCity($city) {
        $this->city = $city;
    }

    public function setCountry($country) {
        $this->country = $country;
    }

    public function setFullName($fullName) {
        $this->fullName = $fullName;
    }
    
    public function setInUse($inUse){
        $this->inUse = (int) $inUse;
    }

    public function getAddress(): string {
        
    }

}

?>
