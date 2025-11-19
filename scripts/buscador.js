// 🔹 Normalizar texto (minúsculas, sin acentos)
function normalizar(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

// 🔹 Variantes de palabra (singular/plural)
function variantesPalabra(palabra) {
  let formas = [palabra];
  if (palabra.endsWith("s")) {
    formas.push(palabra.slice(0, -1));
  } else {
    formas.push(palabra + "s");
  }
  return formas;
}

// 🔹 Función que resume la descripción
function obtenerDescripcionReducidaPorPalabras(descripcion, maxCaracteres = 500) {
  if (descripcion.length <= maxCaracteres) return descripcion;

  const palabras = descripcion.split(" ");
  let resultado = "";

  for (let palabra of palabras) {
    if ((resultado + palabra).length > maxCaracteres) break;
    resultado += palabra + " ";
  }

  return resultado.trimEnd() + "...";
}

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const consultaOriginal = params.get("q") || "";
  const consulta = normalizar(consultaOriginal);
  const resultadosDiv = document.getElementById("resultados");
  const tituloBusqueda = document.getElementById("titulo-busqueda");

  tituloBusqueda.textContent = `Resultados para "${consultaOriginal}"`;

  if (consulta === "") {
    resultadosDiv.innerHTML =
      '<p class="no-buscador">No se ha introducido ninguna búsqueda.</p>';
    return;
  }

  // ✅ Ruta corregida para Eleventy
  // En el _site final, recetas.json estará en la raíz (gracias a addPassthroughCopy)
  const basePath = '/recetasypico';
  fetch(basePath + "/recetas.json")
    .then((res) => {
      if (!res.ok) throw new Error("Error al cargar recetas.json");
      return res.json();
    })
    .then((recetas) => {
      const palabras = consulta.split(/\s+/);

      const resultados = recetas.filter((receta) => {
        const textoReceta = normalizar(
          `${receta.titulo} ${receta.descripcion} ${receta.palabrasClave.join(" ")} ${receta.categoria.join(" ")}`
        );

        return palabras.some((palabra) =>
          variantesPalabra(palabra).some((variante) =>
            textoReceta.includes(variante)
          )
        );
      });

      // 🔹 Actualizamos número de resultados
      const numResultados = document.getElementById("num-resultados");
      numResultados.textContent = `${resultados.length} receta${
        resultados.length !== 1 ? "s" : ""
      } encontrada${resultados.length !== 1 ? "s" : ""}`;

      // ✅ Mostramos resultados o mensaje
      if (resultados.length > 0) {
        tituloBusqueda.classList.add("titulo-con-resultados");
        tituloBusqueda.classList.remove("titulo-sin-resultados");

        resultadosDiv.innerHTML = resultados
          .map(
            (receta) => `
<a href="${basePath}/recetas/${receta.slug}/" class="recipe-card-buscador">
    <!-- 🔹 Ruta de imagen ajustada para Eleventy -->
    <img src="${basePath}${receta.imagen.startsWith("/") ? receta.imagen : "/" + receta.imagen}" 
         alt="Imagen de ${receta.titulo}" 
         class="imagen-buscador" />
    <h3 class="titulo-buscador">${receta.titulo}</h3>
    <section class="info-recipe-buscador">
      <div class="fila-iconos fila-1">
        <span>Dificultad media</span>
      </div>
      <div class="fila-iconos fila-2">
        <span>
          <strong><span class="material-symbols-outlined">av_timer</span></strong>
          45 m
        </span>
        <span>
          <strong><span class="material-symbols-outlined">group</span></strong>
          4
        </span>
      </div>
    </section>
  </div>
  <div class="about-section-buscador">
    <p class="about-text-buscador">${obtenerDescripcionReducidaPorPalabras(
      receta.descripcion,
      175
    )}</p>
    </div>
</a>`
          )
          .join("");
      } else {
        tituloBusqueda.classList.add("titulo-sin-resultados");
        tituloBusqueda.classList.remove("titulo-con-resultados");
        resultadosDiv.innerHTML =
          '<p class="no-buscador">No se encontraron recetas que coincidan con tu búsqueda.</p>';
      }
    })
    .catch((err) => {
      console.error(err);
      resultadosDiv.innerHTML =
        '<p class="no-buscador">Error al cargar las recetas.</p>';
    });
});
