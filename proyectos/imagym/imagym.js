document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("main section");
  const links = document.querySelectorAll(".navMain a");

  document.getElementById("estrategia").classList.add("seccion-activa");

  links.forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();

      sections.forEach(function (section) {
        section.classList.remove("seccion-activa");
      });

      links.forEach(function (link) {
        link.classList.remove("activo");
      });

      const targetId = link.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);
      targetSection.classList.add("seccion-activa");
      link.classList.add("activo");

      // Scroll al inicio de la sección activada
      targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
});
