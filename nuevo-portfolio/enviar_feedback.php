<?php
// Verificar si el método de solicitud es POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Dirección de correo a la que se enviará el feedback
    $to = "ronaldherrera3d@gmail.com";
    // Asunto del correo
    $subject = "Feedback de tu sitio web";
    // Mensaje del correo, obtenido del textarea del formulario
    $message = $_POST['imput-home'];
    // Encabezados del correo
    $headers = "From: hola@ronalherrera.es";

    // Intentar enviar el correo
    if (mail($to, $subject, $message, $headers)) {
        // Si se envía correctamente, devolver un JSON con éxito verdadero
        echo json_encode(array("success" => true));
    } else {
        // Si hay un error al enviar, devolver un JSON con éxito falso
        echo json_encode(array("success" => false));
    }
} else {
    // Si se accede directamente al archivo PHP, redirigir al inicio
    header("Location: /");
}
?>
