let cabeceras = [];
let productos = [];

document.addEventListener("DOMContentLoaded", () => {
  const inputArchivo = document.getElementById("archivo-excel");
  const inputNombre = document.getElementById("nombre-usuario");
  const botonDescargar = document.getElementById("boton-descargar");
  const contenedor = document.getElementById("contenedor-productos");

  inputArchivo.addEventListener("change", function () {
    const nombre = inputNombre.value.trim();
    if (!nombre) {
      alert("Introduce tu nombre antes de continuar");
      return;
    }

    document.getElementById(
      "info-usuario"
    ).textContent = `Colaborador/a: ${nombre} – ${new Date().toLocaleDateString(
      "es-ES"
    )}`;
    document.getElementById("seccion-inicial").style.display = "none";

    const archivo = this.files[0];
    const lector = new FileReader();

    lector.onload = function (e) {
      const datos = new Uint8Array(e.target.result);
      const libro = XLSX.read(datos, { type: "array" });
      const hoja = libro.Sheets[libro.SheetNames[0]];
      const filas = XLSX.utils.sheet_to_json(hoja, { defval: "" });
      cabeceras = Object.keys(filas[0]);
      productos = filas;
      mostrarTarjetas(productos, contenedor);
      botonDescargar.style.display = "inline-block";
    };

    lector.readAsArrayBuffer(archivo);
  });

  botonDescargar.addEventListener("click", () => {
    const actualizados = productos.map((p, i) => {
      const inputStock = document.querySelector(
        `input.stock-real[data-indice="${i}"]`
      );
      const radio = document.querySelector(`input[name="r${i}"]:checked`);
      return {
        ...p,
        "Stock real": inputStock?.value || "",
        Rectificado: radio?.value || "",
      };
    });

    const hoja = XLSX.utils.json_to_sheet(actualizados, {
      header: cabeceras.concat(["Stock real", "Rectificado"]),
    });
    const libro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libro, hoja, "Control actualizado");
    XLSX.writeFile(libro, "control_ruptura_modificado.xlsx");
  });
});

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
                <span>PLAZO DE ENTREGA:</span> ${
                  p["Plazo de Entrega"] || ""
                } días
              </div>
              <div class="detalle-ubicacion">
              <div>
                <span>UBICACIÓN FIJA: </span><br>${
                  p["Ubicación fija"] || ""
                }<br></div>
                <div>
                <span>AVS: </span> <i style="color: #FF5800;">${
                  p["Fecha AVS"] || "-"
                }</i><br>
                <span>ÚLTIMA RECEPCIÓN: </span> <br>
                ${
                  p["Última Recepción"] || "-"
                }>> <strong style="color: #FF5800;">${
      p["Qts entregadas último pedido"] || "-"
    } </strong>
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
              <span>PEDIDOS EN CURSO</span><br>
                <strong style="font-size: 25px; font-style: bold;">${
                  p["Total Pedido en Curso"] || ""
                }</strong>
              </div>
              <div class="detalle-proximo">
              <div><span>PRÓXIMO PEDIDO</span><br>
                <strong style="font-size: 10px; font-weight: 400;">${
                  p["Próximo pedido"] || ""
                }>> </strong> <strong style="font-size: 12px; font-weight: 600; color:#120949;">${
      p["Fecha prevista entrega"] || ""
    }</strong></div>
                <strong style="font-size: 25px; font-style: bold;">${
                  p["Qts. Próximo pedido"] || ""
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
          <label><input type="radio" name="r${i}" value="Sí" /> Sí</label>
          <label><input type="radio" name="r${i}" value="No" /> No</label>
        </div>
        <button class="btn-decision">Pedir/No pedir</button>
      </div>
    `;

    tarjeta.querySelector(".tarjeta-cabecera").addEventListener("click", () => {
      const abierta = tarjeta.dataset.abierta === "true";
      tarjeta.dataset.abierta = !abierta;
      tarjeta.querySelector(".tarjeta-detalle").style.display = abierta
        ? "none"
        : "grid";
      tarjeta.querySelector(".toggle-icon").textContent = abierta ? "🔽" : "🔼";
    });

    tarjeta.querySelector(".tarjeta-detalle").style.display = "none";
    contenedor.appendChild(tarjeta);
  });
}
