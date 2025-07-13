<?php
require_once '../config.php';
require_once '../inc/auth.php';
include '../inc/header.php';

// Lista de parámetros posibles con iconos y descripciones personalizados
$parametros_info = [
    'Temperatura' => ['🌡️', 'Mantiene estables las condiciones vitales de los organismos acuáticos.'],
    'pH' => ['🧪', 'Nivel de acidez/alcalinidad del agua, afecta directamente a la salud de peces y plantas.'],
    'KH' => ['🛡️', 'Capacidad tampón del agua, ayuda a estabilizar el pH.'],
    'GH' => ['🧱', 'Dureza general del agua, importante para especies específicas.'],
    'NO₂ (Nitritos)' => ['🚫', 'Compuesto tóxico, indicador de problemas biológicos.'],
    'NO₃ (Nitratos)' => ['⚠️', 'Altos niveles afectan la salud a largo plazo.'],
    'NH₃ / NH₄ (Amoniaco)' => ['☠️', 'Altamente tóxico, señal de desequilibrio.'],
    'Cambio de agua' => ['💧', 'Registro de la última renovación parcial del agua.'],
    'Limpieza de filtro' => ['🧽', 'Control de mantenimiento del sistema de filtrado.'],
    'Salinidad / Densidad' => ['🌊', 'Nivel de sal en acuarios marinos, esencial para especies marinas.'],
    'Calcio (Ca)' => ['🪨', 'Necesario para corales y esqueletos duros.'],
    'Magnesio (Mg)' => ['🧲', 'Regula el calcio, mantiene estabilidad.'],
    'Alcalinidad' => ['🧪', 'Equilibra el pH, evita oscilaciones bruscas.'],
    'CO₂' => ['🫧', 'Fundamental en acuarios plantados para la fotosíntesis.'],
    'Hierro (Fe)' => ['🧪', 'Nutriente clave para el crecimiento de plantas.'],
    'Fosfatos (PO₄)' => ['🧪', 'Controlar para evitar algas o carencias.'],
    'Potasio (K)' => ['⚡', 'Otro nutriente esencial para plantas saludables.'],
    'Parámetros de cría' => ['🍼', 'Seguimiento de huevos, larvas, alimentación, etc.']
];

$parametros_disponibles = array_keys($parametros_info);

$presets = [
    'agua_dulce_comunitario' => ["Temperatura", "pH", "KH", "GH", "NO₂ (Nitritos)", "NO₃ (Nitratos)", "NH₃ / NH₄ (Amoniaco)", "Cambio de agua", "Limpieza de filtro"],
    'plantado' => ["Temperatura", "pH", "KH", "GH", "NO₂ (Nitritos)", "NO₃ (Nitratos)", "CO₂", "Hierro (Fe)", "Fosfatos (PO₄)", "Potasio (K)", "Cambio de agua", "Limpieza de filtro"],
    'ciclidos_africanos' => ["Temperatura", "pH", "KH", "GH", "NO₂ (Nitritos)", "NO₃ (Nitratos)", "NH₃ / NH₄ (Amoniaco)", "Cambio de agua", "Limpieza de filtro"],
    'marino_peces' => ["Temperatura", "pH", "Salinidad / Densidad", "NO₂ (Nitritos)", "NO₃ (Nitratos)", "NH₃ / NH₄ (Amoniaco)", "Cambio de agua", "Limpieza de filtro"],
    'marino_peces+roca' => ["Temperatura", "pH", "Salinidad / Densidad", "Calcio (Ca)", "Magnesio (Mg)", "Alcalinidad", "NO₂ (Nitritos)", "NO₃ (Nitratos)", "NH₃ / NH₄ (Amoniaco)", "Cambio de agua", "Limpieza de filtro"],
    'marino_corales+peces' => ["Temperatura", "pH", "Salinidad / Densidad", "Calcio (Ca)", "Magnesio (Mg)", "Alcalinidad", "NO₂ (Nitritos)", "NO₃ (Nitratos)", "NH₃ / NH₄ (Amoniaco)", "Cambio de agua", "Limpieza de filtro"],
    'cria/cuarentena' => ["Temperatura", "pH", "NO₂ (Nitritos)", "NO₃ (Nitratos)", "NH₃ / NH₄ (Amoniaco)", "Cambio de agua", "Parámetros de cría"],
    'otro/personalizado' => []
];

$stmt = $db->prepare("SELECT * FROM acuarios WHERE usuario_id = ? LIMIT 1");
$stmt->execute([$_SESSION['usuario_id']]);
$acuario = $stmt->fetch(PDO::FETCH_ASSOC);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = trim($_POST['nombre'] ?? '');
    $tipo = $_POST['tipo'] ?? '';
    $volumen = trim($_POST['volumen'] ?? '');
    $fecha_inicio = $_POST['fecha_inicio'] ?? '';
    $notas = trim($_POST['notas'] ?? '');
    $parametros = $_POST['parametros'] ?? [];
    $parametros_json = json_encode($parametros);

    if ($acuario) {
        $stmt = $db->prepare("UPDATE acuarios SET nombre = ?, tipo = ?, volumen = ?, fecha_inicio = ?, notas = ?, parametros = ? WHERE id = ?");
        $stmt->execute([$nombre, $tipo, $volumen, $fecha_inicio, $notas, $parametros_json, $acuario['id']]);
    } else {
        $stmt = $db->prepare("INSERT INTO acuarios (usuario_id, nombre, tipo, volumen, fecha_inicio, notas, parametros) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([$_SESSION['usuario_id'], $nombre, $tipo, $volumen, $fecha_inicio, $notas, $parametros_json]);
    }

    header("Location: mi_acuario.php");
    exit;
}

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
            <select name="tipo" id="tipo-acuario" required>
                <option value="">-- Selecciona --</option>
                <?php foreach ($presets as $clave => $valores): ?>
                    <option value="<?= $clave ?>" <?= $tipo === $clave ? 'selected' : '' ?>><?= ucfirst(str_replace('_', ' ', $clave)) ?></option>
                <?php endforeach; ?>
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
            <div id="parametros-lista">
                <?php foreach ($parametros_disponibles as $param): 
                    $icono = $parametros_info[$param][0] ?? '🔘';
                    $desc  = $parametros_info[$param][1] ?? ucfirst($param);
                ?>
                    <label style="display:inline-block; width: 260px; margin-bottom: 8px;">
                        <input type="checkbox" name="parametros[]" value="<?= $param ?>" <?= in_array($param, $parametros_seleccionados) ? 'checked' : '' ?>>
                        <?= $icono ?> <strong><?= $param ?></strong><br><small style="opacity:0.7; font-size: 0.85em;"><?= $desc ?></small>
                    </label>
                <?php endforeach; ?>
            </div>
            <button type="button" id="reset-parametros" style="display:none; margin-top:10px;">🔄 Restablecer selección</button>
        </fieldset>

        <button type="submit">Guardar</button>
    </form>
</main>

<script>
const presets = <?= json_encode($presets) ?>;

const tipoSelect = document.getElementById('tipo-acuario');
const checkboxes = document.querySelectorAll('input[name="parametros[]"]');
const resetBtn = document.getElementById('reset-parametros');

let parametrosIniciales = Array.from(checkboxes).filter(c => c.checked).map(c => c.value);

function aplicarPreset(tipo) {
    if (presets[tipo]) {
        checkboxes.forEach(c => c.checked = presets[tipo].includes(c.value));
        resetBtn.style.display = 'none';
        parametrosIniciales = presets[tipo];
    }
}

tipoSelect.addEventListener('change', () => aplicarPreset(tipoSelect.value));

checkboxes.forEach(c => {
    c.addEventListener('change', () => {
        const actual = Array.from(checkboxes).filter(c => c.checked).map(c => c.value);
        resetBtn.style.display = JSON.stringify(actual.sort()) !== JSON.stringify(parametrosIniciales.sort()) ? 'inline-block' : 'none';
    });
});

resetBtn.addEventListener('click', () => aplicarPreset(tipoSelect.value));
</script>

<?php include '../inc/footer.php'; ?>
