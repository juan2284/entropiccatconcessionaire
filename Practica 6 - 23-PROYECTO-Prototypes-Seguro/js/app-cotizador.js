// Constructores
function Seguro(marca, year, tipo){
  this.marca = marca;
  this.year = year;
  this.tipo = tipo;
}

// Prototype para realizar la cotización con los datos
Seguro.prototype.cotizarSeguro = function( ){
  /* 
    1 = Americano incrementa 1.15
    2 = Asiático incrementa 1.05
    3 = Europeo incrementa 1.35
  */

    const americano = 1.15;
    const asiatico = 1.05;
    const europeo = 1.35;
    const basico = 1.3;
    const completo = 1.5;

    let cantidad;
    const base = 2000;

  switch(parseInt(this.marca)){
    case 1:
      cantidad = base * americano;
      break;

    case 2:
      cantidad = base * asiatico;
      break;

    case 3:
      cantidad = base * europeo;
      break;
  
    default:
      break;
  }

  // Leer el año
  // Por cada año de diferencia el costo se reduce un 3%
  const diferencia = new Date().getFullYear() - parseInt(this.year);
  cantidad -= ((diferencia * 3) * cantidad)/100;

  // Leer el tipo
  if(this.tipo === 'basico'){
    cantidad *= basico;
  }else{
    cantidad *= completo;
  }

  return cantidad;
}

function UI(){}

// Llena las opciones de los años (Estaremos usando un arrow function ya que no haremos uso de this):
UI.prototype.llenarOpciones = () => {
  const max = new Date().getFullYear(),
        min = max - 20;

  const selectYear = document.querySelector('#year');

  for (let i = max; i >= min; i--) {
    let option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    selectYear.appendChild(option);
  }
};

// Crear un prototype para mostrar alertas en pantalla
UI.prototype.mostrarMensaje = (mensaje, tipo) => {
  const div = document.createElement('div');
  
  if(tipo === 'error'){
    div.classList.add('error');
  }else{
    div.classList.add('correcto');
  }

  div.classList.add('mensaje', 'mt-10');
  div.textContent = mensaje;

  // Insertar en el HTML
  const formulario = document.querySelector('#cotizar-seguro');
  formulario.insertBefore(div, document.querySelector('#resultado'));

  setTimeout(() => {
    div.remove();
  }, 3000);

};

UI.prototype.mostrarResultado = (seguro, total) => {
  const {marca, year, tipo} = seguro;
  let textoMarca;

  switch(marca){
    case '1':
      textoMarca = 'Americano';      
      break;

    case '2':
      textoMarca = 'Asiático';      
      break;

    case '3':
      textoMarca = 'Europeo';      
      break;
  
    default:
      break;
  }

  // Crear el resultado
  const div = document.createElement('div');
  div.classList.add('mt-10');

  div.innerHTML = `
    <p class="header">Tu Resumen</p>
    <p class="font-bold">Marca: <span class="font-normal">${textoMarca}</span></p>
    <p class="font-bold">Año: <span class="font-normal">${year}</span></p>
    <p class="font-bold">Tipo: <span class="font-normal capitalize">${tipo}</span></p>
    <p class="font-bold">Total: <span class="font-normal">$${total}</span></p>
  `;

  const resultadoDiv = document.querySelector('#resultado');

  // Mostrar el spinner
  const spinner = document.querySelector('#cargando');
  spinner.style.display = 'block';

  setTimeout(() => {
    spinner.style.display = 'none'; // Se borra el spinner
    resultadoDiv.appendChild(div); // Se muestra el resultado
  }, 3000);
}

// Instanciar UI:
const ui = new UI();


// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  // Llenar el select con los años
  ui.llenarOpciones();
});

eventListeners();
function eventListeners(){
  const formulario = document.querySelector('#cotizar-seguro');
  formulario.addEventListener('submit', cotizarSeguro);
}

function cotizarSeguro(e){
  e.preventDefault();

  // Leer la marca seleccionada
  const marca = document.querySelector('#marca').value;

  // Leer el año seleccionado
  const year = document.querySelector('#year').value;

  // Leer el tipo de cobertura
  const tipo = document.querySelector('input[name="tipo"]:checked').value;

  // Validación
  if(marca === ''|| year === '' || tipo === ''){
    ui.mostrarMensaje('Todos los campos son obligatorios...', 'error');
    return;
  }

  ui.mostrarMensaje('Cotizando...', 'correcto');

  // Ocultar las cotizaciones previas
  const resultados = document.querySelector('#resultado div');
  if(resultados != null){
    resultados.remove();
  }

  // Instanciar el seguro
  const seguro = new Seguro(marca, year, tipo);
  const total = seguro.cotizarSeguro();

  // Utilizar el prototype que va a cotizar
  ui.mostrarResultado(seguro, total);
}