//En product-info.html, deberás recuperar el selectedProductId del localStorage para mostrar la información correspondiente del producto.
document.addEventListener('DOMContentLoaded', function() {
    // Recuperar el ID del producto desde el localStorage
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
