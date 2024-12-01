const productos = "https://japceibal.github.io/emercado-api/cats_products/" + localStorage.getItem("catID") + ".json";

// Pide el json a la API
async function getData(url) {
    const respuesta = await fetch(url);
    const data = await respuesta.json();
    return data;
};

async function lista(url) {
    const data2 = await getData(url);
    return data2.products;
};

/* Maqueta de los productos */
function getHTML(list) {
    return `
        <div class="col-12 col-md-4 col-lg-3 p-2 wow" id="${list.id}">
            <div class="card pruebaCard" onclick="setProdID(${list.id})">
                <img src="${list.image}" class="card-img-top" alt="${list.name}">
                <div class="card-body">
                    <div class="row">
                        <div class="col-9"><h3 class="card-title">${list.name}</h3></div>
                        <div class="col-3 text-end">
                            <a class="fa-solid fa-bag-shopping h3 comprarIcon" href="#" data-id="${list.id}"></a>
                        </div>
                    </div>
                    <p class="card-text descripcionCard">${list.description}</p>
                    <div class="row">
                        <p class="card-text priceCard col-12"><strong>Precio: ${list.cost} ${list.currency}</strong></p>
                    </div>
                    <div class="row">
                        <p class="card-text cantCard col-12"><strong>Cantidad Vendidos: ${list.soldCount}</strong></p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/* Genera el título dinámicamente */
document.addEventListener("DOMContentLoaded", async () => {
    const categTitle = document.getElementById("titulo");
    const categImg = document.getElementById("imagenTitulo");
    const categDesc = document.getElementById("descripcion");
    const respuesta2 = await fetch(productos);
    const data2 = await respuesta2.json();

    categImg.src = data2.products[(data2.products.length) - 1].image;
    categTitle.innerHTML += data2.catName;
    categDesc.innerHTML += data2.catName;

    const divCards = document.getElementById("listaP");
    const list = await lista(productos);
    divCards.innerHTML = ''; // Limpiar contenedor de productos
    console.log(list);
    

    list.forEach(element => {
        divCards.innerHTML += getHTML(element);
    });

    // Agregar evento para cada icono de compra
    document.querySelectorAll(".comprarIcon").forEach(icon => {
        icon.addEventListener("click", function (event) {
            event.stopPropagation(); // Evitar la redirección de la tarjeta
            event.preventDefault(); // Evitar la navegación del enlace

            const productId = this.getAttribute("data-id");
            const product = list.find(item => item.id == productId);
            console.log(product.image);
            
            // Crear objeto del producto en formato compatible con el carrito
            const cartItem = {
                id: product.id,
                image: product.image,
                name: product.name,
                price: product.cost,
                currency: product.currency,
                quantity: 1
            };

            // Obtener productos actuales del carrito en localStorage
            let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

            // Comprobar si el producto ya está en el carrito
            const existingProductIndex = cartItems.findIndex(item => item.id == cartItem.id);

            if (existingProductIndex !== -1) {
                // Incrementar la cantidad si el producto ya existe en el carrito
                cartItems[existingProductIndex].quantity += 1;
            } else {
                // Añadir el nuevo producto al carrito
                cartItems.push(cartItem);
            }

            // Guardar el carrito actualizado en localStorage
            localStorage.setItem("cartItems", JSON.stringify(cartItems));

            alert(`${product.name} ha sido añadido al carrito.`);
        });
    });
});

/* Filtros de búsqueda, ordenamiento, y otros eventos */
const botonFiltrar = document.getElementById("botonFiltrar");
const limpiarFiltro = document.getElementById("limpiarFiltro");
const precioUp = document.getElementById("precioUp");
const precioDown = document.getElementById("precioDown");
const filtroVentas = document.getElementById("filtroVentas");
const buscador = document.getElementById("buscador");

/* Limpiar filtros */
limpiarFiltro.addEventListener("click", async () => {
    const list = await lista(productos);
    document.getElementById("listaP").innerHTML = "";

    list.forEach(element => {
        document.getElementById("listaP").innerHTML += getHTML(element);
    });
    document.getElementById("maxFiltro").value = "";
    document.getElementById("minFiltro").value = "";
});

/* Filtrar por rango de precio */
botonFiltrar.addEventListener("click", async () => {
    const maxFiltro = parseFloat(document.getElementById("maxFiltro").value);
    const minFiltro = parseFloat(document.getElementById("minFiltro").value);
    const list = await lista(productos);
    document.getElementById("listaP").innerHTML = "";

    list.forEach(element => {
        if (element.cost <= maxFiltro && element.cost >= minFiltro) {
            document.getElementById("listaP").innerHTML += getHTML(element);
        }
    });
});

/* Ordenar precios ascendente */
precioUp.addEventListener("click", async () => {
    const list = await lista(productos);
    list.sort((a, b) => a.cost - b.cost);
    document.getElementById("listaP").innerHTML = "";

    list.forEach(element => {
        document.getElementById("listaP").innerHTML += getHTML(element);
    });
});

/* Ordenar precios descendente */
precioDown.addEventListener("click", async () => {
    const list = await lista(productos);
    list.sort((a, b) => b.cost - a.cost);
    document.getElementById("listaP").innerHTML = "";

    list.forEach(element => {
        document.getElementById("listaP").innerHTML += getHTML(element);
    });
});

/* Filtrar por cantidad de ventas */
filtroVentas.addEventListener("click", async () => {
    const list = await lista(productos);
    list.sort((a, b) => b.soldCount - a.soldCount);
    document.getElementById("listaP").innerHTML = "";

    list.forEach(element => {
        document.getElementById("listaP").innerHTML += getHTML(element);
    });
});

/* Búsqueda por texto */
buscador.addEventListener("keyup", async () => {
    const list = await lista(productos);
    const busqueda = document.getElementById("buscador").value.toLowerCase();

    document.getElementById("listaP").innerHTML = "";
    list.forEach(element => {
        if (element.name.toLowerCase().includes(busqueda) || element.description.toLowerCase().includes(busqueda)) {
            document.getElementById("listaP").innerHTML += getHTML(element);
        }
    });
});

/* Guardar ID del producto en localStorage y redirigir a product-info */
function setProdID(id) {
    localStorage.setItem("selectedProductId", id);
    window.location = "product-info.html";
}

/* Mostrar el nombre de usuario en la navbar */
document.addEventListener("DOMContentLoaded", () => {
    const userHTML = document.getElementById("user");
    const user = JSON.parse(localStorage.getItem("user"));
    userHTML.innerHTML += user.name || user.email;

    if (!user) {
        window.location = "index.html";
    }
});