document.addEventListener("DOMContentLoaded", function () {
  // Recuperar el ID del producto desde el localStorage
  const productId = localStorage.getItem('selectedProductId');
  
  if (productId) {
    const url = `https://japceibal.github.io/emercado-api/products/${productId}.json`;
    const commentsUrl = `https://japceibal.github.io/emercado-api/products_comments/${productId}.json`;

    // Función para generar el HTML de productos relacionados
    function getHTML(relatedElement) {
      return `
        <div id="${relatedElement.id}" class="col-md-4" style="max-width: 25%; margin: 10px; flex: 1 1 200px;">
          <a onclick="localStorage.setItem('selectedProductId', ${relatedElement.id})" 
          class="card mb-4 shadow-sm custom-card cursor-active" style="color: black; text-decoration: none;" href="product-info.html">
            <img class="bd-placeholder-img card-img-top" src="${relatedElement.image}"
              alt="Imagen representativa de un producto relacionado">
            <h3 class="m-3">${relatedElement.name}</h3>
          </a>
        </div>
      `;
    }
    
    fetch(url)
      .then(response => response.json())
      .then(data => {
        document.getElementById('productName').textContent = data.name;
        document.getElementById('productDescription').textContent = data.description;
        document.getElementById('productPrice').textContent = `${data.cost} ${data.currency}`;
        document.getElementById('productSoldCount').textContent = data.soldCount;

        data.relatedProducts.forEach(element => {
          let pag = getHTML(element);
          document.getElementById("relatedProducts").innerHTML += pag;
        });

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

  // Evento de agregar al carrito
  const buyButton = document.querySelector(".buy-button");
  if (buyButton) {
    buyButton.addEventListener("click", function () {
      const image = document.getElementById("mainImage").src;
      const name = document.getElementById("productName").innerText;
      const priceText = document.getElementById("productPrice").innerText;
      const price = parseFloat(priceText.split(" ")[0]);
      const currency = priceText.split(" ")[1] || "USD";
      const productId = localStorage.getItem('selectedProductId');

      
      
      // Crear el objeto del producto en formato de carrito
      const cartItem = {
        id: productId,
        image: image,
        name: name,
        price: price,
        currency: currency,
        quantity: 1
      };

      // Obtener el carrito actual del localStorage
      let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

      // Verificar si el producto ya está en el carrito
      const existingProductIndex = cartItems.findIndex(item => item.id === cartItem.id);

      if (existingProductIndex !== -1) {
          cartItems[existingProductIndex].quantity += 1;
      } else {
          cartItems.push(cartItem);
      }

      // Guardar el carrito actualizado en localStorage
      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      // Redirigir a cart.html en una nueva pestaña
      window.open("cart.html", "_blank");
    });
  } else {
    console.error("El botón de compra no se encontró en el DOM.");
  }
});

// Función para generar estrellas de calificación
function createStars(rating) {
  let stars = "";
  for (let i = 0; i < 5; i++) {
    stars += i < rating ? '<i class="bi bi-star-fill text-warning"></i>' : '<i class="bi bi-star text-warning"></i>';
  }
  return stars;
}
