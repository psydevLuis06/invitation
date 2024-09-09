<?php

require_once '../admon/_ajax/database.php';


if(isset($_POST['obtenerInfoInvitados'])){
    if(isset($_POST['code'])){
        $database = new Database();   
        $result = $database -> getInvitaInfo($_POST['code']);
        echo $result;
    }
}