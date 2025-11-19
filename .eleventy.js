const htmlmin = require("html-minifier-terser");

module.exports = function(eleventyConfig) {
  // Copiar carpetas sin procesar
  eleventyConfig.addPassthroughCopy("imagenes");
  eleventyConfig.addPassthroughCopy("estilos");
  eleventyConfig.addPassthroughCopy("scripts");

  // Copiar los JSON de datos al sitio final
  eleventyConfig.addPassthroughCopy({ "src/_data/recetas.json": "recetas.json" });
  eleventyConfig.addPassthroughCopy({ "src/_data/categorias.json": "categorias.json" });

  /*
  // Minificar HTML
  eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
    if (outputPath && outputPath.endsWith(".html")) {
      let minified = htmlmin.minify(content, {
        collapseWhitespace: true,
        removeComments: true,
        minifyCSS: true,
        minifyJS: true,
      });
      return minified;
    }
    return content;
  });
  */

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    passthroughFileCopy: true,
    templateFormats: ["njk", "html", "md"],
    pathPrefix: "/recetasypico/"
  };
};
