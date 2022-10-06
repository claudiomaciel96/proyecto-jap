let productoSeleccionado =[];
let tuPuntuacion;
let tuOpinion ;
let insertarComentarios = "";
let productosRelacionados = [];
let categoria = getJSONData(PRODUCT_INFO_URL+ localStorage.prodID+EXT_TYPE).then(function(resultObj){
    if (resultObj.status === "ok"){
     productoSeleccionado = resultObj.data;
     productosRelacionados = productoSeleccionado.relatedProducts;
    }
    
    document.getElementById("container").innerHTML =`
<div class="pt-4 pb-3 border-bottom border-3">
    <h1> ${productoSeleccionado.name}</h1>
</div>
    
<div class="pt-4">
    <dl>
        <dt>PRECIO</dt>
            <dd>${productoSeleccionado.currency} ${productoSeleccionado.cost}</dd>
        <dt>DESCRIPCION</dt>
            <dd>${productoSeleccionado.description}</dd>
        <dt>CATEGORIA</dt>
            <dd>${productoSeleccionado.category}</dd>
        <dt>CANTIDA DE VENDIDOS</dt>
            <dd>${productoSeleccionado.soldCount}</dd>
        <dt> IMAGENES ILUSTRATIVAS </dt>    
  </dl>
</div>

<div id="carouselExampleIndicators" class="carousel slide pb-5" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="${productoSeleccionado.images[0]}" class="d-block w-100" alt="imagen1">
    </div>
    <div class="carousel-item">
      <img src="${productoSeleccionado.images[1]}" class="d-block w-100" alt="imagen2">
    </div>
    <div class="carousel-item">
      <img src="${productoSeleccionado.images[2]}" class="d-block w-100" alt="imagen3">
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>


<p class="lead">Comentarios</p>

<div  class="pb-5" id= "div-comentarios">
</div>

<p class="lead">Comentar</p>

<div class="container pt-3 border-bottom border-3" id= "div-comentar">
    <form class="pb-5">


            <div class="col-md-12 mb-3">
              <label for="tuopinion">Tu opinion</label>
              <textarea name="tuopinion" class="form-control" id="tu-opinion" placeholder="Escribe tu opinion.." style="height:100px"></textarea>
            </div>
          
    



        <label for="tu puntuacion">Tu puntuacion</label>
        <select class=" custom-select form-select d-block w-100 " id="tu-puntuacion" name="tupuntuacion" >
        <option value="1">★</option>
        <option value="2">★★</option>
        <option value="3">★★★</option>
        <option value="4">★★★★</option>
        <option value="5">★★★★★</option>
        </select>
        <br>
        <input class="btn btn-primary btn-lg" type="button" value="Enviar" id="enviar-comentario">
    </form>

</div>
<p class="lead pt-5">Productos relacionados</p>
<div  class="p-5 " id= "div-prod-rel">
<div class="row pb-5 ">
        <div onclick="setProdID(${productosRelacionados[0].id})" class="col-5  cursor-active ">
            <img src="${productosRelacionados[0].image}" alt="prod1" class="img-thumbnail">
            <p class="lead">${productosRelacionados[0].name}</p>
        </div>
         <div onclick="setProdID(${productosRelacionados[1].id})" class="col-5 cursor-active">
            <img src="${productosRelacionados[1].image}" alt="prod2" class="img-thumbnail">
            <p class="lead ">${productosRelacionados[1].name}</p>
        </div>

</div>
</div>
                
  
 `;

 //DESAFIATE : al presionar enviar,obtengo comentario nuevo,fecha del momento,puntuacion y usuario.Los muestro en COMENTARIOS

 document.getElementById("enviar-comentario").addEventListener("click", function() {
    tuOpinion = document.getElementById("tu-opinion").value ;
    tuPuntuacion = puntuacionEstrellas(document.getElementById("tu-puntuacion").value) ;
    
    let fecha = new Date();
    let hoy = fecha.getFullYear() + '-' + (fecha.getMonth() + 1) + '-' + fecha.getDate() +' ' + fecha.toLocaleTimeString();
    insertarComentarios +=`
            <div  class="list-group-item list-group-item-action "  
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1"><b>${localStorage.usuario} </b> - ${hoy} - ${tuPuntuacion} </h5>
                    <p class="mb-1">${tuOpinion}</p 
                </div>
                      
           </div>
            `;
           
    document.getElementById("div-comentarios").innerHTML= insertarComentarios;
    document.getElementById("tu-opinion").value='';
    document.getElementById("tu-puntuacion").value=1;
 

    });

    
    });
// creo el div-comentarios anteriormentente, entonces fetch comentarios y los agrego a la pagina
    let comentarios = getJSONData(PRODUCT_INFO_COMMENTS_URL+ localStorage.prodID+EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok"){
         comentarios = resultObj.data;
        }
        
       if (comentarios !=[]){
        for (let comentario of comentarios){
            let puntuacion = puntuacionEstrellas(comentario.score);
            insertarComentarios +=`
            <div  class="list-group-item list-group-item-action "  
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1"><b>${comentario.user} </b> - ${comentario.dateTime} - ${puntuacion} </h5>
                    <p class="mb-1">${comentario.description}</p 
                </div>
                      
           </div>
            `;
        }
        document.getElementById("div-comentarios").innerHTML=insertarComentarios;
       }
    });



function puntuacionEstrellas(a){
    let contenido = "";
    for( let i = 0; i < a; i++){
        contenido += `<span class="fa fa-star checked"></span>`;
    }
    for( let i = 0; i < 5-a; i++){
        contenido +=`<span class="fa fa-star"></span>`;
    }
    return contenido;
}




