const productos = "https://japceibal.github.io/emercado-api/cats_products/"+ localStorage.getItem("catID") + ".json";

// Pide el json a la api
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
    const respuesta2 = await fetch(productos);
    const data2 = await respuesta2.json();

    categImg.src = data2.products[data2.products.length - 1].image;
    categTitle.innerHTML += data2.catName;
    categDesc.innerHTML += data2.catName;

    // fetch y renderizacion de la lista de productos
    const list = await lista(productos);
    list.forEach(element => {
        let pag = getHTML(element);
        document.getElementById("listaP").innerHTML += pag;
    });

    // click en tarjetas redirigen a product-info
    document.querySelectorAll('.pruebaCard').forEach(card => {
        card.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            localStorage.setItem('selectedProductId', productId);
            window.location.href = 'product-info.html';
        });
    });
});

/*Teniamos dos DOM activos, lo que duplicaba las tarjetas. Unificando todo en un solo DOM reducimos código y evitamos la duplicación de tarjetas. */
