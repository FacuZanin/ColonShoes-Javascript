// Obtener el ID del producto de la URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// Obtener los detalles del producto de la API
fetch(`https://api.tienda.com/productos/${productId}`)
  .then(response => response.json())
  .then(data => {
    // Mostrar los detalles del producto en la página
    const productDetailsDiv = document.getElementById('product-details');
    productDetailsDiv.innerHTML = `
      <h2>${data.nombre}</h2>
      <img src="${data.imagen}">
      <p>${data.descripcion}</p>
      <h3>Precio: $${data.precio}</h3>
    `;
  })
  .catch(error => console.error(error));
