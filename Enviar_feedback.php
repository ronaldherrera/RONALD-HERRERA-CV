<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $message = $_POST["message"];
    
    $to = "ronaldcalzadilla31@gmail.com"; 
    $subject = "FEEDBACK cV web";
    $body = "$message";

    // Configurar cabeceras para el correo electrónico
    $headers = "From: hola@ronaldherrera.es";

    // Enviar el correo electrónico
    if (mail($to, $subject, $body, $headers)) {
        $response = array("status" => "success", "message" => "¡Gracias!🧡Feedback enviado.");
        http_response_code(200);
        echo json_encode($response);
    } else {
        $response = array("status" => "error", "message" => "💔 Hubo un problema al enviar el feedback.");
        http_response_code(500);
        echo json_encode($response);
    }
} else {
    http_response_code(403);
    echo "Hubo un problema al enviar el formulario.";
}
?>

