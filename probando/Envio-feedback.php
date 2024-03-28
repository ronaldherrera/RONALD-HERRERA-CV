<?php
// Recoger los datos del formulario
$mensaje = $_POST['imput-home']; // El nombre del textarea del formulario

// Establecer la dirección de correo electrónico de destino
$destinatario = 'ronaldherrera3d@gmail.com';

// Establecer el asunto del correo electrónico
$asunto = 'Feedback desde el formulario de tu sitio web';

// Establecer la dirección de correo electrónico del remitente (debe ser una dirección válida en tu servidor)
$remitente = 'hola@ronaldherrera.es';

// Cabeceras del correo electrónico
$headers = "From: $remitente\r\n";
$headers .= "Reply-To: $remitente\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";

// Enviar el correo electrónico
if(mail($destinatario, $asunto, $mensaje, $headers)) {
    // Envío exitoso
    echo json_encode(array('status' => 'success'));
    http_response_code(200);
    echo json_encode($response);
} else {
    // Error en el envío
    echo json_encode(array('status' => 'error'));
    http_response_code(500);
    echo json_encode($response);
}
?>

