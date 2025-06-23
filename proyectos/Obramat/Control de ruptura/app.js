lottie.loadAnimation({
  container: document.getElementById("animacion-lupa"),
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: "./recursos/lottie-buscar.json",
});

let cabeceras = [];
let productos = [];

document.addEventListener("DOMContentLoaded", () => {
  const inputArchivo = document.getElementById("archivo-excel");
  const inputNombre = document.getElementById("nombre-usuario");
  const botonDescargar = document.getElementById("boton-descargar");
  const contenedor = document.getElementById("contenedor-productos");

  inputArchivo.addEventListener("change", function () {
    const nombre = inputNombre.value.trim();
    const regexTexto = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

    if (!nombre) {
      alert("Introduce tu nombre antes de continuar");
      inputNombre.focus();
      return;
    }

    if (!regexTexto.test(nombre)) {
      alert("El nombre solo puede contener letras y espacios.");
      inputNombre.focus();
      return;
    }

    document.getElementById("seccion-inicial").style.display = "none";
    document.getElementById("header-principal").style.display = "none";
    document.getElementById("header-secundario").style.display = "block";
    document.getElementById("fecha-header").textContent =
      new Date().toLocaleDateString("es-ES");

    const archivo = this.files[0];
    const lector = new FileReader();

    lector.onload = function (e) {
      const datos = new Uint8Array(e.target.result);
      const libro = XLSX.read(datos, { type: "array" });
      const hoja = libro.Sheets[libro.SheetNames[0]];
      const filas = XLSX.utils.sheet_to_json(hoja, { defval: "" });

      if (!filas.length) {
        alert("El archivo no contiene datos.");
        return;
      }

      cabeceras = Object.keys(filas[0]);
      productos = filas;

      document.getElementById("info-final").style.display = "block";
      document.getElementById("campo-nombre").textContent = nombre;

      const secciones = [
        ...new Set(filas.map((f) => f["Sección"]).filter(Boolean)),
      ];
      document.getElementById("campo-seccion").textContent =
        secciones.length === 1 ? secciones[0] : "varias";

      mostrarTarjetas(productos, contenedor);
      botonDescargar.style.display = "inline-block";
    };

    lector.readAsArrayBuffer(archivo);
  });

  botonDescargar.textContent = "Descargar informe de ruptura";

  botonDescargar.addEventListener("click", () => {
    if (!productos.length) {
      alert("Primero debes subir un archivo.");
      return;
    }

    // Validación por tarjeta
    for (let i = 0; i < productos.length; i++) {
      const stockInput = document.querySelector(
        `input.stock-real[data-indice="${i}"]`
      );
      const rectificado = document.querySelector(`input[name="r${i}"]:checked`);
      const pedido = productos[i]["Pedido"];

      if (
        !stockInput ||
        stockInput.value.trim() === "" ||
        isNaN(stockInput.value.trim())
      ) {
        alert(
          `Debes introducir un stock real válido para el producto: ${productos[i]["Descripción"]}`
        );
        abrirTarjeta(i);
        stockInput?.focus();
        return;
      }

      if (!rectificado) {
        alert(
          `Debes indicar si se ha rectificado o no en el producto: ${productos[i]["Descripción"]}`
        );
        abrirTarjeta(i);
        const radios = document.getElementsByName(`r${i}`);
        radios[0]?.focus();
        return;
      }

      if (pedido !== "pedir" && pedido !== "nopedir") {
        alert(
          `Debes seleccionar "Pedir" o "No pedir" en el producto: ${productos[i]["Descripción"]}`
        );
        abrirTarjeta(i);
        const boton = document.querySelectorAll(".btn-decision")[i];
        boton?.focus();
        return;
      }
    }

    const nombreColaborador =
      document.getElementById("campo-nombre").textContent;
    const fecha = new Date().toLocaleDateString("es-ES");

    const docDefinition = {
      pageOrientation: "landscape",
      pageMargins: [20, 30, 20, 30],
      content: [
        {
          columns: [
            { text: "Informe de rupturas", style: "titulo", width: "*" },
            { image: "logo", width: 30, alignment: "right" },
          ],
        },
        {
          text: `Colaborador/a: ${nombreColaborador}   –   Fecha: ${fecha}`,
          style: "subheader",
          margin: [0, 0, 0, 15],
        },
        {
          table: {
            headerRows: 1,
            widths: [
              "auto",
              "auto",
              "auto",
              "auto",
              "auto",
              "auto",
              "auto",
              "*",
              "auto",
              "auto",
              "auto",
              "auto",
              "auto",
            ],
            body: [
              [
                { text: "Sección", style: "th" },
                { text: "Referencia", style: "th" },
                { text: "Stock disp.", style: "th" },
                { text: "Stock real", style: "th" },
                { text: "Rectif.", style: "th" },
                { text: "Pedir", style: "th" },
                { text: "EAN", style: "th" },
                { text: "Descripción", style: "th" },
                { text: "AVS", style: "th" },
                { text: "Últ. recepción", style: "th" },
                { text: "Qts últ. pedido", style: "th" },
                { text: "Qts próxim.", style: "th" },
                { text: "Pedido curso", style: "th" },
              ],
              ...productos.map((p, i) => {
                const stockReal =
                  document.querySelector(`input.stock-real[data-indice="${i}"]`)
                    ?.value || "";
                const rectificado =
                  document.querySelector(`input[name="r${i}"]:checked`)
                    ?.value || "";
                const pedido = p["Pedido"]?.toUpperCase() || "";

                return [
                  p["Sección"] || "",
                  p["Referencia"] || "",
                  p["Stock disponible"] || "",
                  stockReal,
                  rectificado,
                  pedido,
                  p["EAN"] || "",
                  p["Descripción"] || "",
                  p["AVS"] || "-",
                  p["Última Recepción"] || "",
                  p["Qts entregadas último pedido"] || "",
                  p["Qts. Próximo pedido"] || "",
                  p["Total Pedido en Curso"] || "",
                ].map((celda) => ({
                  text: celda,
                  fillColor: i % 2 === 0 ? "#FAFAFA" : null,
                  alignment: "center",
                  fontSize: 8,
                }));
              }),
            ],
          },
          layout: {
            fillColor: (rowIndex) => (rowIndex === 0 ? "#120949" : null),
            hLineColor: () => "#CCCCCC",
            vLineColor: () => "#CCCCCC",
          },
        },
      ],
      styles: {
        titulo: { fontSize: 18, bold: true, color: "#120949" },
        subheader: { fontSize: 10 },
        th: {
          bold: true,
          color: "white",
          fillColor: "#120949",
          fontSize: 9,
          alignment: "center",
        },
      },
      images: {
        logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAArCAYAAADhXXHAAAADSUlEQVR4nNXZPUwTYRgH8P97dQBquEtNMA4csUKMST8Y3cSExOqAkwkmJDChAw6yyGKAgUQYdMGFBYkY4mhMmiYsGEN0lMIAMZC0xAECpm3SyoKvQzkod+/X3ZVc/U/c3Xu9Hw/PPXcAwUmMplRPiJBxCnQDMNAAIcAKNPrusJxZONkGIi0PxkHpRKAyUQiZ+F1JT5IrTakhSsh80B5Z/lJ6VwMhg0FDVBIiZFyjQE/QEJVQoFsLGuEixiWVVWbLn4uGIF9plq5Rwvabv/Di5k/fIF6mN7sws9UpXafUBjObnZje6vKNYkUVCihigYsBu4ECCtipmSenX9cTXAvVjTDef3wpPUfYs7oextORh9CNMEaGXwOoggH46mE79FPmFeKJG9LzhJWNJ6IAgMcDvZidGz3d76fCIqjZcdU7NpY8+27rAbb3qL2isZPieMKaZtu5bT9gO/Tt3KjjR1+3yvoBs6D9A73O6yWue8fqepi53w1YFQpAepNxsboeFvaQCtgNFADavbZBXNLsMrBbKFAtkKhvuXO21bgsxVpgAOfm8OpBBKsHEVdQK7FEFPncHvOYr8rWgmsr7BUKiCcCFxtLqmMBJxhwDwXEE4GLNU1xs7NSC/YCBcQTgUSa71PWgcNK2vWFrORze9IBz0uxWEb02iPmMWZl4y5bwB6vUEA8EZjYdg8tUM/w5ju7sgqTYCO74xpRKpax+jUrXeeqsiqTYHrqA0aG30jXWSkVy+i7N4b05+/StbyJwHwo6Lr8gbCb30d67RsAYHbuuXCtBV3PbqO9o024FuBPBHZl4/LKrq9tAwCWFpeFFa6FAmrtw3tHcGDjySh0g/22ZcX+OOSB7VDr3GKhLPx83kRwYPVWMRSotoA9S4vLuHP72SmEBT07n/3srw1rIjiwrBduezYYAGt/X2oMu7l9LrS6Tt4KrMo6bjD7rzKs5HPOyp5BttF9a0h4/np2B/2Sa5iMG9FTZa2by2t4r4DnHIyJ4MQqTIJSqaLIYkelDVg9y32RacT8T3+fhUaBQtAI1Wga8CNohEoIxRftmNLJoCEqOQ7Rea1wlFlBo4MpnSyUMwvE2jaaUkMhkEFKGua/NwVCsXYMOlE4yqwAwD+4DGJwefgiLgAAAABJRU5ErkJggg==",
      },
    };

    pdfMake.createPdf(docDefinition).getBlob((blob) => {
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
    });
  });

  document.getElementById("boton-reiniciar").addEventListener("click", () => {
    const inputArchivo = document.getElementById("archivo-excel");
    inputArchivo.value = "";
    inputArchivo.click();
  });
});

function abrirTarjeta(index) {
  document.querySelectorAll(".tarjeta").forEach((t, i) => {
    t.dataset.abierta = i === index ? "true" : "false";
    const icono = t.querySelector(".toggle-icon");
    if (icono)
      icono.style.transform = i === index ? "rotate(180deg)" : "rotate(0deg)";
  });
}
