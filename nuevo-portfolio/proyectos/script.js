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

/*Abrir/cerrar modal del proyecto*/
// Selecciona el botón para ver el proyecto y el modal
const verProyectoBtn = document.getElementById("verProyecto");
const modalProyecto = document.querySelector(".modal-proyecto");
const cerrarModalBtn = document.querySelector(".cerrar-modal");

// Función para mostrar el modal
verProyectoBtn.addEventListener("click", () => {
  modalProyecto.classList.remove("oculto");
});

// Función para ocultar el modal
cerrarModalBtn.addEventListener("click", () => {
  modalProyecto.classList.add("oculto");
});
