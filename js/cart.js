const productsContainer = document.getElementById('products-container');
const emptyMessage = document.getElementById('empty-message');
const cartTotal = document.createElement('p'); // Contenedor para el subtotal

document.addEventListener('DOMContentLoaded', () => {
    // Obtener los items del carrito del localStorage
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    if (cartItems.length === 0) {
        emptyMessage.style.display = 'block';
        productsContainer.style.display = 'none';
    } else {
        emptyMessage.style.display = 'none';
        productsContainer.style.display = 'block';
        displayCartItems(cartItems);
    }
});

// Función para mostrar los productos en el carrito
function displayCartItems(cartItems) {
    productsContainer.innerHTML = ''; 
    let subtotal = 0;

    // Iterar sobre los items del carrito y crear las cards
    cartItems.forEach((item, index) => {
        subtotal += item.price * item.quantity;

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
                        <label for="quantity-${index}">Cantidad: </label>
                        <input type="number" id="quantity-${index}" value="${item.quantity}" min="1" data-index="${index}" class="quantity-input">
                    </div>
                </div>
            </div>
        `;

        // Añadir la card al contenedor de productos
        productsContainer.appendChild(productElement);
    });

    // Mostrar subtotal
    cartTotal.textContent = `Subtotal: ${subtotal.toFixed(2)}`;
    productsContainer.appendChild(cartTotal);

    // Añadir eventos para actualizar el subtotal cuando se cambia la cantidad
    const quantityInputs = document.querySelectorAll('.quantity-input');
    quantityInputs.forEach(input => {
        input.addEventListener('input', (event) => updateQuantity(event, cartItems));
    });
}

// Función para actualizar la cantidad de un producto y el subtotal
function updateQuantity(event, cartItems) {
    const index = event.target.dataset.index;
    const newQuantity = parseInt(event.target.value);

    if (newQuantity > 0) {
        cartItems[index].quantity = newQuantity;
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        calculateSubtotal(cartItems);
    }
}

// Función para calcular el subtotal
function calculateSubtotal(cartItems) {
    let subtotal = 0;
    cartItems.forEach(item => {
        subtotal += item.price * item.quantity;
    });

    cartTotal.textContent = `Subtotal: ${subtotal.toFixed(2)}`;
}


// Función para actualizar el badge del carrito
function updateCartBadge() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
    
    const cartBadge = document.getElementById('cart-badge');
    cartBadge.textContent = totalQuantity;
}

