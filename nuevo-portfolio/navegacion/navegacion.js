// script.js
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("a");

  links.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const target = this.href;

      document.body.classList.add("page-exit");

      setTimeout(() => {
        window.location.href = target;
      }, 500); // Duración de la transición en milisegundos
    });
  });
});

window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    document.body.classList.remove("page-exit");
  }
});
