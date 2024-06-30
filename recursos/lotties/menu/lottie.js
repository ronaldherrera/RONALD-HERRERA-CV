/* Control Lottie para el botón del menú */
document.addEventListener("DOMContentLoaded", function () {
  // Asegúrate de que esta ruta sea correcta
  var animationPath = "/recursos/lotties/menu/data.json";

  // Cargar la animación Lottie
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

  // Función para manejar el clic en el botón del menú
  document.getElementById("boton-menu").addEventListener("click", function () {
    var container = this;
    var enlaces = document.querySelectorAll(".enlaces.fondo, .enlaces");
    var totalFrames = animation.totalFrames;

    // Alternar la clase "abierto" en el contenedor y en los enlaces
    if (container.classList.contains("abierto")) {
      container.classList.remove("abierto");
      // Eliminar la clase "abierto" de todos los elementos seleccionados
      enlaces.forEach(function (enlace) {
        enlace.classList.remove("abierto");
      });
      // Reducir la velocidad de reproducción para cerrar el menú
      animation.setSpeed(animationSpeed);
      // Reproducir la animación desde el 100% al 0%
      animation.playSegments([totalFrames, 0], true);
    } else {
      container.classList.add("abierto");
      // Añadir la clase "abierto" a todos los elementos seleccionados
      enlaces.forEach(function (enlace) {
        enlace.classList.add("abierto");
      });
      // Aumentar la velocidad de reproducción para abrir el menú
      animation.setSpeed(animationSpeed);
      // Reproducir la animación desde el 0% al 100%
      animation.playSegments([0, totalFrames], true);
    }
  });
});
