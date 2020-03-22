<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of PersonalityManager
 *
 * @author Fiamma
 */

require_once 'Personality.php';
require_once 'Manager.php';

class PersonalityManager extends Manager {

    public function get($idPersonality) {
        $req = $this->db->prepare('SELECT * FROM user WHERE idPersonality=:idPersonality');
        $req->execute(['idPersonality' => $idPersonality]);
        $req->setFetchMode(PDO::FETCH_CLASS | PDO::FETCH_PROPS_LATE, 'Personality');
        $personalities = $req->fetchAll();
        return $personalities;
    }
}
