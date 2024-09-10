<?php

require_once '../admon/_ajax/database.php';

$confirmacion1 = 'Confirmo%20la%20asistencia%20de%20';
$confirmacion2 = '%20a%20la%20boda%20de%20Alexia%20y%20Luis';

if (isset($_POST['obtenerInfoInvitados'])) {
    if (isset($_POST['code'])) {
        $database = new Database();
        $result = $database->getInvitaInfo($_POST['code']);
        echo $result;
    }
}

if (isset($_POST['obtenerNombresFamilia'])) {
    if (isset($_POST['code'])) {
        $database = new Database();
        $result = $database->getInvitaInfo($_POST['code']);
        echo $result;
    }
}
