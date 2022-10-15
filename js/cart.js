let idUsuario = "25801";
let agregar = "";
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
      document.getElementById("subtotal").innerHTML = `${articulosCarrito[i].currency} ${articulosCarrito[i].unitCost * cantidad.value}`;
    });


  }

});



