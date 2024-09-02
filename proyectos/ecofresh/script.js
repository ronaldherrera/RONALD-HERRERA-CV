var animation = lottie.loadAnimation({
  container: document.getElementById("lottieCabecera"), // ID del contenedor
  renderer: "svg", // Renderizado en SVG
  loop: true, // Repetir animación
  autoplay: true, // Reproducir automáticamente
  path: "./Recursos/ANIMACION_LOGO_lottie.json", // Ruta al archivo JSON
});

// Seleccionamos todos los divs dentro de la sección "imagotipo"
const divs = document.querySelectorAll(".imagotipo div div");

// Añadimos un listener de clic a cada div
divs.forEach((div) => {
  div.addEventListener("click", function () {
    // Quitamos la clase 'activo' de todos los divs
    divs.forEach((d) => d.classList.remove("activo"));

    // Añadimos la clase 'activo' al div que fue clickeado
    this.classList.add("activo");
  });
});

const mostrarDiv = document.getElementById("mostrarDiv");
const mostrarIcono = document.getElementById("mostrarIcono");
const mostrarTexto = document.getElementById("mostrarTexto");
const variantesDiv = document.querySelector(".variantes");
const proporcionesDiv = document.querySelector(".proporciones");

mostrarDiv.addEventListener("click", () => {
  if (mostrarTexto.textContent === "Mostrar proporciones y area de seguridad") {
    mostrarTexto.textContent = "Ocultar proporciones y area de seguridad";
    mostrarIcono.textContent = "🙈";
    variantesDiv.style.display = "none";
    proporcionesDiv.style.display = "flex";
  } else {
    mostrarTexto.textContent = "Mostrar proporciones y area de seguridad";
    mostrarIcono.textContent = "👁️";
    variantesDiv.style.display = "flex";
    proporcionesDiv.style.display = "none";
  }
});

// Inicializar con variantes visibles y proporciones ocultas
variantesDiv.style.display = "flex";
proporcionesDiv.style.display = "none";
