const carrito = JSON.parse(localStorage.getItem('carritos')) || [];
const carritoDiv = document.getElementById('carritoDiv');

function generarTarjeta(producto, index) {
  const card = `
    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-md-2">
            <img src="${producto.imagen}" class="img-fluid" alt="">
          </div>
          <div class="col-md-6">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">Descripción del producto.</p>
          </div>
          <div class="col-md-2">
            <p class="card-text">$${producto.precio}</p>
          </div>
          <div class="col-md-2">
            <button class="btn btn-danger" data-index="${index}">Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  `;
  return card;
}

function generarGrid(productos) {
  let productGridHTML = '<div class="row">';
  productos.forEach((producto, index) => {
    const card = generarTarjeta(producto, index);
    productGridHTML += card;
  });
  productGridHTML += '</div>';
  carritoDiv.innerHTML = productGridHTML;
}

generarGrid(carrito);

carritoDiv.addEventListener('click', (event) => {
  if (event.target.classList.contains('btn-danger')) {
    const index = event.target.getAttribute('data-index');
    const nuevoCarrito = carrito.filter((producto, i) => i !== Number(index));
    localStorage.setItem('carritos', JSON.stringify(nuevoCarrito));
    location.reload();
  }
});
