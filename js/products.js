const productos = "https://japceibal.github.io/emercado-api/cats_products/"+ localStorage.getItem("catID") + ".json";

// Pide el json a la API
async function getData(url) {
    const respuesta = await fetch(url);
    const data = await respuesta.json();
    return data;
};

async function lista(url) {
    const data2 = await getData(url);
    return data2.products;
}

/* Maqueta de los productos */
function getHTML(list) {
    return `
        <div class="col-md-4 mb-4 wow col-12 col-md-6 col-lg">
            <div class="card pruebaCard" data-id="${list.id}">
                <img src="${list.image}" class="card-img-top" alt="${list.name}">
                <div class="card-body"> 
                    <div class="row">
                        <div class="col-9"><h3 class="card-title">${list.name}</h3></div>
                        <div class="col-3 text-end"><a class="fa-solid fa-bag-shopping h3 comprarIcon" href="cart.html"></a></div>
                    </div>
                    <p class="card-text descripcionCard">${list.description}</p>
                    <div class="row">
                        <p class="card-text priceCard col-12"><strong>Precio: ${list.cost} ${list.currency} </strong></p>
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

    const data2 = await getData(productos);

    categImg.src = data2.products[data2.products.length - 1].image;
    categTitle.innerHTML += data2.catName;
    categDesc.innerHTML += data2.catName;
});

/* Genera la lista inicial al cargar la página */
document.addEventListener("DOMContentLoaded", async () => {
    const list = await lista(productos);

    list.forEach(element => {
        let pag = getHTML(element);
        document.getElementById("listaP").innerHTML += pag;
    });
});

/* Limpia los filtros actuales */
document.getElementById("limpiarFiltro").addEventListener("click", async () => {
    const list = await lista(productos);
    document.getElementById("listaP").innerHTML = "";

    list.forEach(element => {
        let pag = getHTML(element);
        document.getElementById("listaP").innerHTML += pag;
    });

    document.getElementById("maxFiltro").value = "";
    document.getElementById("minFiltro").value = "";
});

/* Filtra artículos en un margen de precio */
document.getElementById("botonFiltrar").addEventListener("click", async () => {
    let maxFiltro = document.getElementById("maxFiltro").value;
    let minFiltro = document.getElementById("minFiltro").value;

    const list = await lista(productos);
    document.getElementById("listaP").innerHTML = "";

    list.forEach(element => {
        if (element.cost <= maxFiltro && element.cost >= minFiltro) {
            let pag = getHTML(element);
            document.getElementById("listaP").innerHTML += pag;
        }
    });
});

/* Filtra artículos de manera ascendente según su precio */
document.getElementById("precioUp").addEventListener("click", async () => {
    const list = await lista(productos);
    const priceOrderAsc = list.sort((a, b) => a.cost - b.cost);

    document.getElementById("listaP").innerHTML = "";

    priceOrderAsc.forEach(element => {
        let pag = getHTML(element);
        document.getElementById("listaP").innerHTML += pag;
    });
});

/* Filtra artículos de manera descendente según su precio */
document.getElementById("precioDown").addEventListener("click", async () => {
    const list = await lista(productos);
    const priceOrderDesc = list.sort((a, b) => b.cost - a.cost);

    document.getElementById("listaP").innerHTML = "";

    priceOrderDesc.forEach(element => {
        let pag = getHTML(element);
        document.getElementById("listaP").innerHTML += pag;
    });
});

/* Filtra artículos en función de su cantidad de vendidos */
document.getElementById("filtroVentas").addEventListener("click", async () => {
    const list = await lista(productos);
    const sellOrder = list.sort((a, b) => b.soldCount - a.soldCount);

    document.getElementById("listaP").innerHTML = "";

    sellOrder.forEach(element => {
        let pag = getHTML(element);
        document.getElementById("listaP").innerHTML += pag;
    });
});

/* Filtra artículos en función del buscador */
document.getElementById("buscador").addEventListener("keyup", async () => {
    const list = await lista(productos);
    let busqueda = document.getElementById("buscador").value.toLowerCase();

    document.getElementById("listaP").innerHTML = "";

    list.forEach(element => {
        if (element.name.toLowerCase().includes(busqueda)) {
            let pag = getHTML(element);
            document.getElementById("listaP").innerHTML += pag;
        }
    });
});

/* Trae e imprime el username en la navbar */
document.addEventListener("DOMContentLoaded", () => {
    const userHTML = document.getElementById("user");
    const userData = JSON.parse(localStorage.getItem("user"));

    if (userData) {
        userHTML.innerHTML += userData.name || userData.email;
    } else {
        window.location = "index.html";
    }
});

/* Guarda el ID en localStorage y redirige a product-info */
document.addEventListener("DOMContentLoaded", async () => {
    const list = await lista(productos);

    list.forEach(element => {
        let pag = getHTML(element);
        document.getElementById("listaP").innerHTML += pag;
    });

    document.querySelectorAll('.pruebaCard').forEach(card => {
        card.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            localStorage.setItem('selectedProductId', productId);
            window.location.href = 'product-info.html';
        });
    });
});
