// **Variables globales**
const productsContainer = document.getElementById('products-container');
const emptyMessage = document.getElementById('empty-message');
const cartTotal = document.createElement('p'); // Contenedor para el subtotal
const finalizePurchaseButton = document.getElementById('finalize-purchase-button');
const finalizePurchaseContainer = document.getElementById('purchse-hiden');
const tableResume = document.getElementById('table-resume');
const deleteCartButton = document.getElementById("delateCartButton");

// **Configuración inicial**
document.addEventListener('DOMContentLoaded', () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    updateCartVisibility(cartItems);
    displayCartItems(cartItems);
    loadCartItems();
});

// **Funciones principales**

// Muestra u oculta el carrito según si hay productos
function updateCartVisibility(cartItems) {
    if (cartItems.length === 0) {
        emptyMessage.style.display = 'block';
        productsContainer.style.display = 'none';
    } else {
        emptyMessage.style.display = 'none';
        productsContainer.style.display = 'block';
    }
}

// Muestra los productos en el carrito
function displayCartItems(cartItems) {
    productsContainer.innerHTML = '';
    let subtotal = 0;

    cartItems.forEach((item, index) => {
        subtotal += item.price * item.quantity;

        const productElement = document.createElement('div');
        productElement.classList.add('card', 'mb-3');
        productElement.innerHTML = `
            <div class="card">
                <div class="img-div">
                    <img src="${item.image}" class="img-fluid rounded-start" alt="${item.name}">
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
                            <div class="quantity-delate">
                                <div>
                                    <label for="quantity-${index}"></label>
                                    <input type="number" id="quantity-${index}" value="${item.quantity}" min="1" data-index="${index}" class="quantity-input">
                                </div>
                                <i id="delateProduct" class="bi bi-trash3" data-index="${index}"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        productsContainer.appendChild(productElement);
    });

    updateSubtotal(subtotal);
    attachEventListeners(cartItems);
}

// Muestra el subtotal
function updateSubtotal(subtotal) {
    cartTotal.textContent = `Subtotal: ${subtotal.toFixed(2)}`;
    cartTotal.classList.add('subtotal');
    productsContainer.appendChild(cartTotal);
}

// Agrega eventos a los inputs de cantidad y botones de eliminación
function attachEventListeners(cartItems) {
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('input', (event) => updateQuantity(event, cartItems));
    });

    document.querySelectorAll('#delateProduct').forEach(icon => {
        icon.addEventListener('click', (event) => deleteProduct(event, cartItems));
    });
}

// Actualiza la cantidad de un producto
function updateQuantity(event, cartItems) {
    const index = event.target.dataset.index;
    const newQuantity = parseInt(event.target.value);

    if (newQuantity > 0) {
        cartItems[index].quantity = newQuantity;
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        calculateSubtotal(cartItems);
    }
}

// Calcula y muestra el subtotal
function calculateSubtotal(cartItems) {
    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    cartTotal.textContent = `Subtotal: ${subtotal.toFixed(2)}`;
}

// Elimina un producto del carrito
function deleteProduct(event, cartItems) {
    const index = event.target.dataset.index;
    cartItems.splice(index, 1);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartVisibility(cartItems);
    displayCartItems(cartItems);
    updateCartBadge();
}

// Vacía todo el carrito
deleteCartButton.addEventListener('click', () => {
    localStorage.removeItem('cartItems');
    updateCartVisibility([]);
    displayCartItems([]);
    updateCartBadge();
});

// Actualiza el badge del carrito
function updateCartBadge() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
    const cartBadge = document.getElementById('cart-badge');
    cartBadge.textContent = totalQuantity;
}

// **Finalizar compra**
finalizePurchaseContainer.style.display = 'none';

finalizePurchaseButton.addEventListener('click', () => {
    document.getElementById('cart-hiden').style.display = 'none';
    finalizePurchaseContainer.style.display = 'block';
});

// **Resumen de compra**
function displayResumeItems(cartItems) {
    const tbody = tableResume.getElementsByTagName("tbody")[0];
    tbody.innerHTML = '';

    cartItems.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td class="price">${item.currency} ${item.price}</td>
            <td>${item.quantity}</td>
        `;
        tbody.appendChild(row);
    });
}

function loadCartItems() {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    displayResumeItems(cartItems);
}
