function agregarZapatillas() {
  const zapatillas = [
    { nombre: "Zoom", marca: "Nike", precio: 1500 },
    { nombre: "NMD", marca: "Adidas", precio: 2000 },
    { nombre: "Suede", marca: "Puma", precio: 1000 }
  ]; // Creamos un array vacío para almacenar las zapatillas
  while (true) {
    const nombre = prompt("Ingresa el nombre de la zapatilla:");
    const marca = prompt("Ingresa la marca de la zapatilla:");
    const precio = parseInt(prompt("Ingresa el precio de la zapatilla:"));
    const zapatilla = {
      nombre,
      marca,
      precio
    };
    zapatillas.push(zapatilla);
    const continuar = confirm("¿Quieres agregar otra zapatilla?");
    if (!continuar) {
      break;
    }
  }
  
  const nombreBuscado = prompt("Ingresa el nombre de la zapatilla que quieres buscar:");
  const objetoBuscado = buscarObjeto(nombreBuscado, zapatillas);
  
  if (objetoBuscado === null) {
    console.log(`No se encontró ninguna zapatilla con el nombre "${nombreBuscado}"`);
  } else {
    const cuotas3 = calcularCuotas(objetoBuscado, 3);
    console.log(`Precio de la zapatilla "${objetoBuscado.nombre}" en 3 cuotas: $${cuotas3.precioCuota.toFixed(2)} por cuota. Precio total: $${cuotas3.precioTotal.toFixed(2)}.`);
    
    const cuotas6 = calcularCuotas(objetoBuscado, 6);
    console.log(`Precio de la zapatilla "${objetoBuscado.nombre}" en 6 cuotas: $${cuotas6.precioCuota.toFixed(2)} por cuota. Precio total: $${cuotas6.precioTotal.toFixed(2)}.`);
  }
  
  return zapatillas;
}

function buscarObjeto(nombreObjeto, arrayObjetos) {
  // Recorremos el array de objetos
  for (let i = 0; i < arrayObjetos.length; i++) {
    // Si encontramos el objeto buscado, lo retornamos
    if (arrayObjetos[i].nombre.toLowerCase() === nombreObjeto.toLowerCase()) {
      return arrayObjetos[i];
    }
  }
  // Si no se encuentra el objeto, retornamos null
  return null;
}

function calcularCuotas(objeto, cuotas) {
  // Calculamos el precio con el 5% de interés mensual
  const precioConInteres = objeto.precio * (1 + 0.05) ** cuotas;
  // Calculamos el precio de cada cuota
  const precioCuota = precioConInteres / cuotas;
  // Retornamos los resultados
  return {
    cuotas,
    precioCuota,
    precioTotal: precioConInteres
  };
}

console.log(agregarZapatillas());