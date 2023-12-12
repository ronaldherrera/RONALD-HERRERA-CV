//-INICIO-función para controlar el scroll horizontal del carrusel de portfolio de inicio
const proyectos = document.querySelectorAll(
  "#diseñoGrafico, #fullStack, #infografias"
);

let isScrolling = false;

proyectos.forEach((proyecto) => {
  proyecto.addEventListener("mouseenter", function () {
    isScrolling = true;
    proyecto.style.overflowY = "hidden";
    proyecto.style.overflowX = "scroll";
  });

  proyecto.addEventListener("mouseleave", function () {
    isScrolling = false;
    proyecto.style.overflow = "hidden";
  });

  proyecto.addEventListener(
    "wheel",
    function (event) {
      if (isScrolling) {
        event.preventDefault();
        proyecto.scrollLeft += event.deltaY;
      }
    },
    { passive: false }
  );
});
//-FIN-función para controlar el scroll horizontal del carrusel de portfolio de inicio
/////////////////////
//-INICIO-función para copiar en el portapapeles
function copyTel() {
  const textToCopy = "+34671987372"; // El texto que quieres copiar
  navigator.clipboard.writeText(textToCopy).then(
    function () {
      alert("Teléfono copiado al portapapeles: " + textToCopy);
    },
    function (err) {
      console.error("Error al copiar: ", err);
    }
  );
}
function copyMail() {
  const textToCopy = "ronaldcalzadilla31@gmail.com"; // El texto que quieres copiar
  navigator.clipboard.writeText(textToCopy).then(
    function () {
      alert("E-mail copiado al portapapeles: " + textToCopy);
    },
    function (err) {
      console.error("Error al copiar: ", err);
    }
  );
}
//-FIN-función para copiar en el portapapeles
//////////////////////////
//-INICIO-activar enlaces en menu de la seccion seleccionada
function getSectionMostVisible() {
  const windowHeight = window.innerHeight;
  const sections = document.querySelectorAll("main section");
  const headerLinks = document.querySelectorAll("header  a");

  let maxVisibleHeight = 0;
  let mostVisibleSectionId = null;

  sections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top;
    const sectionBottom = section.getBoundingClientRect().bottom;
    const visibleHeight =
      Math.min(windowHeight, sectionBottom) - Math.max(0, sectionTop);

    if (
      visibleHeight > maxVisibleHeight &&
      visibleHeight >= section.clientHeight / 2
    ) {
      maxVisibleHeight = visibleHeight;
      mostVisibleSectionId = section.getAttribute("id");
    }
  });

  headerLinks.forEach((link) => {
    link.classList.remove("activo");
    if (link.getAttribute("href").slice(1) === mostVisibleSectionId) {
      link.classList.add("activo");
    }
  });

  console.log("Sección más visible:", mostVisibleSectionId);
  return mostVisibleSectionId;
}

document.addEventListener("scroll", getSectionMostVisible);
//-FIN-activar enlaces en menu de la seccion seleccionada
///////////////////////
//-INICIO-añadir atributo hidden segun el tamaño de la ventana para cambiar menu movil o escritorio.
// Obtener los elementos de los menús
const navEscritorio = document.getElementById("navHeader-escritorio");
const navMovil = document.getElementById("navHeader-movil");

// Función para mostrar u ocultar menús según el tamaño de la pantalla
function toggleMenus() {
  if (window.innerWidth <= 767) {
    navEscritorio.setAttribute("hidden", true); // Oculta el menú de escritorio
    navMovil.removeAttribute("hidden"); // Muestra el menú móvil
  } else {
    navEscritorio.removeAttribute("hidden"); // Muestra el menú de escritorio
    navMovil.setAttribute("hidden", true); // Oculta el menú móvil
  }
}

// Llamar a la función inicialmente y cada vez que se redimensione la ventana
toggleMenus(); // Para manejar la visibilidad inicial de los menús

window.addEventListener("resize", toggleMenus); // Para manejar los cambios en el tamaño de la ventana
//-FIN-añadir atributo hidden segun el tamaño de la ventana para cambiar menu movil o escritorio.
///////////////////////////
//-INICIO-controlar menu deslizable para movil
document.addEventListener("DOMContentLoaded", function () {
  const botonHamburguesa = document.querySelector(".botonHamburguesa");
  const ulMovil = document.querySelector("#navHeader-movil ul");
  const xMarkIcon = document.querySelector(".fa-xmark");
  const barsIcon = document.querySelector(".fa-bars");
  const header = document.querySelector("header");

  // Función para mostrar/ocultar la lista al hacer clic en el botón de hamburguesa
  botonHamburguesa.addEventListener("click", function () {
    ulMovil.classList.toggle("mostrar");
    xMarkIcon.style.display = ulMovil.classList.contains("mostrar")
      ? "inline"
      : "none";
    barsIcon.style.display = ulMovil.classList.contains("mostrar")
      ? "none"
      : "inline";
  });

  // Función para ocultar la lista al hacer clic en elementos dentro del header
  header.addEventListener("click", function (event) {
    const target = event.target;
    if (target.tagName === "A" || target.tagName === "BUTTON") {
      ulMovil.classList.remove("mostrar");
      xMarkIcon.style.display = "none";
      barsIcon.style.display = "inline";
    }
  });

  // Función para ocultar la lista al hacer clic fuera del header
  document.addEventListener("click", function (event) {
    const isClickedInsideHeader = header.contains(event.target);
    if (!isClickedInsideHeader) {
      ulMovil.classList.remove("mostrar");
      xMarkIcon.style.display = "none";
      barsIcon.style.display = "inline";
    }
  });
});
//-FIN-controlar menu deslizable para movil
////////////////////
//////////////
const texts = [
  "Diseñador gráfico",
  "Web developer",
  "Ux/Ui designer",
  "3D Maker",
  "Front End",
  "Full Stack",
];
let count = 0;
let index = 0;
let currentText = "";
let letter = "";

function type() {
  if (index < texts[count].length) {
    currentText = texts[count];
    letter = currentText.slice(0, ++index);

    document.getElementById("text-container").textContent = letter;
    setTimeout(type, 100);
  } else {
    setTimeout(erase, 1000);
  }
}

function erase() {
  if (index > 0) {
    currentText = texts[count];
    letter = currentText.slice(0, --index);

    document.getElementById("text-container").textContent = letter;
    setTimeout(erase, 50);
  } else {
    count++;
    if (count >= texts.length) count = 0;
    setTimeout(type, 500);
  }
}

window.onload = function () {
  setTimeout(type, 500);
};
