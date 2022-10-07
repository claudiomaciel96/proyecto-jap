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
          <input  id ="input-cantidad" type="number" name="input-cantidad"  class="form-control"id="productCostInput" placeholder value="${articuloCarrito.count}" min="1">
      </div></td>
        <td id="subtotal">${articuloCarrito.currency} ${articuloCarrito.unitCost}</td>
      </tr>`;
    
      document.getElementById("articulos-acomprar").innerHTML = agregar;
      
      document.getElementById("input-cantidad").addEventListener('click', function(){
        let cantidad= document.getElementById("input-cantidad");
        document.getElementById("subtotal").innerHTML=`${articuloCarrito.currency} ${articuloCarrito.unitCost * cantidad.value}`;
      });
      
    }
    

    /* document.getElementById("input-cantidad").addEventListener('click', function(){
      let cantidad= document.getElementById("input-cantidad");
      document.getElementById("subtotal").innerHTML=`${articulosCarrito[0].currency} ${articulosCarrito[0].unitCost * cantidad.value}`;
    }); */
});

function calcularSubtotal(a){
  
  document.getElementById("subtotal").innerHTML=`${articulosCarrito[0].currency} ${a}`;
}

