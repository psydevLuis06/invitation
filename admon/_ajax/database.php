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

  public function getInvitaInfo($codigo)
  {
    try {
      $result = $this->callProcedure('validar_codigo_entrada', array('codigo' => $codigo));
      return json_encode($result);
    } catch (PDOException $e) {
      echo "Error en la consulta: " . $e->getMessage();
      return json_encode(array('error' => $e->getMessage()));
    }
  }
  public function getInformationFromFamily($codigo)
  {
    try {
      $result = $this->callProcedure('buscar_integrantes', array('codigo' => $codigo));
      return json_encode($result);
    } catch (PDOException $e) {
      echo "Error en la consulta: " . $e->getMessage();
      return json_encode(array('error' => $e->getMessage()));
    }
  }

  public function actualizaEstatus($codigo, $nombre, $confirmacion)
  {
    try {
      // Create a new PDO statement
      $stmt = $this->conn->prepare("UPDATE integrantes_familia SET confirmacion = ? WHERE codigo = ? AND nombre = ?");

      // Bind the parameters to the statement
      $stmt->bindParam(1, $confirmacion);
      $stmt->bindParam(2, $codigo);
      $stmt->bindParam(3, $nombre);

      // Execute the statement
      $stmt->execute();

      // Return a success response as a JSON-encoded string
      return json_encode(array('success' => true));
    } catch (PDOException $e) {
      // Log the error message
      echo "Error en la consulta: " . $e->getMessage();

      // Return an error response as a JSON-encoded string
      return json_encode(array('error' => $e->getMessage()));
    }
  }

  public function concatenateArray($arr, $nombre, $app)
  {
    if (empty($arr)) return "";
    if (count($arr) === 1) return "{$arr[0][$nombre]} {$arr[0][$app]}";

    $result = "";
    for ($i = 0; $i < count($arr) - 1; $i++) {
      $result .= "{$arr[$i][$nombre]} {$arr[$i][$app]}";
      $result .= $i === count($arr) - 2 ? " y " : ", ";
    }
    $result .= "{$arr[count($arr) - 1][$nombre]} {$arr[count($arr) - 1][$app]}";

    return $result;
  }
}
