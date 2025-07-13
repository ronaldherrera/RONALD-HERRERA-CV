<?php
require_once 'config.php';
session_start();

$errores = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $correo = trim($_POST['correo'] ?? '');
    $contrasena = $_POST['contrasena'] ?? '';

    if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
        $errores[] = 'Correo electrónico no válido';
    }

    if (empty($contrasena)) {
        $errores[] = 'Debes introducir tu contraseña';
    }

    if (empty($errores)) {
        $stmt = $db->prepare("SELECT * FROM usuarios WHERE correo = ?");
        $stmt->execute([$correo]);
        $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($usuario && password_verify($contrasena, $usuario['contrasena'])) {
            $_SESSION['usuario_id'] = $usuario['id'];
            $_SESSION['usuario_nombre'] = $usuario['nombre'];
            header("Location: index.php");
            exit;
        } else {
            $errores[] = 'Correo o contraseña incorrectos';
        }
    }
}
?>

<?php include 'inc/header.php'; ?>
<main class="login">
    <h1>Iniciar sesión</h1>

    <?php if (!empty($errores)): ?>
        <ul class="errores">
            <?php foreach ($errores as $error): ?>
                <li><?= htmlspecialchars($error) ?></li>
            <?php endforeach; ?>
        </ul>
    <?php endif; ?>

    <form method="POST" action="./index.php">
        <label>Correo electrónico:
            <input type="email" name="correo" required>
        </label>
        <label>Contraseña:
            <input type="password" name="contrasena" required>
        </label>
        <button type="submit">Entrar</button>
    </form>
    <p class="enlace-registro">¿No tienes cuenta? <a href="registro.php">Regístrate aquí</a></p>
</main>
<?php include 'inc/footer.php'; ?>
