document.getElementById('input-email').value= localStorage.usuario;
let nombre1 = document.getElementById('input-nombre1');
let nombre2 = document.getElementById('input-nombre2');
let apellido1 = document.getElementById('input-apellido1');
let apellido2 = document.getElementById('input-apellido2');
let telefono = document.getElementById('input-telefono');
let email = document.getElementById('input-email');
let formProfile =document.getElementById('form-profile');
let datosUsuario =[];
if (localStorage.datosUsuario){
    datosUsuario= localStorage.getItem('datosUsuario');
    datosUsuario = JSON.parse(datosUsuario);
}
mostrarDatos();
function mostrarDatos(){
    
    nombre1.value = datosUsuario[0];
    nombre2.value = datosUsuario[1];
    apellido1.value = datosUsuario[2];
    apellido2.value = datosUsuario[3];
    telefono.value = datosUsuario[4];
    email.value = localStorage.usuario;
}
function pushearDatos(){
    datosUsuario.push(nombre1.value);
    datosUsuario.push(nombre2.value);
    datosUsuario.push(apellido1.value);
    datosUsuario.push(apellido2.value);
    datosUsuario.push(telefono.value);
    
}
function guardarDatosUsuario(){
    
 pushearDatos();
localStorage.setItem('datosUsuario', JSON.stringify(datosUsuario));
localStorage.usuario = email.value;
}

formProfile.addEventListener('submit', function (event){
    if (!formProfile.checkValidity()){
        event.preventDefault();
        event.stopPropagation();
    }else{
        guardarDatosUsuario();
        
    }
    formProfile.classList.add('was-validated');

})
