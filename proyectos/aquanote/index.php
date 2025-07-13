<?php
require_once 'inc/auth.php';
include 'inc/header.php';
?>

<main class="dashboard">
    <h1>Bienvenido, <?= htmlspecialchars($_SESSION['usuario']) ?> 👋</h1>
    <p>Este será tu panel de control de Acuario. Aquí verás tus últimos registros y tareas pendientes.</p>
    <a href="logout.php">Cerrar sesión</a>
</main>

<?php include 'inc/footer.php'; ?>
