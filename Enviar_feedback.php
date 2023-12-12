<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $message = $_POST["message"];
    
    $to = "ronaldcalzadilla31@gmail.com"; 
    $subject = "FEEDBACK cV web";
    $body = "$message";

    // Configurar cabeceras para el correo electrónico
    $headers = "Feedback recibido";

    // Enviar el correo electrónico
    if (mail($to, $subject, $body, $headers)) {
        http_response_code(200);
        echo "¡Gracias! Tu mensaje ha sido enviado.";
    } else {
        http_response_code(500);
        echo "Hubo un problema al enviar el mensaje.";
    }
} else {
    http_response_code(403);
    echo "Hubo un problema al enviar el formulario.";
}
?>
