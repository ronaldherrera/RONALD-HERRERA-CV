<?php
// config.php – Conexión con SQLite y configuración general

try {
    $db = new PDO('sqlite:' . __DIR__ . '/db/database.sqlite');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Error al conectar con la base de datos: " . $e->getMessage());
}

// Crear tabla de usuarios si no existe
$db->exec("CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    contraseña TEXT NOT NULL,
    creado_en DATETIME DEFAULT CURRENT_TIMESTAMP
)");

// Crear tabla de acuarios si no existe
$db->exec("
    CREATE TABLE IF NOT EXISTS acuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario_id INTEGER NOT NULL,
        nombre TEXT NOT NULL,
        tipo TEXT NOT NULL,
        volumen TEXT,
        fecha_inicio TEXT,
        notas TEXT,
        parametros TEXT,
        creado_en DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(usuario_id) REFERENCES usuarios(id)
    )
");
