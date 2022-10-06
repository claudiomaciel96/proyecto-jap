let idUsuario = "25801";
let articulosCarrito = getJSONData(CART_INFO_URL+idUsuario+EXT_TYPE).then(function(resultObj){
    if (resultObj.status === "ok"){
        articulosCarrito = resultObj.data.articles;   
   
    }

    for (let articuloCarrito of articulosCarrito){
        let agregar="";
        agregar +=`<tr>
        <th ><img src="${articuloCarrito.image}" width="120" alt="imagen" ></th>
        <td>${articuloCarrito.name}</td>
        <td>${articuloCarrito.currency} ${articuloCarrito.unitCost}</td>
        <td><div class="col-2">
          <input  type="number" name="productCostInput"  class="form-control"id="productCostInput" placeholder value="${articuloCarrito.count}" min="0">
      </div></td>
        <td>COSTO * CANTIDAD</td>
      </tr>`;
      document.getElementById("articulos-acomprar").innerHTML = agregar;
    }
});
