/*/animacion de scroll
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector("#main");
  const sections = document.querySelectorAll("#section");
  let isScrolling;

  container.addEventListener("scroll", () => {
    window.clearTimeout(isScrolling);

    isScrolling = setTimeout(() => {
      let sectionIndex = Math.round(container.scrollTop / window.innerHeight);
      main.scrollTo({
        top: sections[sectionIndex].offsetTop,
        behavior: "smooth",
      });
    }, 100);
  });
});
