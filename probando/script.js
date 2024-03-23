document.getElementById("botonBurguer").addEventListener("click", function () {
  var marcoMenu = document.getElementById("marcoMenu");
  var enlacesMovil = document.getElementById("enlacesMovil");

  setTimeout(() => {
    this.classList.toggle("active");
  }, 50); // Añadimos un retraso pequeño antes de cambiar la clase

  if (this.classList.contains("active")) {
    // Abre el menú móvil escalando
    setTimeout(function () {
      enlacesMovil.style.transform = "scaleY(0)";
      setTimeout(function () {
        marcoMenu.style.transform = "scaleY(0)";
      }, 300);
    }, 100); // Retraso para que el marco del menú se abra primero
  } else {
    // Cierra el menú móvil escalando
    marcoMenu.style.transform = "scaleY(1)";
    setTimeout(function () {
      enlacesMovil.style.transform = "scaleY(1)";
    }, 300); // Retraso para que los enlaces del menú se cierren primero
  }
});
