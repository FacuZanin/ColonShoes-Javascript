// Obtener los elementos HTML relevantes
const chkZapatillas = document.getElementById("chkZapatillas");
const chkIndumentaria = document.getElementById("chkIndumentaria");
const chkHombre = document.getElementById("chkHombre");
const chkMujer = document.getElementById("chkMujer");
const chkAdidas = document.getElementById("chkAdidas");
const chkJordan = document.getElementById("chkJordan");
const chkNike = document.getElementById("chkNike");
const rangePrecio = document.getElementById("rangePrecio");
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

function guardarFavorito(producto) {
  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  if (!favoritos.includes(producto)) {
    favoritos.push(producto);
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  }
}

function eliminarFavorito(producto) {
  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  let index = favoritos.findIndex(p => p.id === producto.id);
  if (index !== -1) {
    favoritos.splice(index, 1);
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  }
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
// Crear constante para el icono
const heartIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
  </svg>
`;

const carrito = `
  <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
  </svg>
`;

// Usar constante en la tarjeta
function generarTarjeta(producto) {
  const card = `
  <div class="col-lg-4 col-md-6 mb-4">
  <div class="card h-100 border-0">
    <button>
      <a class="product-link" data-id="${producto.id}">
        <img class="card-img-top" src="${producto.imagen}" alt="">
      </a>
    </button>
    <div class="card-body">
      <p class="card-title">
        <button>
          <a class="product-link" data-id="${producto.id}">
            ${producto.nombre}
          </a>
        </button>
      </p>
      <div class="d-flex justify-content-between">
        <h4>$${producto.precio}</h4>
        <div>
          <button>
            <div class="heart-icon" data-id="${producto.id}">
              ${heartIcon}
            </div>
          </button>
          <button>
            <div class="cart-icon" data-id="${producto.id}">
              ${carrito}
            </div>
          </button>
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
  const heartIcons = document.querySelectorAll(".heart-icon");
  heartIcons.forEach((icon) => {
    icon.addEventListener("click", (event) => {
      event.preventDefault();
      const id = icon.getAttribute("data-id");
      let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
      const producto = productos.find((p) => p.id === id);
      const index = favoritos.findIndex((p) => p.id === id);
      if (producto && index === -1) {
        favoritos.push(producto);
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
        icon.classList.add("heart-icon--active");
      } else if (producto && index !== -1) {
        favoritos.splice(index, 1);
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
        icon.classList.remove("heart-icon--active");
      }
    });
    const id = icon.getAttribute("data-id");
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    const producto = productos.find((p) => p.id === id);
    if (producto && favoritos.findIndex((p) => p.id === id) !== -1) {
      icon.classList.add("heart-icon--active");
    }
  });
  const cartIcons = document.querySelectorAll(".cart-icon");
  cartIcons.forEach((icon) => {
    icon.addEventListener("click", (event) => {
      event.preventDefault();
      const id = icon.getAttribute("data-id");
      let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
      const producto = productos.find((p) => p.id === id);
      const index = carrito.findIndex((p) => p.id === id);
      if (producto && index === -1) {
        carrito.push(producto);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        icon.classList.add("cart-icon--active");
      } else if (producto && index !== -1) {
        carrito.splice(index, 1);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        icon.classList.remove("cart-icon--active");
      }
    });
    const id = icon.getAttribute("data-id");
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const producto = productos.find((p) => p.id === id);
    if (producto && carrito.findIndex((p) => p.id === id) !== -1) {
      icon.classList.add("cart-icon--active");
    }
  });

}

  
filtrarProductos();
