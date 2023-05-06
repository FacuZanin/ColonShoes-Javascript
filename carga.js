const form = document.querySelector('.product-form');
const idInput = document.getElementById('id');
const nombreInput = document.getElementById('nombre');
const marcaInput = document.getElementById('marca');
const precioInput = document.getElementById('precio');
const tallesCheckboxes = document.querySelectorAll('.btn-check');
const imagenesInput = document.getElementById('imagenes');

form.addEventListener('submit', function(event) {
  event.preventDefault();
  
  const producto = {
    id: idInput.value,
    nombre: nombreInput.value,
    marca: marcaInput.value,
    precio: precioInput.value,
    talles: [],
    imagenes: []
  };

  tallesCheckboxes.forEach(function(checkbox) {
    if (checkbox.checked) {
      producto.talles.push(checkbox.labels[0].textContent);
    }
  });

  for (let i = 0; i < imagenesInput.files.length; i++) {
    producto.imagenes.push(imagenesInput.files[i].name);
  }

  const data = JSON.stringify(producto);

  fetch('/data.json', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    body: data
  })
  .then(function(response) {
    console.log(response);
  })
  .catch(function(error) {
    console.error(error);
  });
});
