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

  // SUBIDA DE ARCHIVO
  inputArchivo.addEventListener("change", function () {
    const nombre = inputNombre.value.trim();
    if (!nombre) {
      alert("Introduce tu nombre antes de continuar");
      return;
    }

    // Mostrar encabezado alternativo
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

      // Mostrar sección colaborador
      document.getElementById("info-final").style.display = "block";
      document.getElementById("campo-nombre").textContent = nombre;
      const secciones = [
        ...new Set(filas.map((f) => f["Sección"]).filter(Boolean)),
      ];
      document.getElementById("campo-seccion").textContent =
        secciones.length === 1 ? secciones[0] : "varias";

      // Mostrar tarjetas
      mostrarTarjetas(productos, contenedor);
      botonDescargar.style.display = "inline-block";
    };

    lector.readAsArrayBuffer(archivo);
  });

  // DESCARGAR ARCHIVO MODIFICADO
  botonDescargar.textContent = "Descargar informe de ruptura";

  botonDescargar.addEventListener("click", () => {
    if (!productos.length) {
      alert("Primero debes subir un archivo.");
      return;
    }

    const nombreColaborador =
      document.getElementById("campo-nombre").textContent;
    const fecha = new Date().toLocaleDateString("es-ES");

    const datos = productos.map((p, i) => {
      const stockReal =
        document.querySelector(`input.stock-real[data-indice="${i}"]`)?.value ||
        "";
      const rectificado =
        document.querySelector(`input[name="r${i}"]:checked`)?.value || "";
      const pedido = p["Pedido"] || "";

      return [
        p["Referencia"] || "",
        p["Descripción"] || "",
        p["Stock disponible"] || "",
        stockReal,
        pedido.toUpperCase(),
        rectificado,
      ];
    });

    const contenido = {
      pageOrientation: "landscape",
      pageMargins: [20, 30, 20, 30],
      content: [
        {
          columns: [
            { text: "Informe de rupturas", style: "titulo", width: "*" },
            {
              image: "logo",
              width: 80,
              alignment: "right",
            },
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
                { text: "Pedir", style: "th" },
                { text: "Rectif.", style: "th" },
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
                  pedido,
                  rectificado,
                  p["EAN"] || "",
                  p["Descripción"] || "",
                  p["AVS"] || p["Ubicación fija"] || "",
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
            fillColor: (rowIndex) => (rowIndex === 0 ? "#FF5800" : null),
            hLineColor: () => "#CCCCCC",
            vLineColor: () => "#CCCCCC",
          },
        },
      ],
      styles: {
        titulo: {
          fontSize: 18,
          bold: true,
          color: "#120949",
        },
        subheader: {
          fontSize: 10,
        },
        th: {
          bold: true,
          color: "white",
          fillColor: "#FF5800",
          fontSize: 9,
          alignment: "center",
        },
      },
      images: {
        logo: "data:image/png;base64,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",
      },
    };

    pdfMake.createPdf(contenido).getBlob((blob) => {
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
    });
  });

  // Convertir imagen <img> en base64 para PDF
  function getBase64Image(img) {
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    return canvas.toDataURL("image/png");
  }

  // BOTÓN REINICIAR
  document.getElementById("boton-reiniciar").addEventListener("click", () => {
    const inputArchivo = document.getElementById("archivo-excel");
    inputArchivo.value = ""; // limpiar el anterior
    inputArchivo.click(); // abrir selector
  });
});

// MOSTRAR TARJETAS
function mostrarTarjetas(lista, contenedor) {
  contenedor.innerHTML = "";

  lista.forEach((p, i) => {
    const tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta";
    tarjeta.dataset.abierta = "false";

    const ventas = [
      "Ventas M-3",
      "Ventas M-2",
      "Ventas M-1",
      "Ventas M",
      "Ventas M A-1",
    ].map((k) => p[k] || 0);

    tarjeta.innerHTML = `
      <div class="tarjeta-cabecera">
        <div class="cabecera-izquierda">
          <div class="nombre">
            <img class="toggle-icon" src="./recursos/flecha_desplegar.svg" alt="">
            <strong>${p["Descripción"]}</strong>
          </div>
          <div class="ean"><em>EAN:</em> <span>${p["EAN"]}</span></div>
        </div>
        <div class="cabecera-derecha">
          <div class="stock"><span>Stock:</span> ${p["Stock disponible"]} </div>
          <div class="referencia">${p["Referencia"]}</div>
        </div>
      </div>
      <div class="tarjeta-detalle">
        <div class="detalle-proveedor">
          <span>PROVEEDOR:</span> ${p["Proveedor"] || ""}<br>
          <span>PLAZO DE ENTREGA:</span> ${p["Plazo de Entrega"] || ""} días
        </div>
        <div class="detalle-ubicacion">
          <div>
            <span>UBICACIÓN FIJA: </span><br>${p["Ubicación fija"] || ""}<br>
          </div>
          <div>
            <span>AVS: </span> <i style="color: #FF5800;">${
              p["Fecha AVS"] || "-"
            }</i><br>
            <span>ÚLTIMA RECEPCIÓN: </span><br>
            ${p["Última Recepción"] || "-"}>> <strong style="color: #FF5800;">${
      p["Qts entregadas último pedido"] || "-"
    }</strong>
          </div>
        </div>
        <div class="detalle-ventas">
          <span>VENTAS</span>
          <table>
            <tr>
              <th>M-3</th><th>M-2</th><th>M-1</th><th>M</th><th>M A-1</th>
            </tr>
            <tr>
              <td>${p["Ventas M-3"] || 0}</td>
              <td>${p["Ventas M-2"] || 0}</td>
              <td>${p["Ventas M-1"] || 0}</td>
              <td>${p["Ventas M"] || 0}</td>
              <td>${p["Ventas M A-1"] || 0}</td>
            </tr>
          </table>
        </div>
        <div class="detalle-pedidos">
          <span>PEDIDOS EN<br>CURSO</span><br>
          <strong style="font-size: 25px;">${
            p["Total Pedido en Curso"] || ""
          }</strong>
        </div>
        <div class="detalle-proximo">
          <div>
            <span>PRÓXIMO PEDIDO</span><br>
            <strong style="font-size: 10px; font-weight: 400;">${
              p["Próximo pedido"] || ""
            } >> </strong>
            <strong style="font-size: 12px; font-weight: 600; color:#120949;">${
              p["Fecha prevista entrega"] || ""
            }</strong>
          </div>
          <strong style="font-size: 25px;">${
            p["Qts. Próximo pedido"] || "NO SE ESPERA"
          }</strong>
        </div>
        <div class="detalle-causa">
          <span>POSIBLE CAUSA DE LA RUPTURA:</span><br>
          <strong style="font-size: 10px; font-weight: 400;">${
            p["Posible Causa de la Ruptura"] || ""
          }</strong>
        </div>
        <div class="detalle-edita">
          <span>SE EDITA:</span><br>
          <strong style="font-size: 10px; font-weight: 400;">${
            p["Día de edición"] || ""
          }</strong>
        </div>
      </div>
      <div class="tarjeta-pie">
        <label>Stock real: <input class="stock-real" type="text" data-indice="${i}" /></label>
        <div class="grupo-radio">
          ¿Rectificado? 
          <label>Sí<input type="radio" name="r${i}" value="Sí" /></label>
          <label>No<input type="radio" name="r${i}" value="No" /></label>
        </div>
        <button class="btn-decision">Pedir/No pedir</button>
      </div>
    `;

    // Estado del botón pedir/no pedir
    const boton = tarjeta.querySelector(".btn-decision");
    const estado = p["Pedido"] || "neutro";
    if (estado === "pedir") {
      boton.classList.add("estado-pedir");
      boton.textContent = "Pedir";
    } else if (estado === "nopedir") {
      boton.classList.add("estado-nopedir");
      boton.textContent = "No pedir";
    } else {
      boton.classList.add("estado-neutro");
      boton.textContent = "Pedir/No pedir";
    }

    boton.addEventListener("click", () => {
      const actual = productos[i]["Pedido"];
      if (actual === "pedir") {
        productos[i]["Pedido"] = "nopedir";
        boton.className = "btn-decision estado-nopedir";
        boton.textContent = "No pedir";
      } else {
        productos[i]["Pedido"] = "pedir";
        boton.className = "btn-decision estado-pedir";
        boton.textContent = "Pedir";
      }

      // Añadir animación pulse
      boton.classList.add("animar");
      setTimeout(() => boton.classList.remove("animar"), 300);
    });

    const cabecera = tarjeta.querySelector(".tarjeta-cabecera");
    const icono = tarjeta.querySelector(".toggle-icon");

    cabecera.addEventListener("click", () => {
      const abierta = tarjeta.dataset.abierta === "true";

      // Cerrar todas las tarjetas primero
      document.querySelectorAll(".tarjeta").forEach((t) => {
        t.dataset.abierta = "false";
        const icono = t.querySelector(".toggle-icon");
        if (icono) icono.style.transform = "rotate(0deg)";
      });

      // Si la actual no estaba abierta, la abrimos
      if (!abierta) {
        tarjeta.dataset.abierta = "true";
        icono.style.transform = "rotate(180deg)";
      }
    });

    contenedor.appendChild(tarjeta);
  });
}
