//las lineas de footer siguen al raton
document.addEventListener("mousemove", function (event) {
  var mouseX = event.clientX;
  var mouseY = event.clientY;
  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;
  var translateX = (mouseX / windowWidth - 0.5) * 200;
  var translateY = (mouseY / windowHeight - 0.5) * 200;

  document.querySelector(".linea-naranja-contacto").style.transform =
    "translateX(" + translateX + "px)";
  document.querySelector(".linea-azul-contacto").style.transform =
    "translateX(" + -translateX + "px)";
  document.querySelector(".linea-amarilla-contacto").style.transform =
    "translatex(" + translateY + "px)";
});

//las lineas del footer se mueven con el scroll aleatoriamente en dispositivos moviles y tablets
window.addEventListener("scroll", function () {
  var scrolled = window.scrollY;
  var velocidadAzul = 0.02; // Ajusta la velocidad del movimiento azul
  var velocidadNaranja = -0.2; // Ajusta la velocidad del movimiento naranja
  var velocidadAmarilla = -0.08; // Ajusta la velocidad del movimiento amarillo

  var azul = document.querySelector(".linea-azul-contacto");
  var naranja = document.querySelector(".linea-naranja-contacto");
  var amarilla = document.querySelector(".linea-amarilla-contacto");

  azul.style.transform = "translateX(" + scrolled * velocidadAzul + "px)";
  naranja.style.transform = "translateX(" + scrolled * velocidadNaranja + "px)";
  amarilla.style.transform =
    "translateX(" + scrolled * velocidadAmarilla + "px)";
});

/////////
///////////////////////////////////////////////
document.getElementById("backLink").addEventListener("click", function (event) {
  event.preventDefault(); // Prevenir el comportamiento predeterminado del enlace
  history.back(); // Volver a la página anterior
});
