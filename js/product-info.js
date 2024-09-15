// Recuperamos de local storage la id del producto seleccionado para después mostrar su información
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
        document.getElementById('productDescription').textContent = data.description;
        document.getElementById('productPrice').textContent = `${data.cost} ${data.currency}`;
        document.getElementById('productSoldCount').textContent = data.soldCount;

        // Referencia al contenedor de la galería de imágenes
        const galleryContainer = document.getElementById('productGallery');
        const mainImage = document.getElementById('mainImage');
        
        // Limpiar el contenedor de la galería por si había algo antes
        galleryContainer.innerHTML = ''; 

        // Mostrar las imágenes obtenidas del JSON
        data.images.forEach((image, index) => {
          // Crear cada miniatura como un elemento <img>
          const imgElement = document.createElement('img');
          imgElement.src = image;
          imgElement.alt = `Imagen del producto ${index + 1}`;
          imgElement.classList.add('thumbnail');
          imgElement.onclick = function() {
            // Cambiar la imagen principal al hacer clic en la miniatura
            mainImage.src = image;
          };
          
          // Añadir cada miniatura al contenedor de la galería
          galleryContainer.appendChild(imgElement);
        });

        // Mostrar la primera imagen del array como la imagen principal
        if (data.images.length > 0) {
          mainImage.src = data.images[0];
        }
      })
      .catch(error => console.error('Error al obtener la información del producto:', error));
  } else {
    console.error('No se encontró un ID de producto en el almacenamiento local');
  }
});

