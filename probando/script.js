document.getElementById("botonBurguer").addEventListener("click", function () {
  var marcoMenu = document.getElementById("marcoMenu");
  var enlacesMovil = document.getElementById("enlacesMovil");
  var fondoEnlancesMovil = document.getElementById("fondoEnlancesMovil");

  setTimeout(() => {
    this.classList.toggle("active");
  }, 50); // Añadimos un retraso pequeño antes de cambiar la clase

  if (this.classList.contains("active")) {
    // Abre el menú móvil escalando
    setTimeout(function () {
      enlacesMovil.style.transform = "scale(0)";
      fondoEnlancesMovil.style.transform = "scale(0)";
      setTimeout(function () {
        marcoMenu.style.transform = "scale(0)";
      }, 300);
    }, 100); // Retraso para que el marco del menú se abra primero
  } else {
    // Cierra el menú móvil escalando
    marcoMenu.style.transform = "scale(1)";
    setTimeout(function () {
      enlacesMovil.style.transform = "scale(1)";
      fondoEnlancesMovil.style.transform = "scale(1)";
    }, 300); // Retraso para que los enlaces del menú se cierren primero
  }
});

// Agregar evento de clic para el fondo de enlaces móvil
document
  .getElementById("fondoEnlancesMovil")
  .addEventListener("click", function () {
    // Revertir el estado del botón burger y del menú
    document.getElementById("botonBurguer").classList.remove("active");
    document.getElementById("marcoMenu").style.transform = "scale(0)";
    document.getElementById("enlacesMovil").style.transform = "scale(0)";
    this.style.transform = "scale(0)";
  });

// Agregar evento de clic para cada enlace del menú móvil
var enlaces = document.querySelectorAll("#enlacesMovil a");
enlaces.forEach(function (enlace) {
  enlace.addEventListener("click", function () {
    // Revertir el estado del botón burger y del menú
    document.getElementById("botonBurguer").classList.remove("active");
    document.getElementById("marcoMenu").style.transform = "scale(0)";
    document.getElementById("enlacesMovil").style.transform = "scale(0)";
    document.getElementById("fondoEnlancesMovil").style.transform = "scale(0)";
  });
});

/////////
document.addEventListener("DOMContentLoaded", function () {
  const isMobile = window.matchMedia("(max-width: 890px)").matches;
  const lines = document.querySelectorAll(".animated-line");

  if (!isMobile) {
    document.addEventListener("mousemove", function (e) {
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;

      lines.forEach((line) => {
        const moveAmount = line.getAttribute("data-move-amount");
        const moveX = (mouseX - 0.5) * moveAmount;
        const moveY = (mouseY - 0.5) * moveAmount;
        line.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    });
  } else {
    document.addEventListener("scroll", function () {
      const scrollY = window.scrollY;

      lines.forEach((line) => {
        const scrollAmount = line.getAttribute("data-scroll-amount");
        const translateY = scrollY * scrollAmount;
        line.style.transform = `translateY(${translateY}px)`;
      });
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const graficoFondo = document.querySelector(".grafico-fondo-proyecto");

  document.addEventListener("mousemove", function (e) {
    const mouseX = e.clientX;
    const windowWidth = window.innerWidth;
    const percentX = (mouseX / windowWidth) * 100;
    const offset = (percentX - 50) * 10; // Ajusta la velocidad del movimiento cambiando el valor multiplicativo

    graficoFondo.style.transform = `translateX(${offset}px)`;
  });
});

//////////
window.addEventListener("scroll", function () {
  var scrollY = window.scrollY;

  document.querySelectorAll(".aro").forEach(function (aro) {
    var speed = parseInt(aro.classList[1].split("_")[1]);
    var offset = scrollY * speed * 0.04;
    aro.style.top = 234 + offset + "px"; // Cambio de dirección: + en lugar de -
  });
});

////////////////
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
// Función para generar un número aleatorio entre un rango
function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

// Función para aplicar transformaciones aleatorias a las líneas en el eje X
function applyRandomTransform() {
  var translateX1 = getRandomNumber(-10, 10);
  var translateX2 = getRandomNumber(-10, 10);

  document.querySelector(".linea-naranja-contacto").style.transform =
    "translateX(" + translateX1 + "px)";
  document.querySelector(".linea-azul-contacto").style.transform =
    "translateX(" + translateX2 + "px)";
}

// Verificar si el dispositivo es un dispositivo móvil o una tablet
function isMobileOrTablet() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

// Escuchar el evento de scroll y aplicar transformaciones aleatorias en dispositivos móviles y tablets
if (isMobileOrTablet()) {
  window.addEventListener("scroll", function () {
    applyRandomTransform();
  });
}
