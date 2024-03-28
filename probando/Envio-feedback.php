<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recoge los datos del formulario
    $feedback = $_POST['imput-home']; // Contenido del feedback

    // Dirección de correo electrónico a la que se enviará el feedback
    $to = "hola@ronaldherrera.es";

    // Asunto del correo
    $subject = "FORMULARIO DE LA HOME";

    // Cuerpo del correo
    $message = "Feedback recibido:\n\n";
    $message .= $feedback;

    // Cabeceras del correo
    $headers = "From: webmaster@example.com" . "\r\n" .
               "Reply-To: webmaster@example.com" . "\r\n" .
               "X-Mailer: PHP/" . phpversion();

    // Envía el correo
    if (mail($to, $subject, $message, $headers)) {
        // Si el correo se envía con éxito, muestra el mensaje de éxito
        echo json_encode(array('success' => true));
    } else {
        // Si hay un error en el envío del correo, muestra el mensaje de error
        echo json_encode(array('success' => false));
    }
} else {
    // Si no se accede mediante POST, muestra un error
    echo json_encode(array('success' => false));
}
?>
