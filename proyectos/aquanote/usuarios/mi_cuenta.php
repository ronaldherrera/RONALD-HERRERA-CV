<?php
require_once '../config.php';
require_once '../inc/auth.php';
include '../inc/header.php';

$stmt = $db->prepare("SELECT * FROM usuarios WHERE id = ? LIMIT 1");
$stmt->execute([$_SESSION['usuario_id']]);
$usuario = $stmt->fetch(PDO::FETCH_ASSOC);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nuevo_nombre = trim($_POST['nombre'] ?? '');
    $nuevo_correo = trim($_POST['correo'] ?? '');
    $nueva_contrasena = $_POST['nueva_contrasena'] ?? '';

    if (!empty($nuevo_nombre) && !empty($nuevo_correo)) {
        $stmt = $db->prepare("UPDATE usuarios SET nombre = ?, correo = ? WHERE id = ?");
        $stmt->execute([$nuevo_nombre, $nuevo_correo, $_SESSION['usuario_id']]);
        
        if (!empty($nueva_contrasena)) {
            $hash = password_hash($nueva_contrasena, PASSWORD_DEFAULT);
            $stmt = $db->prepare("UPDATE usuarios SET contrasena = ? WHERE id = ?");
            $stmt->execute([$hash, $_SESSION['usuario_id']]);
        }

        header("Location: ../index.php");
        exit;
    }
}
?>

<main class="mi-cuenta">
  <a href="../index.php" class="boton-secundario" style="margin-left: 1em;">Volver sin actualizar</a>
    <h1>Mi Cuenta</h1>

    <form method="POST" action="../index.php" style="display:inline;">
        <label>Nombre:
            <input type="text" name="nombre" value="<?= htmlspecialchars($usuario['nombre']) ?>" required>
        </label>

        <label>Correo electrónico:
            <input type="email" name="correo" value="<?= htmlspecialchars($usuario['correo']) ?>" required>
        </label>

        <label>Nueva contraseña:
            <input type="password" name="nueva_contrasena" placeholder="Solo si deseas cambiarla">
        </label>

        <button type="submit">Actualizar datos</button>
    </form>

    <hr>
    <form method="POST" action="../logout.php" style="display:inline;">
        <button type="submit">Cerrar sesión</button>
    </form>

    <form method="POST" action="eliminar_cuenta.php" onsubmit="return confirm('¿Seguro que quieres eliminar tu cuenta? Esta acción no se puede deshacer.');" style="display:inline; margin-left: 10px;">
        <button type="submit" style="background:red;color:white;">Eliminar cuenta</button>
    </form>
</main>

<?php include '../inc/footer.php'; ?>
