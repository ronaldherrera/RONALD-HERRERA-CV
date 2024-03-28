<?php
// Recoger los datos del formulario
$mensaje = $_POST["imput-home"]; // El nombre del textarea del formulario

// Establecer la dirección de correo electrónico de destino
$to = 'ronaldherrera3d@gmail.com';

// Establecer el asunto del correo electrónico
$asunto = 'Feedback desde el formulario de tu sitio web';

// Establecer el contenido del correo electrónico
$body = "$mensaje"

// Establecer la dirección de correo electrónico del remitente (debe ser una dirección válida en tu servidor)
$remitente = "From: hola@ronaldherrera.es";

// Cabeceras del correo electrónico
$headers = "From: $to\r\n";
$headers .= "Reply-To: $to\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";

// Enviar el correo electrónico
if(mail($to, $asunto, $body, $headers)) {
    // Envío exitoso
    echo json_encode(array('status' => 'success'));
} else {
    // Error en el envío
    echo json_encode(array('status' => 'error'));
}
?>
