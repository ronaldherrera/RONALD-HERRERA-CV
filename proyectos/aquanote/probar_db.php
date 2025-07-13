<?php
require_once 'config.php';

echo "<h2>Prueba de conexión y estructura de la base de datos</h2>";

// Comprobar si la tabla 'usuarios' existe y mostrar contenido
try {
    $resultado = $db->query("SELECT name FROM sqlite_master WHERE type='table' AND name='usuarios'");
    $existeTabla = $resultado->fetch();

    if ($existeTabla) {
        echo "✅ La tabla <strong>usuarios</strong> existe.<br>";

        // Mostrar contenido si existe
        $usuarios = $db->query("SELECT id, nombre, email, creado_en FROM usuarios");
        $fila = $usuarios->fetchAll(PDO::FETCH_ASSOC);

        if ($fila) {
            echo "<h3>Contenido actual:</h3><ul>";
            foreach ($fila as $usuario) {
                echo "<li>{$usuario['id']} - {$usuario['nombre']} ({$usuario['email']}) – {$usuario['creado_en']}</li>";
            }
            echo "</ul>";
        } else {
            echo "ℹ️ La tabla está vacía por ahora.";
        }

    } else {
        echo "❌ La tabla <strong>usuarios</strong> no existe. Revisa tu archivo <code>config.php</code> y asegúrate de que se ejecuta correctamente.";
    }
} catch (PDOException $e) {
    echo "❌ Error al consultar la base de datos: " . $e->getMessage();
}
