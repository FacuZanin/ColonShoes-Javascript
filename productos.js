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
const productGrid = document.getElementById("productGrid");

chkZapatillas.addEventListener("change", () => {
  filtrarProductos();
});

chkIndumentaria.addEventListener("change", () => {
  filtrarProductos();
});

rangePrecio.addEventListener("input", () => {
  filtrarProductos();
});

chkHombre.addEventListener("change", () => {
  filtrarProductos();
});

chkMujer.addEventListener("change", () => {
  filtrarProductos();
});

chkAdidas.addEventListener("change", () => {
  filtrarProductos();
});

chkJordan.addEventListener("change", () => {
  filtrarProductos();
});

chkNike.addEventListener("change", () => {
  filtrarProductos();
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
    filtro.tipo.push("Indumentaria");
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

function filtrarProductos() {
  const filtro = obtenerFiltro();

  fetch("/data.json")
    .then(response => response.json())
    .then(data => {
      const productosFiltrados = data.productos.filter((producto) => {
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

      generarGrid(productosFiltrados);
    })
    .catch(error => {
      console.error(error);
    });
}

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

function generarGrid(productos) {
  productGrid.innerHTML = "";
  productos.forEach((producto) => {
    const card = generarTarjeta(producto);
    productGrid.innerHTML += card;
  });
}

filtrarProductos();
