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

      if (enlaceEscritorio && enlaceMovil) {
        if (entrada.isIntersecting) {
          enlaceEscritorio.classList.add("activo");
          enlaceMovil.classList.add("activo");
        } else {
          enlaceEscritorio.classList.remove("activo");
          enlaceMovil.classList.remove("activo");
        }
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

        if (navItem) {
          // Verifica si navItem no es null
          if (entry.isIntersecting) {
            navItem.classList.add("focus"); // Añade la clase 'focus' cuando la sección es visible
          } else {
            navItem.classList.remove("focus"); // Remueve la clase 'focus' cuando la sección no es visible
          }
        }
      });
    },
    { threshold: 1.0 } // Umbral de intersección al 100%
  );

  sections.forEach((section) => {
    observer.observe(section);
  });
});

////////////FUNCION PARA CARGAR EL IFRAME CUANDO SEA VISIBLE LA SECCION SKILLS//
/////

//FINCION PARA CARGAR IFRAME CUANDO CAMBIE EL TAMAÑO DE LA VENTANA//
document.addEventListener("DOMContentLoaded", function () {
  const iframe = document.getElementById("iframeSkills");
  const skillsSection = document.getElementById("skills");

  const reloadIframe = () => {
    iframe.src = iframe.src; // Forzar recarga del iframe
  };

  const loadIframeContent = () => {
    iframe.src = "./skills/index.html"; // Cambiar a la URL deseada
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        loadIframeContent();
        observer.unobserve(entry.target); // Dejar de observar una vez cargado el contenido
      }
    });
  });

  observer.observe(skillsSection);

  window.addEventListener("resize", reloadIframe);
});

/////////Con las siguiente funciones hago que se bloquee el scroll cuando interactúo dentro del iframe de la seccion skills
document.addEventListener("DOMContentLoaded", function () {
  var iframeSkills = document.getElementById("iframeSkills");
  var dispositivoTactil = "ontouchstart" in window || navigator.maxTouchPoints;

  // Función para deshabilitar el scroll de la página
  function deshabilitarScrollPagina() {
    document.body.style.overflow = "hidden";
  }

  // Función para habilitar el scroll de la página
  function habilitarScrollPagina() {
    document.body.style.overflow = "";
  }

  // Evento para detectar interacciones dentro del iframe
  iframeSkills.addEventListener("touchstart", function () {
    if (dispositivoTactil) {
      deshabilitarScrollPagina();
    }
  });

  // Evento para detectar cuando termina la interacción dentro del iframe
  iframeSkills.addEventListener("touchend", function () {
    habilitarScrollPagina();
  });

  // Evento adicional para asegurarse de habilitar el scroll si el usuario cancela la interacción
  iframeSkills.addEventListener("touchcancel", function () {
    habilitarScrollPagina();
  });
});

/////////Con las siguientesfunciones hago que aparezcan los controles de navegación en dispositivos tactiles
document.addEventListener("DOMContentLoaded", function () {
  var iframeSkills = document.getElementById("iframeSkills");
  var scrollArriba = document.querySelector(".scroll-arriba");
  var scrollAbajo = document.querySelector(".scroll-abajo");
  var dispositivoTactil = "ontouchstart" in window || navigator.maxTouchPoints;

  // Función para mostrar u ocultar los botones de subir y bajar
  function mostrarOcultarBotones() {
    if (dispositivoTactil) {
      scrollArriba.style.display = "block";
      scrollAbajo.style.display = "block";
    } else {
      scrollArriba.style.display = "none";
      scrollAbajo.style.display = "none";
      iframeSkills.style.height = "100vh"; // Ajusta la altura del iframe al 100% de la ventana
    }
  }

  // Llamar a la función al cargar la página
  mostrarOcultarBotones();

  // Evento adicional para asegurarse de mostrar u ocultar los botones si el tamaño de la ventana cambia
  window.addEventListener("resize", function () {
    mostrarOcultarBotones();
  });
});
