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
