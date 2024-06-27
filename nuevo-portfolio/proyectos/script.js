/*Escroll automatico y suabe*/
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

/*añadir clase "activo" a los puntos de scroll*/
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");
  const puntos = document.querySelectorAll(".puntos-scroll div");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const punto = document.querySelector(`#${entry.target.id}P`);
        if (entry.isIntersecting) {
          punto.classList.add("activo");
        } else {
          punto.classList.remove("activo");
        }
      });
    },
    { threshold: 0.5 }
  );

  sections.forEach((section) => observer.observe(section));
});

// Función para abrir un modal
function abrirModal(triggerId, modalClass) {
  const triggerElement = document.getElementById(triggerId);
  const modalElement = document.querySelector(`.modal-proyecto.${modalClass}`);
  const mainElement = document.querySelector("main"); // Selección del elemento main

  if (triggerElement && modalElement) {
    triggerElement.addEventListener("click", () => {
      modalElement.classList.remove("oculto");
      mainElement.classList.add("no-scroll"); // Agregar la clase al elemento main
    });
  }
}

// Función para cerrar un modal
function cerrarModal(closeClass, modalClass) {
  const closeElement = document.querySelector(`.cerrar-modal.${closeClass}`);
  const modalElement = document.querySelector(`.modal-proyecto.${modalClass}`);
  const mainElement = document.querySelector("main"); // Selección del elemento main

  if (closeElement && modalElement) {
    closeElement.addEventListener("click", () => {
      modalElement.classList.add("oculto");
      mainElement.classList.remove("no-scroll"); // Remover la clase del elemento main
    });
  }
}

// funcion para ajustar la altura del contenedor de la portada a la altura de la imagen
function ajustarAltura() {
  var img = document.querySelector(".portada img");
  var portada = document.querySelector(".portada");
  portada.style.height = img.offsetHeight + "px";
}

document.addEventListener("DOMContentLoaded", function () {
  var img = document.querySelector(".portada img");

  // Ajustar la altura después de que la imagen se haya cargado
  if (img.complete) {
    ajustarAltura();
  } else {
    img.onload = ajustarAltura;
  }

  // Ajustar la altura al cambiar el tamaño de la ventana
  window.addEventListener("resize", ajustarAltura);
});

//////////proyectos
//
// Abrir/cerrar modal de Subversum
abrirModal("verSubversum", "subversum");
cerrarModal("cerrar-subversum", "subversum");

// Abrir/cerrar modal de Imagym
abrirModal("verImagym", "imagym");
cerrarModal("cerrar-imagym", "imagym");

// Abrir/cerrar modal de Mahou
abrirModal("verMahou", "mahou");
cerrarModal("cerrar-mahou", "mahou");

//
/////////////fin proyectos

/*limpiar modal y scrol al recagar pagina*/
document.addEventListener("DOMContentLoaded", function () {
  const modalElements = document.querySelectorAll(".modal-proyecto");
  const mainElement = document.querySelector("main");

  // Ocultar todos los modales al cargar la página
  modalElements.forEach(function (modal) {
    modal.classList.add("oculto");
  });

  // Remover la clase no-scroll del main al cargar la página
  mainElement.classList.remove("no-scroll");
});
