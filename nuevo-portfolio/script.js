/*Escroll automatico y suabe*/
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

/*añadir clase "activo" a los enlaces de navegación*/
function activarEnlaceAlScroll() {
  const enlaces = document.querySelectorAll('a[href^="#"]');

  const opciones = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5, // Cuando el 50% de la sección es visible
  };

  const observer = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      const seccionId = entrada.target.getAttribute("id");
      const enlaceEscritorio = document.querySelector(
        `nav.escritorio a[href="#${seccionId}"]`
      );
      const enlaceMovil = document.querySelector(
        `.enlaces a[href="#${seccionId}"]`
      );

      if (entrada.isIntersecting) {
        // Añadir clase activo al enlace de la sección visible
        enlaceEscritorio.classList.add("activo");
        enlaceMovil.classList.add("activo");
      } else {
        // Si la sección no está intersectando, quitar la clase activo del enlace
        enlaceEscritorio.classList.remove("activo");
        enlaceMovil.classList.remove("activo");
      }
    });
  }, opciones);

  // Observar todas las secciones con enlaces
  enlaces.forEach((enlace) => {
    const seccionId = enlace.getAttribute("href").substring(1);
    const seccion = document.getElementById(seccionId);
    if (seccion) {
      observer.observe(seccion);
    }
  });
}
// Llamar a la función cuando el DOM esté cargado
document.addEventListener("DOMContentLoaded", activarEnlaceAlScroll);

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

/*Añadir "oculto" a las flechas de scroll*/
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.id;
        const navItem = document.getElementById(`${id}F`);

        if (entry.isIntersecting) {
          navItem.classList.add("focus"); // Si la sección está visible, remueve la clase 'oculto'
        } else {
          navItem.classList.remove("focus"); // Si la sección no está visible, añade la clase 'oculto'
        }
      });
    },
    { threshold: 1.0 }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });
});
