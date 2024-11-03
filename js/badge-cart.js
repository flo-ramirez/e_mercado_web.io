const cartBadge = document.getElementById('cart-badge'); 

document.addEventListener('DOMContentLoaded', () => {
    // Obtener los items del carrito del localStorage
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    updateBadgeCount(cartItems);

    if (cartItems.length === 0) {
        emptyMessage.style.display = 'block';
        productsContainer.style.display = 'none';
    } else {
        emptyMessage.style.display = 'none';
        productsContainer.style.display = 'block';
        displayCartItems(cartItems);
    }
});

// Función para actualizar el badge con la cantidad total de productos
function updateBadgeCount(cartItems) {
    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    cartBadge.textContent = totalQuantity;
}

// Actualiza la cantidad en el badge cuando cambia la cantidad de un producto
function updateQuantity(event, cartItems) {
    const index = event.target.dataset.index;
    const newQuantity = parseInt(event.target.value);

    if (newQuantity > 0) {
        cartItems[index].quantity = newQuantity;
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        calculateSubtotal(cartItems);
        updateBadgeCount(cartItems);
    }
}
