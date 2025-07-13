<?php
$host = 'srv1230.hstgr.io';
$dbname = 'u656964704_Aquanote';
$user = 'u656964704_hola';
$pass = '7HolaRonald*'; // ojo con el carácter especial, debe estar bien escapado si lo usas

try {
    $db = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $user, $pass);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "✅ Conexión exitosa a la base de datos.";
} catch (PDOException $e) {
    echo "❌ Error: " . $e->getMessage();
}
?>
