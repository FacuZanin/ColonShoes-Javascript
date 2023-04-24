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
const productGridNuevo = document.getElementById("productGrid");

// Escuchar los cambios en los checkboxes y en el rango de precios
chkZapatillas.addEventListener("change", filtrar);
chkIndumentaria.addEventListener("change", filtrar);
chkHombre.addEventListener("change", filtrar);
chkMujer.addEventListener("change", filtrar);
chkAdidas.addEventListener("change", filtrar);
chkJordan.addEventListener("change", filtrar);
chkNike.addEventListener("change", filtrar);
rangePrecio.addEventListener("input", filtrar);

// Función de filtrado
function filtrar() {
  // Obtener los valores seleccionados
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

  //  Generar la tarjeta con los productos
  productGridNuevo.innerHTML = "";
  productosFiltrados.forEach((producto) => {
    const card = `
      <div class="col-lg-4 col-md-6 mb-4">
        <div class="card h-100">
          <a href="#"><img class="card-img-top" src="${producto.imagen}" alt=""></a>
          <div class="card-body">
            <p class="card-title">
              <a href="#" class="product-link" data-id="${producto.id}">${producto.nombre}</a>
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
    `;
    productGrid.innerHTML += card;
  });
  
  // Obtener todos los enlaces de productos y añadir un event listener
  const productLinks = document.querySelectorAll('.product-link');
  productLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const id = link.getAttribute('data-id');
      window.location.href = `producto-${id}.html`;
    });
  });
  
  // Obtener todos los iconos de corazón y añadir un event listener
  const heartIcons = document.querySelectorAll('.heart-icon');

    // Agregar evento click a cada corazón
    heartIcons.forEach(icon => {
    icon.addEventListener('click', (event) => {
    event.preventDefault();
    const id = icon.getAttribute('data-id');
    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

    // Si el producto ya está en la lista de favoritos, removerlo y cambiar color del corazón a su estado original
    if (!favoritos.includes(id)) {
      favoritos.push(id);
      localStorage.setItem('favoritos', JSON.stringify(favoritos));
      icon.classList.replace('heart-icon', 'heart-icon--active');
      icon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="red" class="bi bi-heart-fill" viewBox="0 0 16 16" style="fill: red;">
          <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
        </svg>
      `;
    } else {
      const index = favoritos.indexOf(id);
      favoritos.splice(index, 1);
      localStorage.setItem('favoritos', JSON.stringify(favoritos));
      icon.classList.replace('<bottonheart-icon--active', 'heart-icon');
      icon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
        </svg>
      `;
    }
  });
});

// Mantener los elementos guardados en favoritos aun refrescando la pagina
window.addEventListener('load', () => {
  const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
  const heartIcons = document.querySelectorAll('.heart-icon');
  heartIcons.forEach(icon => {
    const id = icon.getAttribute('data-id');
    if (favoritos.includes(id)) {
      icon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16" style="fill: red;">
          <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
        </svg>
      `;
      icon.classList.add('heart-icon--active');
    }
  });
});


// Agregar evento DOMContentLoaded para verificar si los productos están en la lista de favoritos y cambiar el color del corazón si es necesario
document.addEventListener('DOMContentLoaded', () => {
  const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
  favoritos.forEach((favorito) => {
    const icon = document.querySelector(`.heart-icon[data-id="${favorito}"]`);
    icon.classList.add('heart-icon--active');
  });
});

// Muestra el precio actual de lo que vale el en el filtro
const rangePrecioValor = document.getElementById('rangePrecioValor');
rangePrecio.addEventListener('input', () => {
  rangePrecioValor.textContent = rangePrecio.value.toLocaleString();
});


}


// Mostrar todos los productos al cargar la página
filtrar();
