let idUsuario = "25801";
let agregar = "";
let subtotal = 15200 ;
let inputsTarjeta= document.querySelectorAll('.div-tarjeta input[type="text"]');
let inputsTranferencia= document.querySelectorAll('.div-transferencia input[type="text"]');
let prueba;
let BotonSubmit = document.getElementById('btn-submit');
let formulario = document.getElementById('formulario');
actualizarCostos();
/* fetch(CART_INFO_URL + idUsuario + EXT_TYPE) 
.then(respuesta => respuesta.json())
.then(datos => {
    articulosCarrito = datos.articles; 
}); */
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
          <input  id ="input-cantidad${i}" type="number" name="input-cantidad"  class="form-control" id="productCostInput" placeholder value="${articulosCarrito[i].count}" min="1">
      </div></td>
        <td id="subtotal">${articulosCarrito[i].currency} ${articulosCarrito[i].unitCost}</td>
      </tr>`;
    document.getElementById("articulos-acomprar").innerHTML = agregar;
    document.getElementById("input-cantidad" + i).addEventListener('input', function () {
      let cantidad = document.getElementById("input-cantidad" + i).value;
      subtotal=articulosCarrito[i].unitCost * cantidad;
      document.getElementById("subtotal").innerHTML = `${articulosCarrito[i].currency} ${subtotal}`
      actualizarCostos();
    });

    
  }
 
 /*  prueba=document.querySelectorAll('.modal-body input[type="radio"]'); */

});

  //alert flotante
  var alertPlaceholder = document.getElementById('liveAlertPlaceholder');
var alertTrigger = document.getElementById('submit');

function alert(message, type) {
  var wrapper = document.createElement('div')
  wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'

  alertPlaceholder.append(wrapper)
}

function deshabilitarInputs(inputs){
  for(let input of inputs){
    input.disabled=true;
  }
}
function habilitarInputs(inputs){
  for(let input of inputs){
    input.disabled=false;
  }
}
function calculoEnvio(){

  let premium = 0.15;
  let express = 0.07;
  let standard = 0.05;
  if(document.getElementById('standardradio').checked){
return subtotal * standard;
  }else if(document.getElementById('expressradio').checked){
    return subtotal * express;
  }
  else{
    return subtotal * premium;
  }
}

function actualizarCostos(){
document.getElementById("p-subtotal").innerHTML = `USD ${subtotal}`;
document.getElementById("p-envio").innerHTML = `USD ${calculoEnvio()}`;
document.getElementById("p-total").innerHTML = `USD ${calculoEnvio()+subtotal}`;
}

function hacerValidacion(event) {
  if (!formulario.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
      alert('¡Complete los campos!', 'danger');
  }else{
    alert('¡Compra realizada con éxito!', 'success');
    
    
  }
  formulario.classList.add('was-validated');

}

document.getElementById('check-transferencia').addEventListener('click',function(){
deshabilitarInputs(inputsTarjeta);
habilitarInputs(inputsTranferencia)
});

document.getElementById('check-tarjeta').addEventListener('click',function(){
  deshabilitarInputs(inputsTranferencia);
  habilitarInputs(inputsTarjeta)
  });

BotonSubmit.addEventListener('submit',function(){
  formulario.addEventListener('submit',hacerValidacion);
});

formulario.addEventListener('submit',hacerValidacion);


/* if (alertTrigger) {
  alertTrigger.addEventListener('click', function (event) {
    let calle = document.getElementById('calle');

    if (calle.value == ''){
      event.preventDefault();
      calle.classList.add('is-invalid');
      
    }

    alert('¡Su compra se realizo exitosamente!', 'success')
  })
} */
//fin alert flotante

document.getElementById('premiumradio').addEventListener('click',actualizarCostos);
document.getElementById('expressradio').addEventListener('click',actualizarCostos);
document.getElementById('standardradio').addEventListener('click',actualizarCostos);