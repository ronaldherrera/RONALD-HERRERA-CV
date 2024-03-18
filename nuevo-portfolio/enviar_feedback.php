<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $correo_destino = "ronaldherrera3d@gmail.com";
    $asunto = "Feedback de sitio web";
    $mensaje = $_POST['imput-home'];
    
    // Encabezados
    $headers = "From: feedback@tusitio.com" . "\r\n" .
               "Reply-To: feedback@tusitio.com" . "\r\n" .
               "X-Mailer: PHP/" . phpversion();
    
    // Enviamos el correo
    if (mail($correo_destino, $asunto, $mensaje, $headers)) {
        echo '<div class="success-message w-form-done">
                <div class="text-block-10">
                  ¡Gracias! Tu comentario me ayudará a mejorar, lo tendré en cuenta para mi próxima versión del sitio.
                </div>
              </div>';
    } else {
        echo '<div class="error-message w-form-fail">
                <div class="text-block-9">
                  ¡Oops! Algo ha ido mal, vuelve a intentarlo más tarde.
                </div>
              </div>';
    }
}
?>
