<?php
require_once 'config.php';

$errores = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $pais = trim($_POST['pais'] ?? '');
    $edad = intval($_POST['edad'] ?? 0);
    $nombre = trim($_POST['nombre'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';
    $confirmar_password = $_POST['confirmar_password'] ?? '';

    // Validaciones básicas
    if ($pais === '') $errores[] = 'El país es obligatorio';
    if ($edad <= 0) $errores[] = 'La edad debe ser un número positivo';
    if ($nombre === '') $errores[] = 'El nombre es obligatorio';
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errores[] = 'Email no válido';
    if (strlen($password) < 6) $errores[] = 'La contraseña debe tener al menos 6 caracteres';
    if ($password !== $confirmar_password) $errores[] = 'Las contraseñas no coinciden';

    // Si no hay errores, registrar usuario
    if (empty($errores)) {
        $hash = password_hash($password, PASSWORD_DEFAULT);

        $stmt = $db->prepare('INSERT INTO usuarios (pais, edad, nombre, email, contraseña) VALUES (?, ?, ?, ?, ?)');
        try {
            $stmt->execute([$pais, $edad, $nombre, $email, $hash]);
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

    <form method="POST" action="./login.php">
        <label>País:
            <input type="text" name="pais" required>
        </label>
        <label>Edad:
            <input type="number" name="edad" min="1" required>
        </label>
        <label>Nombre:
            <input type="text" name="nombre" required>
        </label>
        <label>Email:
            <input type="email" name="email" required>
        </label>
        <label>Contraseña:
            <input type="password" name="password" required>
        </label>
        <label>Confirmar contraseña:
            <input type="password" name="confirmar_password" required>
        </label>
        <button type="submit">Registrarse</button>
    </form>
    <p class="enlace-login">¿Ya tienes cuenta? <a href="login.php">Inicia sesión aquí</a></p>
</main>
<?php include 'inc/footer.php'; ?>
