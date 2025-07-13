<?php
// ver_usuarios.php – Ver registros de la tabla usuarios

try {
    $db = new PDO('sqlite:' . __DIR__ . '/db/database.sqlite');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $db->query("SELECT * FROM usuarios");
    $usuarios = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo "<h2>Lista de usuarios registrados</h2>";

    if (count($usuarios) === 0) {
        echo "<p>❌ No hay usuarios en la base de datos.</p>";
    } else {
        echo "<table border='1' cellpadding='8'>";
        echo "<tr><th>ID</th><th>Nombre</th><th>Email</th><th>Contraseña (hash)</th><th>Creado en</th></tr>";
        foreach ($usuarios as $usuario) {
            echo "<tr>
                    <td>{$usuario['id']}</td>
                    <td>{$usuario['nombre']}</td>
                    <td>{$usuario['email']}</td>
                    <td>{$usuario['contraseña']}</td>
                    <td>{$usuario['creado_en']}</td>
                  </tr>";
        }
        echo "</table>";
    }

} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>
