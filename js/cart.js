let idUsuario = "25801";
let agregar = "";
let subtotal ;
let inputsTarjeta= document.querySelectorAll('.div-tarjeta input');
let inputsTranferencia= document.querySelectorAll('.div-transferencia input');
let BotonSubmit = document.getElementById('btn-submit');
let formCart = document.getElementById('form-cart');
let formPago = document.getElementById('form-modal');
let BotonPago = document.getElementById('boton-pago');
let pagoValido = document.getElementById('pago-valido');
let checkTransferecia = document.getElementById('check-transferencia');
let checkTarjeta = document.getElementById('check-tarjeta');

let articulosCarrito = getJSONData(CART_INFO_URL + idUsuario + EXT_TYPE).then(function (resultObj) {
  if (resultObj.status === "ok") {
    articulosCarrito = resultObj.data.articles;

  }

  for (let i = 0; i < articulosCarrito.length; i++) {

    agregar += `<tr>
        <th ><img src="${articulosCarrito[i].image}" width="120" alt="imagen" ></th>
        <td>${articulosCarrito[i].name}</td>
        <td>${articulosCarrito[i].currency} ${articulosCarrito[i].unitCost}</td>
        <td><div class="col-7">
          <input  id ="input-cantidad${i}" type="number" name="input-cantidad${i}"  class="form-control" id="productCostInput" placeholder value="${articulosCarrito[i].count}" min="1" required>
      </div></td>
        <td id="subtotal">${articulosCarrito[i].currency} ${articulosCarrito[i].unitCost}</td>
      </tr>`;
    document.getElementById("articulos-acomprar").innerHTML = agregar;
    subtotal = articulosCarrito[0].unitCost ;
    actualizarCostos();
    document.getElementById("input-cantidad" + i).addEventListener('input', function () {
      let cantidad = document.getElementById("input-cantidad" + i).value;
      subtotal=articulosCarrito[i].unitCost * cantidad;
      document.getElementById("subtotal").innerHTML = `${articulosCarrito[i].currency} ${subtotal}`
      actualizarCostos();
    });

    
  }
 
 

});

  //alert flotante
  var alertPlaceholder = document.getElementById('liveAlertPlaceholder');

function alert(message, type) {
  var wrapper = document.createElement('div')
  wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'

  alertPlaceholder.append(wrapper)
}

function deshabilitarInputs(inputs){
  for(let input of inputs){
    input.disabled=true;
    input.value="";
  }
}
function habilitarInputs(inputs){
  for(let input of inputs){
    input.disabled=false;
  }
}
function habilitarTransferencia(){
  deshabilitarInputs(inputsTarjeta);
habilitarInputs(inputsTranferencia)
checkTransferecia.checked=true;

}

function habilitarTarjeta(){
  deshabilitarInputs(inputsTranferencia);
  habilitarInputs(inputsTarjeta)
  checkTarjeta.checked= true;
}

function calculoEnvio(){

  let premium = 0.15;
  let express = 0.07;
  let standard = 0.05;
  if(document.getElementById('standardradio').checked){
return Math.round(subtotal * standard);
  }else if(document.getElementById('expressradio').checked){
    return Math.round(subtotal * express);
  }
  else{
    return Math.round(subtotal * premium);
  }
}

function actualizarCostos(){
document.getElementById("p-subtotal").innerHTML = `USD ${subtotal}`;
document.getElementById("p-envio").innerHTML = `USD ${calculoEnvio()}`;
document.getElementById("p-total").innerHTML = `USD ${calculoEnvio()+subtotal}`;
}

function pagoSeleccionado(){
  if(checkTarjeta.checked){
    pagoValido.innerHTML = `Selecciono correctamente el pago con Tarjeta de crédito`;

  }else if (checkTransferecia.checked){
    pagoValido.innerHTML = `Selecciono correnctamente el pago con Transferencia bancaria`;

  }
}

function hacerValidacion(event) {
  if (!formCart.checkValidity() || !formPago.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
      alert('¡Complete los campos!', 'danger');
  }else{alert('¡Compra realizada con éxito!', 'success');}
  if ( !formPago.checkValidity()) {
   
    BotonPago.setAttribute("class", "btn btn-outline-info is-invalid");
  }else{
    pagoSeleccionado();
   
    BotonPago.setAttribute("class", "btn btn-outline-info is-valid");
  }
  if (formCart.checkValidity() && formPago.checkValidity()) {
    alert('¡Compra realizada con éxito!', 'success');}
  formCart.classList.add('was-validated');
  formPago.classList.add('was-validated');

}


checkTransferecia.addEventListener('click',habilitarTransferencia);

checkTarjeta.addEventListener('click',habilitarTarjeta);

BotonSubmit.addEventListener('click',function(){
  formCart.addEventListener('submit',hacerValidacion);
  formPago.addEventListener('submit',hacerValidacion);
});


document.getElementById('premiumradio').addEventListener('click',actualizarCostos);
document.getElementById('expressradio').addEventListener('click',actualizarCostos);
document.getElementById('standardradio').addEventListener('click',actualizarCostos);