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
        `nav.movil a[href="#${seccionId}"]`
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
