const productsContainer = document.getElementById('products-container');
const emptyMessage = document.getElementById('empty-message');
const cartTotal = document.createElement('p'); // Contenedor para el subtotal
const deleteCart = document.getElementById("delete-cart");


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
            <div class="card">
                <div class="img-div">
                    <img  src="${item.image}" class="img-fluid rounded-start" alt="${item.name}">
                </div>
                <div class="col-md-8">
                    <div class="card-body product-info">
                        <div class="card-content">
                            <div class="title-price">
                                <h5 class="card-title">${item.name}</h5>
                                <div class="price">
                                    <p class="card-text">${item.currency}</p>
                                    <p class="card-text">${item.price}</p>
                                </div>
                            </div>
                            <div class= "quantity-delate">
                                <div>
                                    <label for="quantity-${index}"></label>
                                    <input type="number" id="quantity-${index}" value="${item.quantity}" min="1" data-index="${index}" class="quantity-input">
                                </div>
                                <i id="delateProduct"class="bi bi-trash3"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Añadir la card al contenedor de productos
        productsContainer.appendChild(productElement);
    });

    // Mostrar subtotal
    cartTotal.textContent = `Subtotal: ${subtotal.toFixed(2)}`;
    cartTotal.classList.add('subtotal');
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

// deleteCart.addEventListener('click', () => {
//     localStorage.removeItem('cartItems')
// })

const finalizePurchaseButton = document.getElementById('finalize-purchase-button');
const finalizePurchaseContainer = document.getElementById('purchase-hiden');
finalizePurchaseContainer.style.display = 'none';

finalizePurchaseButton.addEventListener('click', showPurchaseData)
function showPurchaseData() {
    const cartContainer = document.getElementById('cart-hiden');
    cartContainer.style.display = 'none';
    finalizePurchaseContainer.style.display = 'block';

}

const tableResume = document.getElementById('table-resume');

// Función para mostrar los productos en el resumen
function displayResumeItems(cartItems) {
    const tbody = tableResume.getElementsByTagName("tbody")[0];
    tbody.innerHTML = '';

    cartItems.forEach((item) => {
        const row = document.createElement("tr");
        const cellName = document.createElement("td");
        cellName.textContent = item.name;

        const cellPrice = document.createElement("td");
        cellPrice.textContent = `${item.currency} ${item.price}`;

        const cellQuantity = document.createElement("td");
        cellQuantity.textContent = item.quantity;

        cellPrice.classList.add('price');
        row.appendChild(cellName);
        row.appendChild(cellPrice);
        row.appendChild(cellQuantity);
        tbody.appendChild(row);
    });
}

// Con esto se trae los items desde el localStorage para pasarle por parametro a la otra funcion que los muestra en la tabla
function loadCartItems() {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    displayResumeItems(cartItems);
}

// Llama a loadCartItems
document.addEventListener("DOMContentLoaded", loadCartItems);