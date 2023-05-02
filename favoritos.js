const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

const favoritosDiv = document.getElementById('favoritos');

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
        }
  
        icon.classList.add("heart-icon--active");
      });
  
      const id = icon.getAttribute("data-id");
      const producto = productos.find((p) => p.id === id);
  
      if (producto && favoritos.includes(producto)) {
        icon.classList.add("heart-icon--active");
      }
    });
  }
  

generarGrid(favoritos);
