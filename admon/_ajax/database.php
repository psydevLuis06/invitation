<?php

require_once '../../cnx/db.php';
require_once '../../phpqrcode/qrlib.php';


class Database
{

  private $conn;

  public function __construct()
  {
    global $conn;
    $this->conn = $conn;
  }

  public function generarCodigo()
  {
    $characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    $randomString = '';
    for ($i = 0; $i < 8; $i++) {
      $randomString .= $characters[rand(0, strlen($characters) - 1)];
    }
    return $randomString;
  }

  // Función para ejecutar consultas
  public function query($sql)
  {
    try {
      $stmt = $this->conn->prepare($sql);
      $stmt->execute();
      return $stmt;
    } catch (PDOException $e) {
      echo "Error en la consulta: " . $e->getMessage();
      return false;
    }
  }

  // Función para obtener datos de la base de datos
  public function getRows($sql)
  {
    $result = $this->query($sql);
    if ($result) {
      return $result->fetchAll(PDO::FETCH_ASSOC);
    } else {
      return false;
    }
  }
  public function generarQrCode($code)
  {
    var_dump("entro");
    $path = dirname(dirname(__DIR__))."/images/qrs/";
    $QrCode = $path . $code . ".png";
    QRcode::png($code, $QrCode, 'H', 4, 4);
    return $QrCode;
  }

  public function saveInvitados($familia, $invitados)
  {
    try {

      $codigoFam = $this->generarCodigo();
      $qrCode = $this->generarQrCode($codigoFam);
      var_dump($qrCode);
      if (file_exists($qrCode)) {
        $sqlFam = "INSERT INTO Familia (Cantidad, Nombre, Confirmado, Id_Evento, Codigo) VALUES(2,'" . $familia . "', false, 1, '" . $codigoFam . "');";
        $result = $this->query($sqlFam);
        $ultimoId = $this->conn->lastInsertId(); // Obtener el último ID insertado
        var_dump($ultimoId);
        
        var_dump($result);
      }
      // echo  dirname(dirname(__DIR__));
    } catch (PDOException $e) {
      echo "Error en la consulta: " . $e->getMessage();
      return false;
    }
  }
}
