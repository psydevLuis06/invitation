<?php
// require_once '/home/invitation/connections/db.php';
// require_once '../../../cnx/db.php';
require_once($_SERVER['DOCUMENT_ROOT'] . '/cnx/db.php');

// require_once('../../phpqrcode/qrlib.php');
// require_once($_SERVER['DOCUMENT_ROOT'] . '/phpqrcode/qrlib.php');

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
  // public function generarQrCode($code)
  // {
  //   var_dump("entro");
  //   $path = dirname(dirname(__DIR__))."/images/qrs/";
  //   $QrCode = $path . $code . ".png";
  //   QRcode::png($code, $QrCode, 'H', 4, 4);
  //   return $QrCode;
  // }

  public function callProcedure($procedureName, $params = array())
  {
    try {
      $sql = "CALL $procedureName(";
      $paramValues = array();
      foreach ($params as $param => $value) {
        $sql .= ":$param, ";
        $paramValues[":$param"] = $value;
      }
      $sql = rtrim($sql, ", ") . ")";
      $stmt = $this->conn->prepare($sql);
      $stmt->execute($paramValues);
      $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
      return $result;
    } catch (PDOException $e) {
      echo "Error en la consulta: " . $e->getMessage();
      return false;
    }
  }

  public function saveInvitados($familia, $invitados)
  {
    try {

      $codigoFam = $this->generarCodigo();
      // $qrCode = $this->generarQrCode($codigoFam);
      // var_dump($qrCode);
      // if (file_exists($qrCode)) {
        $sqlFam = "INSERT INTO Familia (Cantidad, Nombre, Confirmado, Id_Evento, Codigo) VALUES(2,'" . $familia . "', false, 1, '" . $codigoFam . "');";
        $result = $this->query($sqlFam);
        $ultimoId = $this->conn->lastInsertId(); // Obtener el último ID insertado
        var_dump($ultimoId);
        
        var_dump($result);
      // }
      // echo  dirname(dirname(__DIR__));
    } catch (PDOException $e) {
      echo "Error en la consulta: " . $e->getMessage();
      return false;
    }
  }

  public function getInvitaInfo($codigo){

    try {
      // $sqlCode = " CALL validar_codigo_entrada('".$codigo."') ";
      $result = $this->callProcedure('validar_codigo_entrada', array('codigo' => $codigo));
      return json_encode($result);
    } catch (PDOException $e) {
      echo "Error en la consulta: " . $e->getMessage();
    return json_encode(array('error' => $e->getMessage()));
    }
  }
}
