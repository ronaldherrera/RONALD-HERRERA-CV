<?php
$host = 'localhost';
$dbname = 'u656964704_aquanote';
$user = 'u656964704_root';
$pass = '7HolaRonald*';

try {
    $db = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $user, $pass);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "✅ Conexión exitosa a la base de datos.";
} catch (PDOException $e) {
    echo "❌ Error: " . $e->getMessage();
}
?>
