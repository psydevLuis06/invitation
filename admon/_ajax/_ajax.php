<?php
require_once 'database.php';


if(isset($_POST['guardarInvitados'])){
    // var_dump($_POST);

    $database = new Database();
    $result = $database->saveInvitados($_POST['familia'], $_POST['integrantes']);
    echo $result;
}

