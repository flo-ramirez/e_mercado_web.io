document.addEventListener('DOMContentLoaded', function() {
    const ingBtn = document.getElementById('ingBtn');
  
    ingBtn.addEventListener('click', (event) => {
      event.preventDefault(); // Evita que el formulario se envíe
  
      const usuario = document.getElementById('usuario').value;
      const contrasena = document.getElementById('contrasena').value;
      const checkbox = document.getElementById("ingreso").checked;
  

      //log de ingreso 
      if (usuario.length > 0 && contrasena.length > 0) {
             if (checkbox) {
                localStorage.setItem('usuarioLogeado', usuario);
                console.log("funcionachk");
                  
            }
            localStorage.setItem('logueado', 'true');

      }
      setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
      console.log('Usuario:', usuario);
      console.log('Contraseña:', contrasena);
      console.log(checkbox);
      
    });
  });


// document.getElementById('formulario_ingreso').addEventListener('submit', function(event) {
//     document.addEventListener("DOMContentLoaded", function () {
// console.log('entro');

//         const form = document.querySelector("#formulario_ingreso form");
//         const usuarioInput = document.getElementById("usuario");
//         const contrasenaInput = document.getElementById("contrasena")

//         // eventlistener para el form
//         form.addEventListener("submit", function (event) {
//           // chequea que los campos no esten vacios
//           if (usuarioInput.value.trim() === "" || contrasenaInput.value.trim() === "") {
//             // Prevent form submission
//             console.log('entro');
//             event.preventDefault();
//             // mensaje de alerta
//             alert("Por favor, complete todos los campos antes de continuar.");
//           }
//         });
//       })});
      

    //   const usuario = document.getElementById('usuario').value.trim();
    //   const password = document.getElementById('password1').value.trim();
    //   const checkbox = document.getElementById("ingreso");
  
    //   // Verificar que los campos no estén vacíos
    //   if (usuario && password) {
    //       if (checkbox.checked) {
    //           localStorage.setItem('usuarioLogeado', usuario);
    //           localStorage.setItem('logueado', 'true');
    //           console.log("funcionachk");
              
    //       }
    //       showAlertSuccess();
  
    //       // Redirigir después de 1 segundo
    //       setTimeout(() => {
    //           window.location.href = 'index.html';
    //       }, 1000);
    //   } else {
    //       showAlertError(); // Mostrar mensaje de error si los campos están vacíos
    //   }
    // /*const password1 = document.getElementById('password1').value;
    // const password2 = document.getElementById('password2').value;
    // const passwordHelp = document.getElementById('passwordHelp');
    
    // let formValid = true;*/

    /*/ codigo reutilizable de la tarea anterior --- Validación de la contraseña
    if (password1.length < 6) {
        passwordHelp.textContent = "La contraseña debe tener al menos 6 caracteres.";
        formValid = false;
    } else if (password1 !== password2) {
        passwordHelp.textContent = "Las contraseñas no coinciden.";
        formValid = false;
    } else {
        passwordHelp.textContent = "";
    }

    // Validación del checkbox
    if (!checkbox.checked) {
        mensajeError.textContent = "Debes aceptar los términos y condiciones para continuar.";
        formValid = false;
    } else {
        mensajeError.textContent = "";
    }

    // Si la validación falla, se previene el envío del formulario
    if (!formValid) {
        event.preventDefault();
        showAlertError();
    } else {
        showAlertSuccess();
    }

function showAlertSuccess() {
    document.getElementById("alert-success").classList.add("show");
}

function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");
    
}
});
*/ 

