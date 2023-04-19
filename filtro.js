// Obtener los elementos del DOM que necesitamos
const chkZapatillas = document.getElementById('chkZapatillas');
const chkIndumentaria = document.getElementById('chkIndumentaria');
const chkHombre = document.getElementById('chkHombre');
const chkMujer = document.getElementById('chkMujer');
const chkAdidas = document.getElementById('chkAdidas');
const chkNike = document.getElementById('chkNike');
const rangePrecio = document.getElementById('rangePrecio');

// Agregar eventos de cambio a los elementos del DOM
chkZapatillas.addEventListener('change', filterResults);
chkIndumentaria.addEventListener('change', filterResults);
chkHombre.addEventListener('change', filterResults);
chkMujer.addEventListener('change', filterResults);
chkAdidas.addEventListener('change', filterResults);
chkNike.addEventListener('change', filterResults);
rangePrecio.addEventListener('input', filterResults);

// Función que se ejecuta cuando hay un cambio en algún elemento del filtro
function filterResults() {
  // Obtener los valores actuales de los elementos del filtro
  const isZapatillas = chkZapatillas.checked;
  const isIndumentaria = chkIndumentaria.checked;
  const isHombre = chkHombre.checked;
  const isMujer = chkMujer.checked;
  const isAdidas = chkAdidas.checked;
  const isNike = chkNike.checked;
  const precioMin = rangePrecio.value;

  // Obtener todos los elementos de la página que deben ser filtrados
  const productos = document.querySelectorAll('.producto');

  // Iterar sobre los elementos y mostrar/ocultar según los criterios de filtrado
  productos.forEach(producto => {
    const tipoProducto = producto.getAttribute('data-tipo');
    const genero = producto.getAttribute('data-genero');
    const marca = producto.getAttribute('data-marca');
    const precio = parseInt(producto.getAttribute('data-precio'));

    const mostrarProducto =
      (isZapatillas && tipoProducto === 'zapatillas' ||
       isIndumentaria && tipoProducto === 'indumentaria') &&
      (isHombre && genero === 'hombre' ||
       isMujer && genero === 'mujer') &&
      (isAdidas && marca === 'adidas' ||
       isNike && marca === 'nike') &&
      precio >= precioMin;

    if (mostrarProducto) {
      producto.style.display = 'block';
    } else {
      producto.style.display = 'none';
    }
  });
}
