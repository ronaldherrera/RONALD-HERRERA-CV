<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "ronaldherrera3d@gmail.com";
    $subject = "Feedback de tu sitio web: " . $_POST['data-name'];
    $message = $_POST['imput-home'];
    $headers = "From: hola@ronalherrera.es";

    if (mail($to, $subject, $message, $headers)) {
        echo json_encode(array("success" => true));
    } else {
        echo json_encode(array("success" => false));
    }
} else {
    header("Location: /"); // Redirigir al inicio si se accede directamente al archivo PHP
    exit;
}
?>

