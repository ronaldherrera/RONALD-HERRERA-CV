<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $feedback = $_POST['imput-home'];
    $to = "ronaldherrera3d@gmail.com";
    $subject = "Feedback del sitio web";
    $message = "Feedback recibido:\n\n" . $feedback;
    $headers = "From: hola@ronaldherrera.es\r\n";
    $headers .= "Reply-To: hola@ronaldherrera.es\r\n";
    
    if (mail($to, $subject, $message, $headers)) {
        echo json_encode(array('success' => true));
    } else {
        echo json_encode(array('success' => false));
    }
}
?>
