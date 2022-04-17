// Variables
const listaCarros = document.querySelector('#lista-carros');
const submenu = document.querySelector('.submenu');

// Variables para Buscador
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

// Variables para Contacto
const btnEnviar = document.querySelector('#enviar');
const resetBtn = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');
// Variables para campos Contacto
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

ScrollReveal().reveal('.carros-nuevos', { delay: 200, easing: 'ease-in' });
ScrollReveal().reveal('.contenedor', { delay: 200, easing: 'ease-in' });
ScrollReveal().reveal('.contacto', { delay: 200, easing: 'ease-in' });
ScrollReveal().reveal('.horarios', { delay: 200, easing: 'ease-in' });

// Listeners
cargarEventListeners();
function cargarEventListeners(){
  document.addEventListener('DOMContentLoaded', () => {
    obtenerCarros();

    // Llenar el select de años(year)
    llenarSelect();

    // Iniciar app de Contacto
    iniciarApp();
  });
}

// ------------------- Funciones --------------------------- //

// Obtener los carros del json
function obtenerCarros(){
  mostrarCarros(carros);
}

// Mostrar los Carros en el DOM
function mostrarCarros(carros){
  const row1 = document.querySelector('.row-1');
  const row2 = document.querySelector('.row-2');
  const row3 = document.querySelector('.row-3');
  const row4 = document.querySelector('.row-4');

  carros.forEach(carro => {
    const {nombre, valoracion, id} = carro;

    const div = document.createElement('div');
    div.classList.add('col-4');

    const divCard = document.createElement('div');
    divCard.classList.add('card');

    const img = document.createElement('img');
    img.classList.add('imagen-carro', 'card-img-top');
    img.src = `img/carro${id}.jpg`;

    const infoCard = document.createElement('div');
    infoCard.classList.add('info-card', 'card-body');

    const nombreCarro = document.createElement('h4');
    nombreCarro.textContent = nombre;
    nombreCarro.classList.add('card-title');
    const valoracionCarro = document.createElement('span');
    valoracionCarro.textContent = ` ${valoracion}`;
    valoracionCarro.classList.add('text-muted');

    // Agregar información del carro al infoCard
    infoCard.appendChild(nombreCarro);
    infoCard.appendChild(valoracionCarro);

    // Agregar elementos a la tarjeta
    divCard.appendChild(img);
    divCard.appendChild(infoCard);

    // Agregar la tarjeta al contenedor principal
    div.appendChild(divCard);

    // Agregar el div a la fila
    if(id === 1 || id === 2 || id === 3){
      row1.appendChild(div);
    }else if(id === 4 || id === 5 || id === 6){
      row2.appendChild(div);
    }else if(id === 7 || id === 8 || id === 9){
      row3.appendChild(div);
    }else if(id === 10 || id === 11 || id === 12){
      row4.appendChild(div);
    }
  });
}


// -----------------------------CODIGO PARA EL BUSCADOR---------------------------- //

// Contenedor para los resultados
const resultado = document.querySelector('#resultado');
const max = new Date().getFullYear();
const min = max -10;


// Generar un objeto con la búsqueda
const datosBusqueda = {
  marca: '',
  year: ''
}

// Event Listener para los select de búsqueda
marca.addEventListener('change', e => {
  datosBusqueda.marca = e.target.value;

  filtrarAuto();
});
year.addEventListener('change', e => {
  datosBusqueda.year = parseInt(e.target.value);

  filtrarAuto();
});


// Funciones
function mostrarAutos(autos){
  // Eliminar el HTML previo
  limpiarHTML();

  autos.forEach( auto => {
    // Destructurar el arreglo
    const {marca, modelo, year, puertas, transmision, precio, color} = auto;
    const autoHTML = document.createElement('p');

    autoHTML.textContent = `
      ${marca} - ${modelo} - ${year} - ${puertas} Puertas - Transmisión: ${transmision} - Color: ${color} - Precio: $${precio}
    `;

    // Insertar en el HTML
    resultado.appendChild(autoHTML);
  });
}

// Función para limpiar el HTML
function limpiarHTML(){
  while(resultado.firstChild){
    resultado.removeChild(resultado.firstChild);
  }
}

// Genera los años del Select
function llenarSelect(){
  
  for (let i = max; i >= min; i--) {
    const opcion = document.createElement('option');
    opcion.value = i;
    opcion.textContent = i;

    // Agregar las opciones de año
    year.appendChild(opcion);
  }
}

// Función de filtrado de autos en base a la búsqueda
function filtrarAuto(){
  // Usaremos una función de alto nivel. Es una función que toma otra función
  const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);

  // Condicional para mostrar mensaje si la búsqueda no arroja resultado
  if(resultado.length){
    mostrarAutos(resultado);
  }else{
    noResultado();
  }
}

function filtrarMarca(auto){
  const {marca} = datosBusqueda;
  if(marca){
    return auto.marca === marca;
  }else{
    return auto;
  }
}
function filtrarYear(auto){
  const {year} = datosBusqueda;

  if(year){
    return auto.year === year;
  }else{
    return auto;
  }
}
function filtrarMinimo(auto){
  const {minimo} = datosBusqueda;

  if(minimo){
    return auto.precio >= minimo;
  }else{
    return auto;
  }
}
function filtrarMaximo(auto){
  const {maximo} = datosBusqueda;

  if(maximo){
    return auto.precio <= maximo;
  }else{
    return auto;
  }
}
function filtrarPuertas(auto){
  const {puertas} = datosBusqueda;

  if(puertas){
    return auto.puertas === puertas;
  }else{
    return auto;
  }
}
function filtrarTransmision(auto){
  const {transmision} = datosBusqueda;

  if(transmision){
    return auto.transmision === transmision;
  }else{
    return auto;
  }
}
function filtrarColor(auto){
  const {color} = datosBusqueda;

  if(color){
    return auto.color === color;
  }else{
    return auto;
  }
}

// Función para mostrar mensaje de que no se consiguieron resultados
function noResultado(){

  limpiarHTML();

  const noResultado = document.createElement('div');
  noResultado.classList.add('alerta', 'error');
  noResultado.textContent = 'No hay resultados que mostrar. Intenta otra búsqueda';
  resultado.appendChild(noResultado);
}
// -----------------------------CODIGO PARA EL BUSCADOR---------------------------- //



// -------------------------------CODIGO PARA CONTACTO----------------------------- //
// Event Listeners
eventListeners();
function eventListeners(){

  // campos del formulario
  email.addEventListener('blur', validarFormulario);
  asunto.addEventListener('blur', validarFormulario);
  mensaje.addEventListener('blur', validarFormulario);

  // Reinicia el formulario
  resetBtn.addEventListener('click', resetearFormulario);

  // Enviar email
  formulario.addEventListener('submit', enviarEmail);
}

// Funciones
function iniciarApp(){
  btnEnviar.disabled = true;
  btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
}

// Valida el Formulario
function validarFormulario(e){

  const er =  	
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if(e.target.value.length > 0){
    // Eliminar los errores
    const error = document.querySelector('p.error');
    if(error){
      error.remove();
    }    

    e.target.classList.remove('border', 'border-red-500');
    e.target.classList.add('border', 'border-green-500');
  }else{
    e.target.classList.remove('border', 'border-green-500');
    e.target.classList.add('border', 'border-red-500');
    mostrarError('Todos los campos son obligatorios.');
  }

  if(e.target.type === 'email'){

    if(er.test(e.target.value)){
      // Eliminar los errores
      const error = document.querySelector('p.error');
      if(error){
        error.remove();
      }

      e.target.classList.remove('border', 'border-red-500');
      e.target.classList.add('border', 'border-green-500');
    }else{
      e.target.classList.remove('border', 'border-green-500');
      e.target.classList.add('border', 'border-red-500');
      mostrarError('No es una dirección de correo válida.');
    }
  }

  // Fijate que la comprobación del email la hago con la expresión regular
  if(er.test(email.value) && asunto.value !== '' && mensaje.value !== ''){
    btnEnviar.disabled = false;
    btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
  }
}

function mostrarError(mensaje){
  const mensajeError = document.createElement('p');
  mensajeError.textContent = mensaje;
  mensajeError.classList.add('border', 'border-red-500', 'bg-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');

  // Aqui vamos a verificar para que los mensajes de error no se repitan cuando entre y salga de los inputs
  const errores = document.querySelectorAll('.error');
  if(errores.length === 0){
    // formulario.insertBefore(mensajeError, document.querySelector('.mb-10'));
    formulario.appendChild(mensajeError);
  }

  setTimeout(() => {
    mensajeError.remove();
  }, 3000);
}

// Envía el email
function enviarEmail(e){
  e.preventDefault();

  // Mostrar el spinner
  const spinner = document.querySelector('#spinner');
  spinner.style.display = 'flex';

  // Después de 3s ocultar el spinner y mostrar el mensaje
  setTimeout( () => {
    spinner.style.display = 'none';

    // Mensaje de enviado correctamente
    const parrafo = document.createElement('p');
    parrafo.textContent = 'El mensaje se envió correctamente';
    parrafo.classList.add('border', 'text-center', 'my-10', 'p-2', 'bg-green-100', 'border-green-500', 'text-green-500');

    // Inserta el párrafo antes del spinner
    formulario.insertBefore(parrafo, spinner);

    // Hacer desaparecer el mensaje después de 5s
    setTimeout(() => {
      parrafo.remove();
      resetearFormulario();
      iniciarApp();
    }, 5000);
  }, 3000);

  // setInterval(() => {
  //   console.log('Esta función se ejecuta cada 3 segundos');
  // }, 3000);
}

// Función que resetea el formulario
function resetearFormulario(){
  formulario.reset();
}
// -------------------------------CODIGO PARA CONTACTO----------------------------- //