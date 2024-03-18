<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recibir el feedback desde el formulario
    $feedback = $_POST['feedback'];

    // Dirección de correo electrónico a la que se enviará el feedback
    $to = "ronaldcalzadilla31@gmail.com";

    // Asunto del correo electrónico
    $subject = "Feedback de la página web";

    // Contenido del correo electrónico
    $message = "Feedback recibido:\n\n" . $feedback;

    // Cabeceras del correo electrónico
    $headers = "From: hola@ronaldherrera.es" . "\r\n" .
        "Reply-To: hola@ronaldherrera.es" . "\r\n" .
        "X-Mailer: PHP/" . phpversion();

    // Enviar el correo electrónico
    if (mail($to, $subject, $message, $headers)) {
        http_response_code(200); // OK
    } else {
        http_response_code(500); // Error interno del servidor
    }
}
?>
