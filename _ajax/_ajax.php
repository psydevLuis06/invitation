<?php

require_once '../admon/_ajax/database.php';

$confirmacion1 = 'Confirmo%20la%20asistencia%20de%20';
$confirmacion2 = '%20a%20la%20boda%20de%20Alexia%20y%20Luis';

if (isset($_POST['obtenerInfoInvitados'])) {
    if (isset($_POST['code'])) {
        $database = new Database();
        $result = $database->getInvitaInfo($_POST['code']);
        echo $result;
        return; // Exit the script here
    }
}

if (isset($_POST['obtenerNombresFamilia'])) {
    if (isset($_POST['code'])) {
        $database = new Database();
        $result = $database->getInformationFromFamily($_POST['code']);
        echo $result;
        return; // Exit the script here
    }
}

if (isset($_POST['guardarAsistenciaInvitados'])) {
    if (isset($_POST['lista'])) {
        $database = new Database();
        $asistentes = array(); // Crear un arreglo vacío
        foreach ($_POST['lista'] as $asistente) {
            $codigo = $asistente['codigo'];
            $nombre = $asistente['nombre'];
            $estatus = $asistente['estatus'];
            $app = $asistente['app'];
            $result = $database->actualizaEstatus($codigo, $nombre, $estatus);
            if ($estatus == 'confirmado') {
                $asistentes[] = array( // Agregar un nuevo elemento al arreglo
                    'nombre' => $nombre,
                    'app' => $app
                );
            }
        }
        $nombress = $database->concatenateArray($asistentes, 'nombre', 'app');
        $nombress = str_replace(' ', '%20', $nombress);
        $nombress = str_replace(',', '%2C', $nombress);

        $url = 'https://wa.me/523327834905?text=' . $confirmacion1 . $nombress . $confirmacion2;
        echo $url;
    }
}
