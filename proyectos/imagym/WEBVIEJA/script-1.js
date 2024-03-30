function mostrarPopUpInfo() {
  var popUp = document.getElementById("popUpInfo");
  popUp.style.display = "flex";
}

function cerrarPopUpInfo() {
  var popUp = document.getElementById("popUpInfo");
  popUp.style.display = "none";
}
//
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
      document.getElementById(targetId).classList.add("seccion-activa");
      link.classList.add("activo");
    });
  });
});
