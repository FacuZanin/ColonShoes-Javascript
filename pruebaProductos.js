const chkZapatillas = document.getElementById("chkZapatillas");
const chkIndumentaria = document.getElementById("chkIndumentaria");
const heartIcons = document.querySelectorAll(".heart-icon");
const productGrid = document.getElementById("productGrid");

chkZapatillas.addEventListener("change", () => {
  filtrarProductos();
});

chkIndumentaria.addEventListener("change", () => {
  filtrarProductos();
});

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
        <div class="heart-icon" data-id="${producto.id}">
          <button><svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
          </svg></button>
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
  
  // Agregamos el evento click a cada ícono de corazón
  const heartIcons = document.querySelectorAll(".heart-icon");
  heartIcons.forEach(icon => {
  icon.addEventListener('click', (event) => {
  event.preventDefault();
  const id = icon.getAttribute('data-id');
  let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
  if (!favoritos.includes(id)) {
    favoritos.push(id);
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
  }

  icon.classList.add('heart-icon--active');
});

// Verificamos si el producto ya fue agregado a favoritos y le agregamos la clase heart-icon--active
const id = icon.getAttribute('data-id');
let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

if (favoritos.includes(id)) {
  icon.classList.add('heart-icon--active');
}
});
}

filtrarProductos();