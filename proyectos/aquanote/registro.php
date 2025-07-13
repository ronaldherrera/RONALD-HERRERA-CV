<?php
require_once 'config.php';

$errores = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = trim($_POST['nombre'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';

    // Validaciones básicas
    if ($nombre === '') $errores[] = 'El nombre es obligatorio';
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errores[] = 'Email no válido';
    if (strlen($password) < 6) $errores[] = 'La contraseña debe tener al menos 6 caracteres';

    // Si no hay errores, registrar usuario
    if (empty($errores)) {
        $hash = password_hash($password, PASSWORD_DEFAULT);

        $stmt = $db->prepare('INSERT INTO usuarios (nombre, email, contraseña) VALUES (?, ?, ?)');
        try {
            $stmt->execute([$nombre, $email, $hash]);
            header('Location: login.php');
            exit;
        } catch (PDOException $e) {
            $errores[] = 'El email ya está registrado';
        }
    }
}
?>

<?php include 'inc/header.php'; ?>
<main class="registro">
    <h1>Crear cuenta</h1>
    <?php if (!empty($errores)): ?>
        <ul class="errores">
            <?php foreach ($errores as $error): ?>
                <li><?= htmlspecialchars($error) ?></li>
            <?php endforeach; ?>
        </ul>
    <?php endif; ?>

    <form method="POST" action="">
        <label>Nombre:
            <input type="text" name="nombre" required>
        </label>
        <label>Email:
            <input type="email" name="email" required>
        </label>
        <label>Contraseña:
            <input type="password" name="password" required>
        </label>
        <button type="submit">Registrarse</button>
    </form>
    <p class="enlace-login">¿Ya tienes cuenta? <a href="login.php">Inicia sesión aquí</a></p>
</main>
<?php include 'inc/footer.php'; ?>
