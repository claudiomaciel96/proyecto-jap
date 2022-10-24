let idUsuario = "25801";
let agregar = "";
let subtotal ;
let prueba;
/* fetch(CART_INFO_URL + idUsuario + EXT_TYPE) 
.then(respuesta => respuesta.json())
.then(datos => {
    prueba = datos.articles; 
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
      let cantidad = document.getElementById("input-cantidad" + i);
      subtotal=articulosCarrito[i].unitCost * cantidad.value;
      document.getElementById("subtotal").innerHTML = `${articulosCarrito[i].currency} ${subtotal}`
      document.getElementById("costos-subtotal").innerHTML = `${articulosCarrito[i].currency} ${subtotal}`;
    });


  }

 
  prueba=document.querySelectorAll('.modal-body input[type="radio"]');

});
let inputsTarjeta= document.querySelectorAll('.div-tarjeta input[type="text"]');
  let inputsTranferencia= document.querySelectorAll('.div-transferencia input[type="text"]');
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

document.getElementById('check-transferencia').addEventListener('click',function(){
deshabilitarInputs(inputsTarjeta);
habilitarInputs(inputsTranferencia)
});

document.getElementById('check-tarjeta').addEventListener('click',function(){
  deshabilitarInputs(inputsTranferencia);
  habilitarInputs(inputsTarjeta)
  });

  //alert flotante
  var alertPlaceholder = document.getElementById('liveAlertPlaceholder');
var alertTrigger = document.getElementById('submit');

function alert(message, type) {
  var wrapper = document.createElement('div')
  wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'

  alertPlaceholder.append(wrapper)
}

if (alertTrigger) {
  alertTrigger.addEventListener('click', function () {
    alert('¡Su compra se realizo exitosamente!', 'success')
  })
}