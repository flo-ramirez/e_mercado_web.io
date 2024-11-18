// **Variables globales**
const productsContainer = document.getElementById('products-container');
const emptyMessage = document.getElementById('empty-message');
const cartTotal = document.createElement('p'); // Contenedor para el subtotal
const finalizePurchaseButton = document.getElementById('finalize-purchase-button');
const finalizePurchaseContainer = document.getElementById('purchase-hiden');
const tableResume = document.getElementById('table-resume');
const deleteCartButton = document.getElementById("delateCartButton");

// **Configuración inicial**
document.addEventListener('DOMContentLoaded', () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    finalizePurchaseContainer.style.display = 'none'; // Ocultar al cargar la página
    updateCartVisibility(cartItems);
    displayCartItems(cartItems);
    loadResumeItems(cartItems);
    attachPurchaseEvents();
});

// **Funciones principales**

function updateCartVisibility(cartItems) {
    if (cartItems.length === 0) {
        emptyMessage.style.display = 'block';
        productsContainer.style.display = 'none';
    } else {
        emptyMessage.style.display = 'none';
        productsContainer.style.display = 'block';
    }
}

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
    attachCartEvents(cartItems);
}

function updateSubtotal(subtotal) {
    cartTotal.textContent = `Subtotal: ${subtotal.toFixed(2)}`;
    cartTotal.classList.add('subtotal');
    productsContainer.appendChild(cartTotal);
}

function attachCartEvents(cartItems) {
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('input', (event) => updateQuantity(event, cartItems));
    });

    document.querySelectorAll('#delateProduct').forEach(icon => {
        icon.addEventListener('click', (event) => deleteProduct(event, cartItems));
    });
}

function updateQuantity(event, cartItems) {
    const index = event.target.dataset.index;
    const newQuantity = parseInt(event.target.value);

    if (newQuantity > 0) {
        cartItems[index].quantity = newQuantity;
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        calculateSubtotal(cartItems);
    }
}

function calculateSubtotal(cartItems) {
    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    updateSubtotal(subtotal);
}

function deleteProduct(event, cartItems) {
    const index = event.target.dataset.index;
    cartItems.splice(index, 1);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartVisibility(cartItems);
    displayCartItems(cartItems);
    updateCartBadge();
}

deleteCartButton.addEventListener('click', () => {
    localStorage.removeItem('cartItems');
    updateCartVisibility([]);
    displayCartItems([]);
    updateCartBadge();
});

function updateCartBadge() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
    const cartBadge = document.getElementById('cart-badge');
    cartBadge.textContent = totalQuantity;
}

// **Resumen de compra**
function loadResumeItems(cartItems) {
    const tbody = tableResume.querySelector("tbody");
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

// **Finalizar compra**
function attachPurchaseEvents() {
    finalizePurchaseButton.addEventListener('click', () => {
        document.getElementById('cart-hiden').style.display = 'none';
        finalizePurchaseContainer.style.display = 'block';
    });

    const confirmButton = document.getElementById("final-button");
    confirmButton.addEventListener("click", handlePurchase);
}

function handlePurchase() {
    const errores = validatePurchase();

    if (errores.length > 0) {
        mostrarErrores(errores);
    } else {
        mostrarExito("¡Compra realizada con éxito!");
    }
}

function validatePurchase() {
    const errores = [];
    const departamento = document.getElementById("departamento").value.trim();
    const localidad = document.getElementById("localidad").value.trim();
    const calle = document.getElementById("calle").value.trim();
    const numeroDirec = document.getElementById("numeroDirec").value.trim();
    const esquina = document.getElementById("esquina").value.trim();

    if (!departamento) errores.push("Debe ingresar el departamento.");
    if (!localidad) errores.push("Debe ingresar la localidad.");
    if (!calle) errores.push("Debe ingresar la calle.");
    if (!numeroDirec || isNaN(numeroDirec)) errores.push("Debe ingresar un número válido.");
    if (!esquina) errores.push("Debe ingresar la esquina.");

        // Validar selección de envío
        const envioSeleccionado = document.querySelector('input[name="envio"]:checked');
        if (!envioSeleccionado) {
            errores.push("Debe seleccionar un tipo de envío.");
        }

        // Validar selección de forma de pago
        const formaPagoSeleccionada = document.querySelector('input[name="envio"]:checked');
        if (!formaPagoSeleccionada) {
            errores.push("Debe seleccionar una forma de pago.");
        }

        // Mostrar errores si existen
        if (errores.length > 0) {
            mostrarErrores(errores);
        } else {
            mostrarExito("¡Compra realizada con éxito! La factura y los pasos para completar el pago según el método seleccionado serán enviados a su correo. ");
        
        }
    };

    //  mostrar errores
    function mostrarErrores(errores) {
        const alertContainer = document.createElement("div");
        alertContainer.classList.add("alert", "alert-danger");
        alertContainer.innerHTML = errores.map(msg => `<p>${msg}</p>`).join("");
        document.body.prepend(alertContainer);

    setTimeout(() => alertContainer.remove(), 5000);
}

function mostrarExito(mensaje) {
    const successContainer = document.createElement("div");
    successContainer.classList.add("alert", "alert-success");
    successContainer.textContent = mensaje;
    document.body.prepend(successContainer);

    setTimeout(() => successContainer.remove(), 5000);
}
  const productsContainer = document.getElementById('products-container');
  const emptyMessage = document.getElementById('empty-message');
  const cartTotal = document.createElement('p'); // Contenedor para el subtotal
  const deleteCart = document.getElementById("delete-cart");
  const finalizePurchaseButton = document.getElementById('finalize-purchase-button');
  const finalizePurchaseContainer = document.getElementById('purchase-hiden');
  const tableResume = document.getElementById('table-resume');
  const shippingOptions = document.querySelectorAll('input[name="envio"]');
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  
  document.addEventListener('DOMContentLoaded', () => {
      // Verificar los items del carrito
      if (cartItems.length === 0) {
          emptyMessage.style.display = 'block';
          productsContainer.style.display = 'none';
      } else {
          emptyMessage.style.display = 'none';
          productsContainer.style.display = 'block';
          displayCartItems(cartItems);
      }
  
      loadCartItems();
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
                                  <i id="delateProduct" class="bi bi-trash3"></i>
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
  
  // Con esto se trae los items desde el localStorage para pasárselos por parámetro a la otra función que los muestra en la tabla
  function loadCartItems() {
      displayResumeItems(cartItems);
  }
  
  // Función para mostrar el resumen de compra
  finalizePurchaseButton.addEventListener('click', () => {
      const cartContainer = document.getElementById('cart-hiden');
      cartContainer.style.display = 'none';
      finalizePurchaseContainer.style.display = 'block';
  });
  
  // Validación de compra
  document.addEventListener("DOMContentLoaded", () => {
      const confirmButton = document.getElementById("final-button");
  
      confirmButton.addEventListener("click", () => {
          const errores = [];
  
          // Validar campos de dirección
          const departamento = document.getElementById("departamento").value.trim();
          const localidad = document.getElementById("localidad").value.trim();
          const calle = document.getElementById("calle").value.trim();
          const numeroDirec = document.getElementById("numeroDirec").value.trim();
          const esquina = document.getElementById("esquina").value.trim();
  
          if (!departamento) errores.push("Debe ingresar el departamento.");
          if (!localidad) errores.push("Debe ingresar la localidad.");
          if (!calle) errores.push("Debe ingresar la calle.");
          if (!numeroDirec || isNaN(numeroDirec)) errores.push("Debe ingresar un número válido.");
          if (!esquina) errores.push("Debe ingresar la esquina.");
  
          // Validar selección de envío
          const envioSeleccionado = document.querySelector('input[name="envio"]:checked');
          if (!envioSeleccionado) {
              errores.push("Debe seleccionar un tipo de envío.");
          }
  
          // Validar selección de forma de pago
          const formaPagoSeleccionada = document.querySelector('input[name="envio"]:checked');
          if (!formaPagoSeleccionada) {
              errores.push("Debe seleccionar una forma de pago.");
          }
  
          // Mostrar errores si existen
          if (errores.length > 0) {
              mostrarErrores(errores);
          } else {
              mostrarExito("¡Compra realizada con éxito! La factura y los pasos para completar el pago según el método seleccionado serán enviados a su correo.");
          }
      });
  
      //  mostrar errores
      function mostrarErrores(errores) {
          const alertContainer = document.createElement("div");
          alertContainer.classList.add("alert", "alert-danger");
          alertContainer.innerHTML = errores.map(msg => `<p>${msg}</p>`).join("");
          document.body.prepend(alertContainer);
  
          // Eliminar alerta después de 5 segundos
          setTimeout(() => alertContainer.remove(), 5000);
      }
  
      // Función para mostrar mensaje de éxito
      function mostrarExito(mensaje) {
          const successContainer = document.createElement("div");
          successContainer.classList.add("alert", "alert-success");
          successContainer.textContent = mensaje;
          document.body.prepend(successContainer);
  
          // Eliminar mensaje después de 5 segundos
          setTimeout(() => successContainer.remove(), 5000);
      }
  });
  
  // Función para calcular costos
  function calculateCosts(items) {
      const subtotalElement = document.getElementById('subtotal');
      const shippingCostElement = document.getElementById('shipping-cost');
      const totalCostElement = document.getElementById('total-cost');
  
      let subtotal = 0;
      items.forEach(item => {
          subtotal += item.price * item.quantity;
      });
  
      const selectedShipping = [...shippingOptions].find(option => option.checked);
      const shippingRate = selectedShipping ? parseFloat(selectedShipping.value) : 0;
      const shippingCost = subtotal * shippingRate;
  
      const total = subtotal + shippingCost;
  
      // Actualizar el DOM
      subtotalElement.textContent = `Subtotal: ${subtotal.toFixed(2)} USD`;
      shippingCostElement.textContent = `Costo de Envío: ${shippingCost.toFixed(2)} USD`;
      totalCostElement.textContent = `Total: ${total.toFixed(2)} USD`;
  }
  
  // Agregar eventos a las opciones de envío
  shippingOptions.forEach(option => {
      option.addEventListener('change', () => calculateCosts(cartItems));
  });
  
