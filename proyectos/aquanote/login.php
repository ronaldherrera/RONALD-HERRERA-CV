<?php
require_once 'config.php';
session_start();

$errores = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errores[] = 'Email no válido';
    if ($password === '') $errores[] = 'Contraseña requerida';

    if (empty($errores)) {
        $stmt = $db->prepare('SELECT * FROM usuarios WHERE email = ?');
        $stmt->execute([$email]);
        $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($usuario && password_verify($password, $usuario['contraseña'])) {
            $_SESSION['usuario'] = $usuario['nombre'];
            $_SESSION['usuario_id'] = $usuario['id'];
            header('Location: index.php');
            exit;
        } else {
            $errores[] = 'Credenciales incorrectas';
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

    <form method="POST" action=".//index.php">
        <label>Email:
            <input type="email" name="email" required>
        </label>
        <label>Contraseña:
            <input type="password" name="password" required>
        </label>
        <button type="submit">Entrar</button>
    </form>
    <p class="enlace-registro">¿No tienes cuenta? <a href="registro.php">Regístrate aquí</a></p>
</main>
<?php include 'inc/footer.php'; ?>
