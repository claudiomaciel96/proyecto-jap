localStorage.removeItem('usuario');
let formLogin = document.getElementById('form-login');
formLogin.innerHTML = `    <!-- este es el login dentro del formulario form-login -->
<img src="img/login.png" alt width="300" height="200"/>
<h3>Inicio de sesion</h3>
<!-- login separados por div -->
<div>
    <label for="usuario">USUARIO</label><br>
    <input type="email" name="usuario" id="usuario" placeholder="Ingrese su email">
</div>

<div>
    <label for="password"> CONTRASEÑA</label><br>
    <input type="password" name="password" id="password" placeholder="ingrese su contraseña">
</div>
<div>
    <br><input type="submit" class="btn btn-outline-primary" value="INGRESAR">
</div>
      `;
let inputUsuario = document.getElementById('usuario');
let inputPassword = document.getElementById('password');

formLogin.addEventListener('submit', function(evento){evento.preventDefault();
    if(inputUsuario.value.length == 0 || inputPassword.value.length == 0){
        evento.preventDefault();
    
        mostrarAlertaLogin();
        

    }else {
        localStorage.setItem('usuario', inputUsuario.value );
        window.location.href = 'index2.html';
    }
  

});

function mostrarAlertaLogin(){
    document.getElementById('alerta-login').style.display = 'block';
    }


