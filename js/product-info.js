// Verifica que el usuario esté logueado, sino redirige al login
document.addEventListener("DOMContentLoaded", function(){
  // Verificar si el usuario está logueado antes de cargar cualquier otra cosa
  const logueado = localStorage.getItem('logueado');
  const usuario = localStorage.getItem('usuarioLogeado');
  const liMostrarUsuario = document.getElementById("liMostrarUsuario");
  const Logout = document.getElementById("aLogout")
  if (logueado !== 'true'){
      window.location.href = 'login.html';
      return; // Detiene la ejecución del resto del código si el usuario no está logueado
  }
  else {
      liMostrarUsuario.innerHTML = `<span class="nav-link" id="spnUsuario">${usuario}</span>`;
  }
  Logout.addEventListener("click", function(){
      localStorage.removeItem('logueado');
      localStorage.removeItem('usuarioLogeado', null);

  })
});


//Recuperamos de local sorage la id del producto seleccionado para despues mostrar su informacion
document.addEventListener('DOMContentLoaded', function() {
    // Recuperar el ID del producto desde el localStorage (fue guardado desde products.html al hacerle click)
    const productId = localStorage.getItem('selectedProductId');

    if (productId) {
      // URL de la API, ajustando el URL para tu caso
      const url = `https://japceibal.github.io/emercado-api/products/${productId}.json`;

      // Hacer una solicitud para obtener los detalles del producto
      fetch(url)
        .then(response => response.json())
        .then(data => {
          // Actualizar el DOM con los detalles del producto
          document.getElementById('productName').textContent = data.name;
          document.getElementById('productImage').src = data.images[0]; // Primera imagen del producto
          document.getElementById('productDescription').textContent = data.description;
          document.getElementById('productPrice').textContent = `${data.cost} ${data.currency}`;
          document.getElementById('productSoldCount').textContent = data.soldCount;
        })
        .catch(error => console.error('Error al obtener la información del producto:', error));
    } else {
      console.error('No se encontró un ID de producto en el almacenamiento local');
    }
  });
