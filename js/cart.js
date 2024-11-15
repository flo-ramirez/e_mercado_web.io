const productsContainer = document.getElementById('products-container');
const emptyMessage = document.getElementById('empty-message');

document.addEventListener('DOMContentLoaded', () => {
    // Crear un producto de ejemplo | Deberia traer lo que seguarde en LS desde product-info y products |
    const exampleItem = {
        name: "Producto de Ejemplo",
        currency: "USD",
        price: "10.00",
        quantity: 1
    };
    
    // Obtener los items del carrito del localStorage
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    if (cartItems.length === 0) {
        cartItems.push(exampleItem);
        localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Guardar en localStorage
    }

    if (cartItems.length === 0) {
        emptyMessage.style.display = 'block';
        productsContainer.style.display = 'none';
    } else {
        emptyMessage.style.display = 'none';
        productsContainer.style.display = 'block';
        displayCartItems(cartItems);
    }
});

function displayCartItems(cartItems) {
    productsContainer.innerHTML = ''; 

    // Iterar sobre los items del carrito y crear las cards
    cartItems.forEach(item => {
        const productElement = document.createElement('div');
        productElement.classList.add('card', 'mb-3');

        // Crear el contenido de la card
        productElement.innerHTML = `
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="img/default.jpg" class="img-fluid rounded-start" alt="${item.name}">
                </div>
                <div class="col-md-8">
                    <div class="card-body product-info">
                        <h5 class="card-title">${item.name}</h5>
                        <p class="card-text">Moneda: ${item.currency}</p>
                        <p class="card-text">Precio: ${item.price}</p>
                        <p class="card-text">Cantidad: ${item.quantity}</p>
                        <p class="card-text"><small class="text-body-secondary">Agregado al carrito</small></p>
                    </div>
                </div>
            </div>
        `;

        // Añadir la card al contenedor de productos
        productsContainer.appendChild(productElement);
    });
        }
 



            