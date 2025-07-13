<?php
require_once '../config.php';
require_once '../inc/auth.php';
include '../inc/header.php';

// Lista de parámetros posibles
$parametros_disponibles = [
    'temperatura', 'salinidad', 'ph', 'kh', 'gh',
    'nh4', 'no2', 'no3', 'po4', 'ca', 'mg', 'fe', 'densidad', 'oxigeno'
];

// Consulta previa si ya tiene configurado su acuario
$stmt = $db->prepare("SELECT * FROM acuarios WHERE usuario_id = ? LIMIT 1");
$stmt->execute([$_SESSION['usuario_id']]);
$acuario = $stmt->fetch(PDO::FETCH_ASSOC);

// Si viene del formulario (POST)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = trim($_POST['nombre'] ?? '');
    $tipo = $_POST['tipo'] ?? '';
    $volumen = trim($_POST['volumen'] ?? '');
    $fecha_inicio = $_POST['fecha_inicio'] ?? '';
    $notas = trim($_POST['notas'] ?? '');
    $parametros = $_POST['parametros'] ?? [];
    $parametros_json = json_encode($parametros);

    if ($acuario) {
        // Update
        $stmt = $db->prepare("UPDATE acuarios SET nombre = ?, tipo = ?, volumen = ?, fecha_inicio = ?, notas = ?, parametros = ? WHERE id = ?");
        $stmt->execute([$nombre, $tipo, $volumen, $fecha_inicio, $notas, $parametros_json, $acuario['id']]);
    } else {
        // Insert
        $stmt = $db->prepare("INSERT INTO acuarios (usuario_id, nombre, tipo, volumen, fecha_inicio, notas, parametros) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([$_SESSION['usuario_id'], $nombre, $tipo, $volumen, $fecha_inicio, $notas, $parametros_json]);
    }

    header("Location: mi_acuario.php");
    exit;
}

// Valores preexistentes si ya ha rellenado
$nombre = $acuario['nombre'] ?? '';
$tipo = $acuario['tipo'] ?? '';
$volumen = $acuario['volumen'] ?? '';
$fecha_inicio = $acuario['fecha_inicio'] ?? '';
$notas = $acuario['notas'] ?? '';
$parametros_seleccionados = $acuario ? json_decode($acuario['parametros'], true) : [];
?>

<main class="configuracion">
    <h1>Mi Acuario</h1>
    <form method="POST">
        <label>Nombre del acuario:
            <input type="text" name="nombre" value="<?= htmlspecialchars($nombre) ?>" required>
        </label>

        <label>Tipo:
            <select name="tipo" required>
                <option value="">-- Selecciona --</option>
                <option value="marino" <?= $tipo === 'marino' ? 'selected' : '' ?>>Marino</option>
                <option value="dulce" <?= $tipo === 'dulce' ? 'selected' : '' ?>>Agua dulce</option>
                <option value="plantado" <?= $tipo === 'plantado' ? 'selected' : '' ?>>Plantado</option>
                <option value="otro" <?= $tipo === 'otro' ? 'selected' : '' ?>>Otro</option>
            </select>
        </label>

        <label>Volumen / tamaño:
            <input type="text" name="volumen" value="<?= htmlspecialchars($volumen) ?>">
        </label>

        <label>Fecha de inicio:
            <input type="date" name="fecha_inicio" value="<?= htmlspecialchars($fecha_inicio) ?>">
        </label>

        <label>Notas:
            <textarea name="notas" rows="3"><?= htmlspecialchars($notas) ?></textarea>
        </label>

        <fieldset>
            <legend>¿Qué parámetros quieres registrar?</legend>
            <?php foreach ($parametros_disponibles as $param): ?>
                <label style="display:inline-block; width: 140px">
                    <input type="checkbox" name="parametros[]" value="<?= $param ?>" <?= in_array($param, $parametros_seleccionados) ? 'checked' : '' ?>>
                    <?= strtoupper($param) ?>
                </label>
            <?php endforeach; ?>
        </fieldset>

        <button type="submit">Guardar</button>
    </form>
</main>

<?php include '../inc/footer.php'; ?>

