document.addEventListener('DOMContentLoaded', function () {
  // Recuperar el ID del producto desde el localStorage
  const productId = localStorage.getItem('selectedProductId');
  
  if (productId) {
    const url = `https://japceibal.github.io/emercado-api/products/${productId}.json`;
    const commentsUrl = `https://japceibal.github.io/emercado-api/products_comments/${productId}.json`;


    // Obtener detalles del producto

    function getHTML(relatedElement) {
      return `
        <div id="${relatedElement.id}" class="col-md-4" style="max-width: 25%; margin: 10px; flex: 1 1 200px;">
          <a onclick="localStorage.setItem('selectedProductId', ${relatedElement.id})" 
          class="card mb-4 shadow-sm custom-card cursor-active" style="color: black; text-decoration: none;"href="product-info.html">
            <img class="bd-placeholder-img card-img-top" src="${relatedElement.image}"
              alt="Imagen representativa de un producto relacionado">
            <h3 class="m-3">${relatedElement.name}</h3>
          </a>
        </div>
    `
    };
    
    fetch(url)
      .then(response => response.json())
      .then(data => {
        document.getElementById('productName').textContent = data.name;
        document.getElementById('productDescription').textContent = data.description;
        document.getElementById('productPrice').textContent = `${data.cost} ${data.currency}`;
        document.getElementById('productSoldCount').textContent = data.soldCount;

        data.relatedProducts.forEach(element => {
          let pag = getHTML(element)
          document.getElementById("relatedProducts").innerHTML += pag
        });
        // Referencia al contenedor de la galería de imágenes
        const galleryContainer = document.getElementById('productGallery');
        const mainImage = document.getElementById('mainImage');
        galleryContainer.innerHTML = '';

        data.images.forEach((image, index) => {
          const imgElement = document.createElement('img');
          imgElement.src = image;
          imgElement.alt = `Imagen del producto ${index + 1}`;
          imgElement.classList.add('thumbnail');
          imgElement.onclick = function () {
            mainImage.src = image;
          };
          galleryContainer.appendChild(imgElement);
        });

        if (data.images.length > 0) {
          mainImage.src = data.images[0];
        }
      })
      .catch(error => console.error('Error al obtener la información del producto:', error));

    // Obtener comentarios del producto
    fetch(commentsUrl)
      .then(response => response.json())
      .then(comments => {
        const reviewsList = document.getElementById('reviews-list');
        reviewsList.innerHTML = '';

        comments.forEach(comment => {
          const reviewItem = `
            <div class="review-item">
              <div class="d-flex align-items-center">
                ${createStars(comment.score)}
                <span class="ms-2 fw-bold">${comment.user}</span>
                <span class="ms-auto text-muted">${comment.dateTime}</span>
              </div>
              <p class="mt-2">${comment.description}</p>
              <hr>
            </div>
          `;
          reviewsList.innerHTML += reviewItem;
        });
      })
      .catch(error => console.error('Error al obtener los comentarios del producto:', error));
  } else {
    console.error('No se encontró un ID de producto en el almacenamiento local');
  }
});

// Función para crear estrellas en base a la calificación
function createStars(rating) {
  let stars = "";
  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      stars += '<i class="bi bi-star-fill text-warning"></i>';
    } else {
      stars += '<i class="bi bi-star text-warning"></i>';
    }
  }
  return stars;
}

// Capturar el formulario de calificación y añadir el comentario
document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('#calification-form');
  const selectedRating = document.getElementById('selectedRating');
  let puntaje = 0;

  //  seleccionar la calificacion
  const dropdownItems = document.querySelectorAll('.dropdown-item');
  dropdownItems.forEach(item => {
      item.addEventListener('click', function (e) {
          e.preventDefault();
          puntaje = parseInt(this.getAttribute('data-value'));
          selectedRating.innerHTML = this.innerHTML; 
      });
  });

  form.addEventListener('submit', function (e) {
      e.preventDefault();

      const comentarioInput = form.querySelector('#comentarioInput');
      const comentario = comentarioInput.value.trim();

      // Recuperar el nombre del usuario desde localStorage
      const userName = localStorage.getItem('usuarioLogeado') || 'Usuario'; 

      if (comentario !== "" && puntaje > 0) {
          const nuevoComentario = `
              <div class="review-item">
                  <div class="d-flex align-items-center">
                      ${createStars(puntaje)}
                      <span class="ms-2 fw-bold">${userName}</span> 
                      <span class="ms-auto text-muted">${new Date().toLocaleString()}</span>
                  </div>
                  <p class="mt-2">${comentario}</p>
                  <hr>
              </div>
          `;

          const reviewsList = document.getElementById('reviews-list');
          reviewsList.innerHTML += nuevoComentario;

          // Limpiar el formulario
          comentarioInput.value = '';
          selectedRating.innerHTML = 'Selecciona estrellas'; // Reiniciar selección
          puntaje = 0; // Reiniciar el puntaje
      } else {
          alert('Por favor, escribe un comentario y selecciona una calificación.');
      }
  });
});
