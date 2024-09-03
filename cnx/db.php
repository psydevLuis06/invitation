
<?php
        // Replace these with your actual database credentials
        // $servername = "162.241.60.125";
        // $username = "bodaalex_root";
        // $password = 'nwE8?5$RB8@d';
        // $dbname = "bodaalex_prueba";
        $servername = "localhost";
        $username = "root";
        $password = '';
        $dbname = "invitacion";


// Conexión a la base de datos
try {
  $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
  // Establecer el modo de error a excepciones
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  // echo "Conexión correcta";
} catch(PDOException $e) {
  echo "Error en la conexión: " . $e->getMessage();
}

?>