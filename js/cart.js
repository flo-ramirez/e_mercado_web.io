document.addEventListener('DOMContentLoaded', () => { 
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const productsContainer = document.getElementById('products-container');
    const emptyMessage = document.getElementById('empty-message');

    if(cartItems.length === 0){
        emptyMessage.style.display = 'block';
        productsContainer.style.display = 'none';
    } else {
        emptyMessage.style.display = 'none';
        productsContainer.style.display = 'block';
        displayCartItems(cartItems);
    }
});

function displayCartItems(cartItems) {
    const productsContainer = document.getElementById('products-container');
    cartItems.forEach(item => {
        const productElement = document.createElement('div');
        productElement.classList.add('cart-item');
        productElement.innetHTML = `
        <h3>${item.name}</h3>
        <p>Precio: ${item.price}</p>
        <p>Cantidad: ${item.quantity}</p>`;
        productsContainer.appendChild(productElement);
    });
}

function addToCart(product) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    cartItems.push(product);
    
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}
