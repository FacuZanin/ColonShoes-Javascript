const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

const favoritosDiv = document.getElementById('favoritos');
// Crear constante para el icono
const heartIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="red" class="bi bi-heart-fill" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
</svg>
`;

const carrito = `
  <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
  </svg>
`;

function generarTarjeta(producto) {
    const card = `
      <div class="col-lg-4 col-md-6 mb-4">
        <div class="card h-100 border-0">
          <button><a class="product-link" data-id="${producto.id}"><img class="card-img-top" src="${producto.imagen}" alt=""></a></button>
          <div class="card-body">
            <p class="card-title">
              <button><a class="product-link" data-id="${producto.id}">${producto.nombre}</a></button>
            </p>
            <div class="d-flex justify-content-between">
              <h4>$${producto.precio}</h4>
            <div>
            <button><class="heart-icon" data-id="${producto.id}">
                ${heartIcon}
            </class=></button>
            <button><class="cart-icon" data-id="${producto.id}">
                ${carrito}
          </class=></button>
          </div>
          </div>
          </div>
        </div>
      </div>
    `;
    return card;
  }
  

function generarGrid(productos) {
    let productGridHTML = '<div class="row">';
    productos.forEach((producto) => {
      const card = generarTarjeta(producto);
      productGridHTML += card;
    });
  
    productGridHTML += '</div>';
  
    favoritosDiv.innerHTML = productGridHTML;
  
    const heartIcons = document.querySelectorAll(".heart-icon");
    heartIcons.forEach((icon) => {
      icon.addEventListener("click", (event) => {
        event.preventDefault();
        const id = icon.getAttribute("data-id");
  
        const producto = productos.find((p) => p.id === id);
  
        if (producto && !favoritos.includes(producto)) {
          favoritos.push(producto);
          localStorage.setItem("favoritos", JSON.stringify(favoritos));
        } else {
          const index = favoritos.findIndex((p) => p.id === id);
          if (index > -1) {
            favoritos.splice(index, 1);
            localStorage.setItem("favoritos", JSON.stringify(favoritos));
            const card = icon.closest(".card");
            card.parentNode.removeChild(card);
          }
        }
        
        icon.classList.toggle("heart-icon--active");
        
      });
  
      const id = icon.getAttribute("data-id");
      const producto = productos.find((p) => p.id === id);
  
      if (producto && favoritos.includes(producto)) {
        icon.classList.add("heart-icon--active");
      }
    });
  }
  

generarGrid(favoritos);
