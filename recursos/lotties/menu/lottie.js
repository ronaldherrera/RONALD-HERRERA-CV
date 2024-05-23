/*control lottie boton-menu*/
document.addEventListener("DOMContentLoaded", function () {
  // Asegúrate de que esta ruta sea correcta
  var animationPath = "/recursos/lotties/menu/data.json";

  // Verificar si la animación se carga correctamente
  var animation = lottie.loadAnimation({
    container: document.getElementById("boton-menu"),
    renderer: "svg",
    loop: false,
    autoplay: false,
    path: animationPath,
  });

  // Mostrar errores en la carga de la animación
  animation.addEventListener("data_failed", function () {
    console.error("No se pudo cargar la animación Lottie desde", animationPath);
  });

  // Definir la velocidad de reproducción inicial
  var animationSpeed = 2.0;

  // Función para manejar el clic
  document.getElementById("boton-menu").addEventListener("click", function () {
    var container = this;
    var enlaces = document.querySelector(".enlaces");
    var totalFrames = animation.totalFrames;

    // Cambiar la velocidad de reproducción y la duración de la animación según el estado del contenedor
    if (container.classList.contains("abierto")) {
      container.classList.remove("abierto");
      enlaces.classList.remove("abierto");
      // Reducir la velocidad de reproducción
      animation.setSpeed(animationSpeed);
      // Reproducir la animación desde el 100% al 0%
      animation.playSegments([totalFrames * 1.0, totalFrames * 0.0], true);
    } else {
      container.classList.add("abierto");
      enlaces.classList.add("abierto");
      // Aumentar la velocidad de reproducción
      animation.setSpeed(animationSpeed); // Doble velocidad, puedes ajustar según tu preferencia
      // Reproducir la animación desde el 0% al 100%
      animation.playSegments([totalFrames * 0.0, totalFrames * 1.0], true);
    }
  });
});
