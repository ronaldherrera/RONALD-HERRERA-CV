<?php
// config.php – Conexión con SQLite y creación de la tabla si no existe

try {
    // Ruta relativa al archivo SQLite
    $dbPath = __DIR__ . '/db/database.sqlite';

    // Asegura que la carpeta 'db' existe
    if (!is_dir(__DIR__ . '/db')) {
        mkdir(__DIR__ . '/db', 0777, true);
    }

    $db = new PDO('sqlite:' . $dbPath);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Crear tabla de usuarios si no existe
    $db->exec("CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        pais TEXT NOT NULL,
        edad INTEGER NOT NULL,
        nombre TEXT NOT NULL,
        correo TEXT NOT NULL UNIQUE,
        contrasena TEXT NOT NULL,
        creado_en DATETIME DEFAULT CURRENT_TIMESTAMP
    )");

} catch (PDOException $e) {
    die('Error al conectar con la base de datos: ' . $e->getMessage());
}
?>
