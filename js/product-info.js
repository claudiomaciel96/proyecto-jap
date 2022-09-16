let productoSeleccionado =[];
let tuPuntuacion;
let tuOpinion ;
let insertarComentarios = "";
let categoria = getJSONData(PRODUCT_INFO_URL+ localStorage.prodID+EXT_TYPE).then(function(resultObj){
    if (resultObj.status === "ok"){
     productoSeleccionado = resultObj.data;
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

<div class="row pb-5">
        <div class="col-3">
            <img src="${productoSeleccionado.images[0]}" alt="imagen1" class="img-thumbnail">
        </div>
         <div class="col-3">
            <img src="${productoSeleccionado.images[1]}" alt="imagen2" class="img-thumbnail">
        </div>
        <div class="col-3">
            <img src="${productoSeleccionado.images[2]}" alt="imagen3" class="img-thumbnail">
        </div>
        <div class="col-3">
            <img src="${productoSeleccionado.images[3]}" alt="imagen4" class="img-thumbnail">
        </div>
</div>
<p class="lead">Comentarios</p>

<div  class="pb-5" id= "div-comentarios">
</div>

<p class="lead">Comentar</p>

<div class="container pt-4 " id= "div-comentar">
<form>


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





