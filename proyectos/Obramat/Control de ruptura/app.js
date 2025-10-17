// --- Animación Lottie ---
lottie.loadAnimation({
  container: document.getElementById("animacion-lupa"),
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: "./recursos/lottie-buscar.json",
});

let cabeceras = [];
let productos = [];
let indiceTarjetaAbierta = null; // recordar qué tarjeta quedó abierta

// --- Utilidad: guardar/restaurar caché (30 días) ---
function guardarEnCache() {
  try {
    const datos = {
      nombre: document.getElementById("campo-nombre")?.textContent || "",
      seccion: document.getElementById("campo-seccion")?.textContent || "",
      productos,
      abiertaIndex: indiceTarjetaAbierta, // null o número
      fecha: new Date().toISOString(),
    };
    localStorage.setItem("rupturaCache", JSON.stringify(datos));
  } catch (e) {
    console.warn("No se pudo guardar en cache:", e);
  }
}

function restaurarDeCacheSiAplica() {
  try {
    const cache = localStorage.getItem("rupturaCache");
    if (!cache) return false;

    const datos = JSON.parse(cache);
    const ahora = new Date();
    const guardado = new Date(datos.fecha);
    const dias = (ahora - guardado) / (1000 * 60 * 60 * 24);

    if (dias >= 30) {
      localStorage.removeItem("rupturaCache");
      return false;
    }

    // Restaurar estado visual y datos
    productos = datos.productos || [];
    document.getElementById("nombre-usuario").value = datos.nombre || "";

    document.getElementById("seccion-inicial").style.display = "none";
    document.getElementById("header-principal").style.display = "none";
    document.getElementById("header-secundario").style.display = "block";
    document.getElementById("fecha-header").textContent =
      new Date().toLocaleDateString("es-ES");
    document.getElementById("info-final").style.display = "block";
    document.getElementById("campo-nombre").textContent = datos.nombre || "";
    document.getElementById("campo-seccion").textContent = datos.seccion || "";

    indiceTarjetaAbierta = Number.isInteger(datos.abiertaIndex)
      ? datos.abiertaIndex
      : null;

    const contenedor = document.getElementById("contenedor-productos");
    // pintar tarjetas y abrir la que estaba abierta
    mostrarTarjetas(productos, contenedor, indiceTarjetaAbierta);

    const botonDescargar = document.getElementById("boton-descargar");
    botonDescargar.style.display = "inline-block";
    verificarFormularioCompleto();

    return true;
  } catch (e) {
    console.warn("No se pudo restaurar la cache:", e);
    return false;
  }
}

// Pequeño debounce para no escribir en cada tecla
let tGuardar = null;
function guardarEnCacheDebounced() {
  clearTimeout(tGuardar);
  tGuardar = setTimeout(guardarEnCache, 250);
}

document.addEventListener("DOMContentLoaded", () => {
  const inputArchivo = document.getElementById("archivo-excel");
  const inputNombre = document.getElementById("nombre-usuario");
  const botonDescargar = document.getElementById("boton-descargar");
  botonDescargar.disabled = true; // desactivado de primeras

  const contenedor = document.getElementById("contenedor-productos");

  // Intentar restaurar sesión previa (si existe y es reciente)
  const restaurado = restaurarDeCacheSiAplica();

  // Guardar nombre si el usuario lo escribe (opcional pero útil)
  inputNombre?.addEventListener("input", guardarEnCacheDebounced);

  // Validar antes de abrir selector de archivo
  document
    .querySelector("label.boton-subir")
    .addEventListener("click", function (e) {
      const nombre = inputNombre.value.trim();

      if (!nombre) {
        alert("Introduce tu nombre antes de continuar");
        e.preventDefault();
        return;
      }

      if (/\d/.test(nombre)) {
        alert("El nombre no puede contener números.");
        e.preventDefault();
        return;
      }
    });

  // SUBIDA DE ARCHIVO
  inputArchivo.addEventListener("change", function () {
    const nombre = inputNombre.value.trim();

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

      // Al cargar Excel nuevo: ninguna abierta aún
      indiceTarjetaAbierta = null;

      // Mostrar tarjetas
      mostrarTarjetas(productos, contenedor);
      botonDescargar.style.display = "inline-block";
      verificarFormularioCompleto();

      // Guardar estado inicial en cache (incluye sección)
      guardarEnCache();
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

    // Filtrar solo los productos con comentarios válidos **y** incluidos
    const productosConComentario = productos.filter(
      (p) =>
        p["IncluirInforme"] !== false &&
        p["Comentario"] &&
        p["Comentario"].trim() !== ""
    );

    // Crear sección de comentarios solo si existen
    let seccionComentarios = [];
    if (productosConComentario.length > 0) {
      seccionComentarios = [
        {
          text: "Comentarios",
          style: "subheader",
          margin: [0, 20, 0, 8],
          color: "#FF5800",
        },
        {
          table: {
            headerRows: 1,
            widths: ["auto", "auto", "*"],
            dontBreakRows: true,
            body: [
              [
                {
                  text: "Referencia",
                  style: "thComentario",
                  alignment: "center",
                },
                {
                  text: "Descripción",
                  style: "thComentario",
                  alignment: "center",
                },
                {
                  text: "Comentario",
                  style: "thComentario",
                  alignment: "center",
                },
              ],
              ...productosConComentario.map((p) => [
                { text: p["Referencia"] || "", fontSize: 9, alignment: "left" },
                {
                  text: p["Descripción"] || "",
                  fontSize: 9,
                  alignment: "left",
                },
                { text: p["Comentario"] || "", fontSize: 9, alignment: "left" },
              ]),
            ],
          },
          layout: {
            // Cabecera naranja y filas alternadas como la tabla principal
            fillColor: (rowIndex) => {
              if (rowIndex === 0) return "#FF5800"; // cabecera
              return rowIndex % 2 === 1 ? "#FAFAFA" : null; // filas de datos (1,3,5...)
            },
            hLineColor: () => "#CCCCCC",
            vLineColor: () => "#CCCCCC",
          },
        },
      ];
    }

    const docDefinition = {
      pageOrientation: "landscape",
      pageMargins: [20, 30, 20, 30],
      footer: function (currentPage, pageCount) {
        return {
          columns: [
            {
              text: "Creado por Ronald Herrera",
              alignment: "left",
              margin: [20, 0, 0, 0],
              fontSize: 6,
              color: "#888",
            },
            {
              text: `Página ${currentPage} de ${pageCount}`,
              alignment: "right",
              margin: [0, 0, 20, 0],
              fontSize: 9,
              color: "#555",
            },
          ],
        };
      },
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
            dontBreakRows: true,
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
                {
                  text: "Referencia",
                  style: "th",
                  alignment: "center",
                  margin: [0, 5],
                },
                {
                  text: "Descripción",
                  style: "th",
                  alignment: "center",
                  margin: [0, 5],
                },
                {
                  text: "AVS",
                  style: "th",
                  alignment: "center",
                  margin: [0, 5],
                },
                {
                  text: "Stock disp.",
                  style: "th",
                  alignment: "center",
                  margin: [0, 5],
                },
                {
                  text: "Stock real",
                  style: "th",
                  alignment: "center",
                  margin: [0, 5],
                },
                {
                  text: "Rectif.",
                  style: "th",
                  alignment: "center",
                  margin: [0, 5],
                },
                {
                  text: "Pedir",
                  style: "th",
                  alignment: "center",
                  margin: [0, 5],
                },
                {
                  text: "Proveedor",
                  style: "th",
                  alignment: "center",
                  margin: [0, 5],
                },
                {
                  text: "Última recepción",
                  style: "th",
                  alignment: "center",
                  margin: [0, 5],
                },
                {
                  text: "Cantidad recibida",
                  style: "th",
                  alignment: "center",
                  margin: [0, 5],
                },
                {
                  text: "Póxima recepción",
                  style: "th",
                  alignment: "center",
                  margin: [0, 5],
                },
                {
                  text: "Cantidad a recibir.",
                  style: "th",
                  alignment: "center",
                  margin: [0, 5],
                },
                {
                  text: "Total pedidos",
                  style: "th",
                  alignment: "center",
                  margin: [0, 5],
                },
              ],
              ...productos
                .map((p, i) => ({ p, i })) // conservar índice original para leer inputs
                .filter(({ p }) => p["IncluirInforme"] !== false) // ← EXCLUIR del PDF si el toggle está apagado
                .map(({ p, i }) => {
                  const stockReal =
                    document.querySelector(
                      `input.stock-real[data-indice="${i}"]`
                    )?.value ||
                    p["StockReal"] ||
                    "";
                  const rectificado =
                    document.querySelector(`input[name="r${i}"]:checked`)
                      ?.value ||
                    p["Rectificado"] ||
                    "";
                  const pedido = p["Pedido"]?.toUpperCase() || "";

                  return [
                    p["Referencia"] || "",
                    p["Descripción"] || "",
                    p["Fecha AVS"] || "-",
                    p["Stock disponible"] || "",
                    stockReal,
                    rectificado,
                    pedido,
                    p["Proveedor"] || "",
                    p["Última Recepción"] || "",
                    p["Qts entregadas último pedido"] || "",
                    p["Fecha prevista entrega"] || "",
                    p["Qts. Próximo pedido"] || "",
                    p["Total Pedido en Curso"] || "",
                  ].map((celda) => ({
                    text: celda,
                    fillColor: i % 2 === 0 ? "#FAFAFA" : null,
                    alignment: "left",
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
        ...seccionComentarios,
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
        thComentario: {
          bold: true,
          color: "white",
          fillColor: "#FF5800",
          fontSize: 9,
          alignment: "center",
        },
      },
      images: {
        logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAArCAYAAADhXXHAAAADSUlEQVR4nNXZPUwTYRgH8P97dQBquEtNMA4csUKMST8Y3cSExOqAkwkmJDChAw6yyGKAgUQYdMGFBYkY4mhMmiYsGEN0lMIAMZC0xAECpm3SyoKvQzkod+/X3ZVc/U/c3Xu9Hw/PPXcAwUmMplRPiJBxCnQDMNAAIcAKNPrusJxZONkGIi0PxkHpRKAyUQiZ+F1JT5IrTakhSsh80B5Z/lJ6VwMhg0FDVBIiZFyjQE/QEJVQoFsLGuEixiWVVWbLn4uGIF9plq5Rwvabv/Di5k/fIF6mN7sws9UpXafUBjObnZje6vKNYkUVCihigYsBu4ECCtipmSenX9cTXAvVjTDef3wpPUfYs7oextORh9CNMEaGXwOoggH46mE79FPmFeKJG9LzhJWNJ6IAgMcDvZidGz3d76fCIqjZcdU7NpY8+27rAbb3qL2isZPieMKaZtu5bT9gO/Tt3KjjR1+3yvoBs6D9A73O6yWue8fqepi53w1YFQpAepNxsboeFvaQCtgNFADavbZBXNLsMrBbKFAtkKhvuXO21bgsxVpgAOfm8OpBBKsHEVdQK7FEFPncHvOYr8rWgmsr7BUKiCcCFxtLqmMBJxhwDwXEE4GLNU1xs7NSC/YCBcQTgUSa71PWgcNK2vWFrORze9IBz0uxWEb02iPmMWZl4y5bwB6vUEA8EZjYdg8tUM/w5ju7sgqTYCO74xpRKpax+jUrXeeqsiqTYHrqA0aG30jXWSkVy+i7N4b05+/StbyJwHwo6Lr8gbCb30d67RsAYHbuuXCtBV3PbqO9o024FuBPBHZl4/LKrq9tAwCWFpeFFa6FAmrtw3tHcGDjySh0g/22ZcX+OOSB7VDr3GKhLPx83kRwYPVWMRSotoA9S4vLuHP72SmEBT07n/3srw1rIjiwrBduezYYAGt/X2oMu7l9LrS6Tt4KrMo6bjD7rzKs5HPOyp5BttF9a0h4/np2B/2Sa5iMG9FTZa2by2t4r4DnHIyJ4MQqTIJSqaLIYkelDVg9y32RacT8T3+fhUaBQtAI1Wga8CNohEoIxRftmNLJoCEqOQ7Rea1wlFlBo4MpnSyUMwvE2jaaUkMhkEFKGua/NwVCsXYMOlE4yqwAwD+4DGJwefgiLgAAAABJRU5ErKJggg==",
      },
    };

    pdfMake.createPdf(docDefinition).getBlob((blob) => {
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
    });
  });

  // BOTÓN REINICIAR
  document.getElementById("boton-reiniciar").addEventListener("click", () => {
    const inputArchivo = document.getElementById("archivo-excel");
    inputArchivo.value = ""; // limpiar el anterior
    inputArchivo.click(); // abrir selector
  });

  // BOTÓN VOLVER A LA PANTALLA INICIAL
  const botonVolver = document.getElementById("boton-volver");
  if (botonVolver) {
    botonVolver.addEventListener("click", () => {
      // Mostrar pantallas iniciales
      const seccionInicial = document.getElementById("seccion-inicial");
      const headerPrincipal = document.getElementById("header-principal");
      const headerSecundario = document.getElementById("header-secundario");
      const infoFinal = document.getElementById("info-final");
      const contenedorProductos = document.getElementById(
        "contenedor-productos"
      );
      const inputArchivo = document.getElementById("archivo-excel");
      const inputNombre = document.getElementById("nombre-usuario");
      const botonDescargar = document.getElementById("boton-descargar");

      if (seccionInicial) seccionInicial.style.display = "block";
      if (headerPrincipal) headerPrincipal.style.display = "block";
      if (headerSecundario) headerSecundario.style.display = "none";
      if (infoFinal) infoFinal.style.display = "none";
      if (contenedorProductos) contenedorProductos.innerHTML = "";

      // Reset estado de app
      cabeceras = [];
      productos = [];
      indiceTarjetaAbierta = null;

      if (inputArchivo) inputArchivo.value = "";
      if (inputNombre) inputNombre.value = "";
      if (botonDescargar) {
        botonDescargar.style.display = "none";
        botonDescargar.disabled = true;
        botonDescargar.textContent = "Generar informe de ruptura";
      }

      // Limpiar caché explícitamente
      localStorage.removeItem("rupturaCache");

      // Subir arriba por si el usuario estaba abajo
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Si restauramos de cache, ya se mostraron tarjetas arriba
  if (!restaurado) {
    // No hacer nada extra
  }
});

// MOSTRAR TARJETAS (con opción de abrir una por índice)
function mostrarTarjetas(lista, contenedor, indiceAbrir = null) {
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

    // Asegurar valor inicial del toggle (por defecto incluido)
    if (typeof productos[i]["IncluirInforme"] === "undefined") {
      productos[i]["IncluirInforme"] = true;
    }

    // Asegurar campos persistidos
    productos[i]["Pedido"] = productos[i]["Pedido"] || "neutro";
    if (typeof productos[i]["StockReal"] === "undefined")
      productos[i]["StockReal"] = "";
    if (typeof productos[i]["Rectificado"] === "undefined")
      productos[i]["Rectificado"] = "";

    tarjeta.innerHTML = `
      <div class="tarjeta-cabecera">
        <div class="cabecera-izquierda">
          <div class="nombre">
            <img class="toggle-icon" src="./recursos/flecha_desplegar.svg" alt="">
            <strong>${p["Descripción"]}</strong>
          </div>
          <div class="ean">
            EAN: <em>${p["EAN"]}</em>
            <label class="switch-informe">
              <input type="checkbox" class="toggle-informe" data-indice="${i}" ${
      productos[i]["IncluirInforme"] ? "checked" : ""
    }>
              <span class="slider-text" aria-live="polite"></span>
            </label>
          </div>
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
            <span>STOCK: </span><strong style="color: #FF5800;">${
              p["Stock Info. Ubicación Fija"] || ""
            }</strong><br>
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
        <div class="tarjeta-pie1">
          <label>Stock real: <input class="stock-real" type="number" data-indice="${i}" /></label>
          <div class="grupo-radio">
            ¿Rectificado? 
            <label>Sí<input type="radio" name="r${i}" value="Sí" /></label>
            <label>No<input type="radio" name="r${i}" value="No" /></label>
          </div>
          <button class="btn-decision">Pedir/No pedir</button>
        </div>
        <textarea class="comentario-input" data-indice="${i}" placeholder="Añade un comentario (opcional)" rows="1">${
      p["Comentario"] || ""
    }</textarea>
      </div>`;

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

      verificarFormularioCompleto();

      // Añadir animación pulse
      boton.classList.add("animar");
      setTimeout(() => boton.classList.remove("animar"), 300);

      guardarEnCacheDebounced();
    });

    const cabecera = tarjeta.querySelector(".tarjeta-cabecera");
    const icono = tarjeta.querySelector(".toggle-icon");

    cabecera.addEventListener("click", () => {
      const abierta = tarjeta.dataset.abierta === "true";

      // Cerrar todas
      document.querySelectorAll(".tarjeta").forEach((t) => {
        t.dataset.abierta = "false";
        const icono = t.querySelector(".toggle-icon");
        if (icono) icono.style.transform = "rotate(0deg)";
      });

      if (!abierta) {
        tarjeta.dataset.abierta = "true";
        icono.style.transform = "rotate(180deg)";
        indiceTarjetaAbierta = i; // recordar cuál quedó abierta
      } else {
        indiceTarjetaAbierta = null; // ninguna abierta
      }
      guardarEnCacheDebounced(); // persistimos
    });

    contenedor.appendChild(tarjeta);

    // --- Abrir automáticamente la tarjeta guardada ---
    if (indiceAbrir === i) {
      tarjeta.dataset.abierta = "true";
      const iconoAuto = tarjeta.querySelector(".toggle-icon");
      if (iconoAuto) iconoAuto.style.transform = "rotate(180deg)";
    }

    // --- Campos persistidos: STOCK REAL ---
    const inputStock = tarjeta.querySelector(".stock-real");
    // valor inicial desde productos
    if (p["StockReal"] !== undefined && p["StockReal"] !== "") {
      inputStock.value = p["StockReal"];
    }
    inputStock.addEventListener("input", (e) => {
      productos[i]["StockReal"] = e.target.value;
      verificarFormularioCompleto();
      guardarEnCacheDebounced();
    });

    // Bloquear letras, signos y flechas arriba/abajo en stock
    inputStock.addEventListener("keydown", (e) => {
      const teclasPermitidas = [
        "Backspace",
        "ArrowLeft",
        "ArrowRight",
        "Tab",
        "Delete",
      ];
      const esNumero = /^[0-9]$/.test(e.key);

      if (!esNumero && !teclasPermitidas.includes(e.key)) {
        e.preventDefault();
      }

      // Bloquear flechas arriba/abajo
      if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        e.preventDefault();
      }
    });

    // Prevenir pegado de cosas raras
    inputStock.addEventListener("paste", (e) => {
      const texto = e.clipboardData.getData("text");
      if (!/^\d+$/.test(texto)) {
        e.preventDefault();
      }
    });

    // --- Comentario (persistente) ---
    const comentario = tarjeta.querySelector(".comentario-input");
    comentario.addEventListener("input", (e) => {
      productos[i]["Comentario"] = e.target.value.trim();

      // auto-ajuste de altura
      comentario.style.height = "auto";
      comentario.style.height = comentario.scrollHeight + "px";

      guardarEnCacheDebounced();
    });

    // Ajuste inicial por si ya hay comentario cargado
    comentario.style.height = "auto";
    comentario.style.height = comentario.scrollHeight + "px";

    // --- Rectificado (persistente) ---
    const radios = tarjeta.querySelectorAll(`input[name="r${i}"]`);
    // marcar estado inicial si existe
    if (p["Rectificado"] === "Sí") {
      radios[0].checked = true;
    } else if (p["Rectificado"] === "No") {
      radios[1].checked = true;
    }
    radios.forEach((r) =>
      r.addEventListener("change", (e) => {
        productos[i]["Rectificado"] = e.target.value; // "Sí" | "No"
        verificarFormularioCompleto();
        guardarEnCacheDebounced();
      })
    );

    // ---- SWITCH INCLUIR/EXCLUIR EN INFORME (persistente) ----
    const toggle = tarjeta.querySelector(".toggle-informe");
    if (toggle) {
      // Inicializar según el dato guardado
      toggle.checked = productos[i]["IncluirInforme"] !== false;
      productos[i]["IncluirInforme"] = toggle.checked;

      // Cambios en tiempo real
      toggle.addEventListener("change", (e) => {
        productos[i]["IncluirInforme"] = e.target.checked;
        verificarFormularioCompleto();
        guardarEnCacheDebounced();
      });
    }
  });

  // Guardar un snapshot tras pintar (por si venimos de Excel/restauración)
  guardarEnCacheDebounced();
}

function verificarFormularioCompleto() {
  const botonDescargar = document.getElementById("boton-descargar");
  const tarjetas = document.querySelectorAll(".tarjeta");

  const todasCompletas = productos.every((p, i) => {
    // Excluidos no bloquean
    if (p["IncluirInforme"] === false) return true;

    const tarjeta = tarjetas[i];
    // Si no hay tarjeta pintada aún, usa lo guardado
    const stock =
      tarjeta?.querySelector(`input.stock-real[data-indice="${i}"]`)?.value ??
      p["StockReal"] ??
      "";
    const rectif =
      tarjeta?.querySelector(`input[name="r${i}"]:checked`)?.value ||
      p["Rectificado"] ||
      "";
    const pedir = p["Pedido"];

    return stock !== "" && rectif && (pedir === "pedir" || pedir === "nopedir");
  });

  // Nueva condición: si todas las tarjetas están excluidas, también desactiva el botón
  const todasExcluidas = productos.every((p) => p["IncluirInforme"] === false);

  botonDescargar.disabled = !todasCompletas || todasExcluidas;
  botonDescargar.textContent = todasCompletas
    ? "Generar informe de ruptura"
    : "Completa todas las tarjetas para activarme";
}
