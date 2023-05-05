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

function generarSubtotal(carritos) {
  let subtotal = 0;
  for (let i = 0; i < carritos.length; i++) {
    subtotal += carritos[i].precio;
  }
  const subtotalTD = document.querySelector('.subtotal');
  subtotalTD.insertAdjacentHTML('beforeend', `   $  ${subtotal.toLocaleString()}`);
  return subtotal; // Devolver el valor calculado
}

function generarEnvio(subtotal) {
  const envioTD = document.querySelector('.envio');
  let envio = 0;
  if (typeof subtotal === 'number' && subtotal > 30000) {
    envioTD.insertAdjacentHTML('beforeend', '   Envío gratis');
  } else {
    envio = 2500;
    envioTD.insertAdjacentHTML('beforeend', `   $ ${envio.toLocaleString()}`);
  }
  return envio; // Devolver el valor calculado
}

function generarTotal(subtotal, envio) {
  const total = subtotal + envio;
  const totalTD = document.querySelector('.total');
  totalTD.insertAdjacentHTML('beforeend', `   $  ${total.toLocaleString()}`);
}

function generarGrid(productos) {
  let productGridHTML = '<div class="row">';
  productos.forEach((producto, index) => {
    const card = generarTarjeta(producto, index);
    productGridHTML += card;
  });
  productGridHTML += '</div>';
  carritoDiv.innerHTML = productGridHTML;

  const carritos = JSON.parse(localStorage.getItem('carritos'));
  const subtotal = generarSubtotal(carritos);
  const envio = generarEnvio(subtotal);
  generarTotal(subtotal, envio);
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

/*
// Obtener el array de carritos del localStorage
let carritos = JSON.parse(localStorage.getItem('carritos'));

// Calcular el subtotal sumando los precios de cada objeto en el array de carritos
let subtotal = 0;
for (let i = 0; i < carritos.length; i++) {
    subtotal += carritos[i].precio;
}

// Agregar el subtotal a la tarjeta
let preciosElement = document.querySelector('.precios');
let subtotalElement = document.createElement('td');
subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
preciosElement.appendChild(subtotalElement);

// Verificar si el subtotal es mayor a 30000 y agregar el texto de envío gratis si es necesario
let envioElement = document.querySelector('.envio');
if (subtotal > 30000) {
    let envioGratisElement = document.createElement('td');
    envioGratisElement.textContent = 'Envío gratis';
    envioElement.appendChild(envioGratisElement);
}

// Calcular el total y agregarlo a la tarjeta
let total = subtotal; // Asumiendo que el costo de envío es $5.00
let totalElement = document.querySelector('.total');
let totalTdElement = totalElement.querySelector('td');
totalTdElement.textContent = `$${total.toFixed(2)}`;
*/