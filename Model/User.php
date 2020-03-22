<?php

class User {

    protected $idUser,
            $idPersonality,
            $firstName,
            $lastName,
            $email,
            $password,
            $image,
            $isAdmin,
            $creationDate,
            $phoneNumber,
            $address,
            $role,
            $availableDate;

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

    public function getIdUser() {
        return $this->idUser;
    }

    public function getFirstName() {
        return $this->firstName;
    }

    public function getLastName() {
        return $this->lastName;
    }

    public function getEmail() {
        return $this->email;
    }

    public function getPassword() {
        return $this->password;
    }

    public function getImage() {
        return $this->image;
    }

    public function getIsAdmin() {
        return $this->isAdmin;
    }

    public function getCreationDate() {
        $formatter = new IntlDateFormatter('fr_FR', IntlDateFormatter::FULL, IntlDateFormatter::NONE, 'Europe/Paris', IntlDateFormatter::GREGORIAN);
        $formattedDate = new DateTime($this->creationDate);
        $creationDate = $formatter->format($formattedDate);
        return $creationDate;
    }

    public function getPhoneNumber() {
        return $this->phoneNumber;
    }

    public function setIdUser($idUser) {
        $this->idUser = (int) $idUser;
    }

    public function setFirstName($firstName) {
        $this->firstName = $firstName;
    }

    public function setLastName($lastName) {
        $this->lastName = $lastName;
    }

    public function setEmail($email) {
        $this->email = $email;
    }

    public function setPassword($password) {
        $this->password = hash('sha256', $password);
    }

    public function setImage($image) {
        $this->image = $image;
    }

    public function setIsAdmin($isAdmin) {
        $this->isAdmin = (int) $isAdmin;
    }

    public function setCreationDate($creationDate) {
        $this->creationDate = $creationDate;
    }

    public function setPhoneNumber($phoneNumber) {
        $this->phoneNumber = $phoneNumber;
    }

    public function chooseCharacter() {
        $characters = ['finn', 'jake', 'marceline', 'lsp', 'pb', 'rainicorn', 'bmo', 'fp', 'ice-king'];
        $character = array_rand($characters, 1);
        $this->setImage($characters[$character]);
    }

    public function getImageURL() {
        $imageURL = IMAGE . '/at-shop/' . $this->image . '.png';
        return $imageURL;
    }

}

?>
