function updateDashboardView() {
  const vertical = document.getElementById("iframe-vertical");
  const horizontal = document.getElementById("iframe-horizontal");
  const isPortrait = window.innerHeight >= window.innerWidth;

  if (isPortrait) {
    vertical.classList.add("active");
    horizontal.classList.remove("active");
  } else {
    horizontal.classList.add("active");
    vertical.classList.remove("active");
  }
}

window.addEventListener("load", updateDashboardView);
window.addEventListener("resize", updateDashboardView);
window.addEventListener("orientationchange", updateDashboardView);
