let divContainer = document.getElementById('container');
let containerTitulo = document.getElementById('container-titulo');
let minPrecio = 0;
let maxPrecio ;
let productos = [];
let productosFiltrados = [];
//utilizo el getJSONData y le agrego link PRODUCTS_URL con el id de la categoria de producto
//que se guarda  al seleccionarlo en categories.html le agrego .json con EXT_TYPE y queda el link.
   
   
   
   let categoria = getJSONData(PRODUCTS_URL+ localStorage.catID+EXT_TYPE).then(function(resultObj){
   if (resultObj.status === "ok"){
    categoria = resultObj.data.catName;
    productos = resultObj.data.products;
   }
   productosFiltrados=productos;
   document.getElementById("principio").innerHTML += `<h2><b>Productos</b> </h2>
   <p class="lead">Verás aqui todos los productos de la categoria ${categoria}</p>
   
  `;

   showProductsList(productos);
   
   });
  
   containerTitulo.innerHTML +=`<div id="principio"></div><div class="row">
   <div class="col text-end">
     <div class="btn-group btn-group-toggle mb-4" data-bs-toggle="buttons">
       <input type="radio" class="btn-check" name="options" id="des">
       <label class="btn btn-light" for="des"><i class="fas fa-sort-amount-down mr-1"></i>$</label>
       <input type="radio" class="btn-check" name="options" id="asc">
       <label class="btn btn-light" for="asc"><i class="fas fa-sort-amount-up mr-1"></i>$</label>
       <input type="radio" class="btn-check" name="options" id="rel" checked>
       <label class="btn btn-light" for="rel"><i class="fas fa-sort-amount-down mr-1"></i>Rel.</label>
     </div>
   </div>
 </div>
 <div class="row">
   <div class="col-lg-6 offset-lg-6 col-md-12 mb-1 container">
     <div class="row container p-0 m-0">
       <div class="col">
         <p class="font-weight-normal text-end my-2">Cant.</p>
       </div>
       <div class="col">
         <input class="form-control" type="number" placeholder="min." id="rangeFilterCountMin">
       </div>
       <div class="col">
         <input class="form-control" type="number" placeholder="máx." id="rangeFilterCountMax">
       </div>
       <div class="col-3 p-0">
         <div class="btn-group" role="group">
           <button class="btn btn-light btn-block" id="rangeFilterCount">Filtrar</button>
           <button class="btn btn-link btn-sm" id="clearRangeFilter">Limpiar</button>
           
         </div>
       </div>
     </div>
   </div>
 </div>`;
   
   function showProductsList(a){
    let htmlContentToAppend = "";
  
        for (let producto of a) {
         htmlContentToAppend += `
             <div onclick="setProdID(${producto.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${producto.image}" alt="${producto.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div onclick="setProdID(${producto.id})" class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${producto.name} - ${producto.currency} ${producto.cost}</h4>
                            <small class="text-muted">${producto.soldCount} vendidos</small>
                        </div>
                        <p class="mb-1">${producto.description}</p>
                    </div>
                </div>
            </div>
             `;
            
     
     }
    
     divContainer.innerHTML = htmlContentToAppend;
    }

    function setProdID(id) {
      localStorage.setItem("prodID", id);
      window.location = "product-info.html"
    }

function ordenAsc(){
  
  productosFiltrados.sort(function(a,b){
    if (a.cost < b.cost) {
        return -1;
    } 
    if (a.cost > b.cost) {
        return 1;
    }
    return 0;
    
});
 }

 

 function ordenDes(){
  productosFiltrados.sort(function(a,b){
    if (a.cost > b.cost) {
        return -1;
    } 
    if (a.cost < b.cost) {
        return 1;
    }
    return 0;
    
});

 }

 function ordenRel(){
   productosFiltrados.sort(function(a,b){
    if (a.soldCount > b.soldCount) {
        return -1;
    } 
    if (a.soldCount < b.soldCount) {
        return 1;
    }
    return 0;
    
});

 }


 let inputAsc = document.getElementById("asc");
 let inputDes = document.getElementById("des");
 let inputRel = document.getElementById("rel");
 

  //orden y filtrado
 inputAsc.addEventListener("click", function(){
    ordenAsc();
    showProductsList(productosFiltrados);
    
  });

  inputDes.addEventListener("click", function(){
    ordenDes();
    showProductsList(productosFiltrados);
    
  });

  inputRel.addEventListener("click", function(){
    ordenRel();
    showProductsList(productosFiltrados);
  
  });

  document.getElementById("rangeFilterCount").addEventListener("click", function(){
    
    minPrecio = document.getElementById("rangeFilterCountMin").value;
  maxPrecio = document.getElementById("rangeFilterCountMax").value;
    if (maxPrecio.length == 0 && minPrecio.length == 0 || minPrecio>maxPrecio && maxPrecio.length != 0) {
      showProductsList(productos);
    }else{
      
      productosFiltrados=productos.filter(producto =>{
        if(maxPrecio>minPrecio){
        return producto.cost >= minPrecio && producto.cost <= maxPrecio;
    }else{return producto.cost >= minPrecio;}
  });
      showProductsList(productosFiltrados);
    }
    
  });
  
 //limpiar
  document.getElementById("clearRangeFilter").addEventListener("click", function(){
    showProductsList(productos);
    productosFiltrados=productos;
    document.getElementById("rangeFilterCountMin").value='';
  document.getElementById("rangeFilterCountMax").value='';
    
  
  });
