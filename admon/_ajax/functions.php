<?php
require_once '../../cnx/db.php';

class Functions
{
    private $db;

    public function __construct() {
        $this->db = DB::getInstance();
    }

    function generarCodigo()
    {
        $characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        $randomString = '';
        for ($i = 0; $i < 8; $i++) {
            $randomString .= $characters[rand(0, strlen($characters) - 1)];
        }
        return $randomString;
    }

    public function saveData($familia, $integrantes)
    {
        $codigoFam = generarCodigo();
        $conn = $this->db->getConnection();
        var_dump($familia);
        var_dump($integrante);
        // $sql = "INSERT INTO familia (familia, integrantes) VALUES (:familia, :integr";
        // foreach ($integrantes as $integrante) {
        //     $sql = "INSERT INTO your_table (familia, integrante) VALUES ('$familia', '$integrante')";
        //     if ($conn->query($sql) === TRUE) {
        //         echo "Data saved successfully!";
        //     } else {
        //         echo "Error: " . $sql . "<br>" . $conn->error;
        //     }
        // }
        $conn->close();
    }
}
