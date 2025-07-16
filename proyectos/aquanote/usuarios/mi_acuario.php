.bloque-cabecer<?php
require_once '../config.php';
require_once '../inc/auth.php';
include '../inc/header.php';

// Lista de parámetros posibles con iconos y descripciones personalizados
$parametros_info = [
    'Temperatura' => ['🌡️', 'Mantiene estables las condiciones vitales de los organismos acuáticos.'],
    'pH 3.0–10.0' => ['🧪', '<strong>Potencial de hidrógeno</strong>, indica la acidez o alcalinidad del agua (rango completo).'],
    'pH 6.0–7.6' => ['🧪', '<strong>Potencial de hidrógeno</strong>, indica la acidez o alcalinidad del agua (rango medio).'],
    'pH 7.4–9.0' => ['🧪', '<strong>Potencial de hidrógeno</strong>, indica la acidez o alcalinidad del agua (rango alto).'],
    'KH' => ['🛡️', '<strong>Dureza de carbonatos</strong>, capacidad tampón del agua, ayuda a estabilizar el pH.'],
    'GH' => ['🧱', '<strong>Dureza general del agua</strong>, cantidad de sales de calcio y magnesio disueltas.'],
    'Ca' => ['🪨', '<strong>Calcio</strong>, esencial para corales, invertebrados y peces óseos.'],
    'Mg (Fresh water)' => ['🧲', '<strong>Magnesio</strong> en agua dulce, regula el calcio y favorece la salud vegetal.'],
    'Mg (Marine water)' => ['🧲', '<strong>Magnesio</strong> en acuarios marinos, mantiene la estabilidad del calcio y la alcalinidad.'],
    'PO₄ Sensitive' => ['🧪', '<strong>Fosfatos</strong> de baja concentración, útiles en acuarios plantados o comunitarios.'],
    'PO₄ Koi' => ['🧪', '<strong>Fosfatos</strong> de alta concentración, orientado a estanques o acuarios con gran carga biológica.'],
    'SiO₂' => ['🟠', '<strong>Silicatos</strong>, pueden favorecer la aparición de diatomeas si están elevados.'],
    'Fe' => ['🧲', '<strong>Hierro</strong>, nutriente esencial para el crecimiento saludable de las plantas.'],
    'K' => ['⚡', '<strong>Potasio</strong>, macronutriente fundamental en acuarios plantados.'],
    'Cu' => ['🧪', '<strong>Cobre</strong>, tóxico en exceso, se mide para controlar tratamientos o evitar dañar invertebrados.'],
    'O₂' => ['💨', '<strong>Oxígeno disuelto</strong>, vital para la respiración de peces, plantas y bacterias.'],
    'CO₂ Direct' => ['🮧', '<strong>Dióxido de carbono</strong>, medido directamente, importante para plantas acuáticas.'],
    'NH₄' => ['☠️', '<strong>Amoniaco/Amonio</strong>, altamente tóxico si no hay filtración biológica efectiva.'],
    'NO₂' => ['🚫', '<strong>Nitritos</strong>, compuestos tóxicos intermedios del ciclo del nitrógeno.'],
    'NO₃' => ['⚠️', '<strong>Nitratos</strong>, producto final del ciclo del nitrógeno. Menos tóxico, pero peligroso en exceso.'],
    'Cambio de agua' => ['💧', '<strong>Cambio de agua</strong>, registro de la última renovación parcial del agua.'],
    'Limpieza de filtro' => ['🧹', 'Control de mantenimiento del sistema de filtrado.'],
    'Limpieza de skimmer' => ['🫧', 'Control de limpieza del skimmer en acuarios marinos.'],
    'Salinidad / Densidad' => ['🌊', 'Nivel de sal en acuarios marinos, esencial para especies marinas.'],
    'Parámetros de cría' => ['🍼', 'Notas específicas para acuarios de cría o cuarentena: temperatura, alimentación, cuidados, etc.'],
];

$parametros_disponibles = array_keys($parametros_info);

$presets = [
    'agua_dulce_comunitario' => [
        "Temperatura",
        "pH 6.0–7.6",
        "KH",
        "GH",
        "NO₂",
        "NO₃",
        "NH₄",
        "Cambio de agua",
        "Limpieza de filtro"
    ],

    'plantado' => [
        "Temperatura",
        "pH 6.0–7.6",
        "KH",
        "GH",
        "NO₂",
        "NO₃",
        "CO₂ Direct",
        "Fe",
        "PO₄ Sensitive",
        "K",
        "Cambio de agua",
        "Limpieza de filtro"
    ],

    'ciclidos_africanos' => [
        "Temperatura",
        "pH 7.4–9.0",
        "KH",
        "GH",
        "NO₂",
        "NO₃",
        "NH₄",
        "Cambio de agua",
        "Limpieza de filtro"
    ],

    'marino_peces' => [
        "Temperatura",
        "pH 7.4–9.0",
        "Salinidad / Densidad",
        "NO₂",
        "NO₃",
        "NH₄",
        "Cambio de agua",
        "Limpieza de filtro",
        "Limpieza de skimmer"
    ],

    'marino_peces+roca' => [
        "Temperatura",
        "pH 7.4–9.0",
        "Salinidad / Densidad",
        "Ca",
        "Mg (Marine water)",
        "KH",
        "NO₂",
        "NO₃",
        "NH₄",
        "Cambio de agua",
        "Limpieza de filtro",
        "Limpieza de skimmer"
    ],

    'marino_corales+peces' => [
        "Temperatura",
        "pH 7.4–9.0",
        "Salinidad / Densidad",
        "Ca",
        "Mg (Marine water)",
        "KH",
        "NO₂",
        "NO₃",
        "NH₄",
        "CO₂ Direct",
        "Fe",
        "Cambio de agua",
        "Limpieza de filtro",
        "Limpieza de skimmer"
    ],

    'cria/cuarentena' => [
        "Temperatura",
        "pH 6.0–7.6",
        "NO₂",
        "NO₃",
        "NH₄",
        "Cambio de agua",
        "Parámetros de cría"
    ],

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

<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Iniciar sesión</title>
    <link rel="stylesheet" href="/proyectos/aquanote/css/style.css">
</head>
<body class="mi-acuario">
<main class="configuracion">
    <a href="../index.php" class="boton-secundario" style="margin-left: 1em;">Volver sin guardar</a>
    <h1>Mi Acuario</h1>
    <form method="POST">
        <div class="bloque-cabecera">
            <div class="descripcion">
                <div>
                <label>Nombre:
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
            </div>
           
                <div>
                <label>Volumen (litros):
                <input type="number" name="volumen" value="<?= htmlspecialchars($volumen) ?>" min="0" step="1" required>
            </label>
            <label>Inicio:
                <input type="date" name="fecha_inicio" value="<?= htmlspecialchars($fecha_inicio) ?>">
            </label>
            </div>
            </div>
            
            
            <label>Notas:
            <textarea name="notas" rows="3"><?= htmlspecialchars($notas) ?></textarea>
        </label>
            
        </div>
        

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
</body>
</html>

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
