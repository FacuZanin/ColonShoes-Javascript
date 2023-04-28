const zapatillas = [
  { id:"1-Ultraboost", tipo:"Zapatillas", genero:"Hombre", nombre: "Ultraboost", marca: "Adidas", precio: 52500, imagen:"archivos/imagenes de zapatillas/Zapatillas Adidas Ultraboost 2021.jpeg"},
  { id:"2-HaveANikeDay", tipo:"Zapatillas", genero:"Hombre", nombre: "Have a Nike Day", marca: "Nike", precio: 42000, imagen:"archivos/imagenes de zapatillas/Zapatillas AF1 Have a Nike Day.jpeg" },
  { id:"3-1world1People", tipo:"Zapatillas", genero:"Hombre", nombre: "Kyrie Irving 1 World 1 People", marca: "Nike", precio: 105000, imagen:"archivos/imagenes de zapatillas/Zapatillas Kyrie Irving 1 World 1 People.jpeg" },
  { id:"4-Blazzer77", tipo:"Zapatillas", genero:"Hombre", nombre: "Blazzer 77", marca: "Nike", precio: 77000, imagen:"archivos/imagenes de zapatillas/Zapatillas Nike Blazer 77.jpeg" },
  { id:"5-CelestineBlue", tipo:"Zapatillas", genero:"Mujer", nombre: "Celestine Blue", marca: "Jordan", precio: 69000, imagen:"archivos/imagenes de zapatillas/Zapatillas Nike Jordan Air Zoom Celestine Blue.jpeg" },
  { id:"6-Halloween", tipo:"Zapatillas", genero:"Hombre", nombre: "SB Dunk Low Halloween", marca: "Nike", precio: 59800, imagen:"archivos/imagenes de zapatillas/Zapatillas Nike SB Dunk Low Halloween.jpeg" },
  { id:"7-Vapormax", tipo:"Zapatillas", genero:"Hombre", nombre: "Vapormax", marca: "Nike", precio: 55000, imagen:"archivos/imagenes de zapatillas/Zapatillas Nike Vapormax.jpeg" }
];

// CODIGO DEL FILTRO !!!!!!
// Obtener los elementos HTML relevantes
const chkZapatillas = document.getElementById("chkZapatillas");
const chkIndumentaria = document.getElementById("chkIndumentaria");
const chkHombre = document.getElementById("chkHombre");
const chkMujer = document.getElementById("chkMujer");
const chkAdidas = document.getElementById("chkAdidas");
const chkJordan = document.getElementById("chkJordan");
const chkNike = document.getElementById("chkNike");
const rangePrecio = document.getElementById("rangePrecio");
const heartIcons = document.querySelectorAll(".heart-icon");

// Escuchar los cambios en los checkboxes y en el rango de precios

chkZapatillas.addEventListener("change", () => {
  generarGrid(filtrarProductos());
});

chkIndumentaria.addEventListener("change", () => {
  generarGrid(filtrarProductos());
});

chkHombre.addEventListener("change", () => {
  generarGrid(filtrarProductos());
});

chkMujer.addEventListener("change", () => {
  generarGrid(filtrarProductos());
});

chkAdidas.addEventListener("change", () => {
  generarGrid(filtrarProductos());
});

chkJordan.addEventListener("change", () => {
  generarGrid(filtrarProductos());
});

chkNike.addEventListener("change", () => {
  generarGrid(filtrarProductos());
});

rangePrecio.addEventListener("input", () => {
  generarGrid(filtrarProductos());
});

heartIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    agregarFavorito(icon, favoritos);
  });
});

const rangePrecioValor = document.getElementById('rangePrecioValor');
rangePrecio.addEventListener('input', () => {
  rangePrecioValor.textContent = rangePrecio.value.toLocaleString();
});

// Función para obtener los valores seleccionados
function obtenerFiltro() {
  const filtro = {
    tipo: [],
    genero: [],
    marca: [],
    precioMax: rangePrecio.value
  };

  if (chkZapatillas.checked) {
    filtro.tipo.push("Zapatillas");
  }
  if (chkIndumentaria.checked) {
    filtro.tipo.push("indumentaria");
  }
  if (chkHombre.checked) {
    filtro.genero.push("Hombre");
  }
  if (chkMujer.checked) {
    filtro.genero.push("Mujer");
  }
  if (chkAdidas.checked) {
    filtro.marca.push("Adidas");
  }
  if (chkJordan.checked) {
    filtro.marca.push("Jordan");
  }
  if (chkNike.checked) {
    filtro.marca.push("Nike");
  }

  return filtro;
}

  // Función para filtrar los productos según los valores seleccionados
function filtrarProductos() {
  const filtro = obtenerFiltro();

  // Filtrar los objetos según los valores seleccionados
  const productosFiltrados = zapatillas.filter((producto) => {
    let cumpleFiltro = true;

    if (filtro.tipo.length > 0 && !filtro.tipo.includes(producto.tipo)) {
      cumpleFiltro = false;
    }
    if (
      filtro.genero.length > 0 &&
      !filtro.genero.includes(producto.genero)
    ) {
      cumpleFiltro = false;
    }
    if (
      filtro.marca.length > 0 &&
      !filtro.marca.includes(producto.marca)
    ) {
      cumpleFiltro = false;
    }
    if (producto.precio > filtro.precioMax) {
      cumpleFiltro = false;
    }

    return cumpleFiltro;
  });

  return productosFiltrados;
}

// Función para generar la tarjeta de producto en el grid
function generarTarjeta(producto) {
  const card = `
    <div class="col-lg-4 col-md-6 mb-4">
      <div class="card h-100 border-0">
        <button><a class="product-link" data-id="${producto.id}"><img class="card-img-top" src="${producto.imagen}" alt=""></a></button>
        <div class="card-body">
          <p class="card-title">
            <button><a class="product-link" data-id="${producto.id}">${producto.nombre}</a></button>
          </p>
          <div class="d-flex justify-content-between"><h4>$${producto.precio}</h4>
            <div class="heart-icon" data-id="${producto.id}">
              <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  return card;
}

// Función para generar el grid de productos
function generarGrid(zapatillas) {
  const productGrid = document.getElementById("productGrid");
  productGrid.innerHTML = "";
  zapatillas.forEach((producto) => {
    const card = generarTarjeta(producto);
    productGrid.innerHTML += card;
  });
}

generarGrid(filtrarProductos());
