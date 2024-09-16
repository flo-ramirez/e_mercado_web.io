const productos = "https://japceibal.github.io/emercado-api/cats_products/"+ localStorage.getItem("catID") + ".json"
// Pide el json a la api
async function getData(url) {
    const respuesta = await fetch(url);
    const data = await respuesta.json();
    return data;
};
async function lista(url) {
    const data2 = await getData(url);
    return data2.products
};
/* Maqueta de los productos */
function getHTML(list) {
    return `
                    <div class="col-12 col-md-4 col-lg-3 p-2" id="${list.id}" onclick="setProdID(${list.id})">
                        <div class="card pruebaCard">
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
`
};


/* Genera el título dinamicamente */
document.addEventListener("DOMContentLoaded", async () => {
    const categTitle = document.getElementById("titulo")
    const categImg = document.getElementById("imagenTitulo")
    const categDesc = document.getElementById("descripcion")
    const respuesta2 = await fetch(productos);
    const data2 = await respuesta2.json();
    const divCards = document.getElementById("listaP");
    categImg.src = (data2.products[(data2.products.length)-1].image)
    categTitle.innerHTML += (data2.catName)
    categDesc.innerHTML += (data2.catName)
});
const botonFiltrar =  document.getElementById("botonFiltrar")
const limpiarFiltro = document.getElementById("limpiarFiltro")
let maxFiltro = document.getElementById("maxFiltro").value;
let minFiltro = document.getElementById("minFiltro").value;
const precioUp =   document.getElementById("precioUp")
const precioDown = document.getElementById("precioDown")
const filtroVentas = document.getElementById("filtroVentas")
const filtroTexto = document.getElementById("filtroTexto")
const buscador = document.getElementById("buscador")
/* Genera La lista inicial al cargar la página */
document.addEventListener("DOMContentLoaded", async () => {
    const list = await lista(productos)
    
    list.forEach(element => {
        let pag = getHTML(element)
        divCards.innerHTML = '';
        divCards.innerHTML += pag
    });
});
/* Limpia los filtros acutales */
limpiarFiltro.addEventListener("click", async () => {
    let maxFiltro = document.getElementById("maxFiltro").value;
    let minFiltro = document.getElementById("minFiltro").value;
    const list = await lista(productos)
    document.getElementById("listaP").innerHTML = "";
    
    list.forEach(element => {
        let pag = getHTML(element)
        document.getElementById("listaP").innerHTML += pag
    })
document.getElementById("maxFiltro").value = "";
document.getElementById("minFiltro").value = "";
})
/* Filtra articulos en un margen de precio */
botonFiltrar.addEventListener("click", async () => {
    let maxFiltro = document.getElementById("maxFiltro").value;
    let minFiltro = document.getElementById("minFiltro").value;
    const list = await lista(productos)
    document.getElementById("listaP").innerHTML = "";
    
    list.forEach(element => {
        if (element.cost <= maxFiltro && element.cost >= minFiltro) {
        let pag = getHTML(element)
        document.getElementById("listaP").innerHTML += pag
        }
    })
document.getElementById("maxFiltro").value = "";
document.getElementById("minFiltro").value = "";
})
/* Filtra articulos de mander ascendente según su precio */
precioUp.addEventListener("click", async () => {
    const list = await lista(productos)
    let priceOrderAsc = list.sort((a, b) => {
        if (a.cost > b.cost) {return 1}
        if (b.cost > a.cost) {return -1}
    });
    document.getElementById("listaP").innerHTML = "";
    priceOrderAsc.forEach(element => {
        let pag = getHTML(element)
        document.getElementById("listaP").innerHTML += pag
    });
});
/* Filtra articulos de manera descendente según su precio */
precioDown.addEventListener("click", async () => {
    const list = await lista(productos)
    let priceOrderDesc = list.sort((a, b) => {
        if (a.cost > b.cost) {return -1}
        if (b.cost > a.cost) {return 1}
    });
    document.getElementById("listaP").innerHTML = "";
    priceOrderDesc.forEach(element => {
        let pag = getHTML(element)
        document.getElementById("listaP").innerHTML += pag
    });
});
/* Filtra los articulos en función de su cantidad de vendidos */
filtroVentas.addEventListener("click", async () => {
    const list = await lista(productos)
    let sellOrder = list.sort((a, b) => {
        if (a.soldCount > b.soldCount) {return -1}
        if (b.soldCount > a.soldCount) {return 1}
    });
    document.getElementById("listaP").innerHTML = "";
    sellOrder.forEach(element => {
        let pag = getHTML(element)
        document.getElementById("listaP").innerHTML += pag
    });
});
/* Filtra articulos en función de un buscador */
buscador.addEventListener("keyup", async () => {
    const list = await lista(productos);
    let busqueda = document.getElementById("buscador").value;

    document.getElementById("listaP").innerHTML = "";
    list.forEach(element => {
        if (element.name.toLowerCase().includes(busqueda.toLowerCase())) {
        let pag = getHTML(element)
        document.getElementById("listaP").innerHTML += pag
        };
    });
});
/* Deja en el local storage la información necesaria para ingresar al producto deseado tras su click */
function setProdID(id) {
    localStorage.setItem("selectedProductId", id);
    window.location = "product-info.html"
};
/* Trae e imprime el username en la navbar */
document.addEventListener("DOMContentLoaded", () => {
    const userHTML = document.getElementById("user")
    if (JSON.parse(localStorage.getItem("user")).name != undefined) {
        userHTML.innerHTML += JSON.parse(localStorage.getItem("user")).name
    } else {
        userHTML.innerHTML += JSON.parse(localStorage.getItem("user")).email
    };
    if (localStorage.getItem("user") == null) {
        window.location = "index.html"
    };
});

/*guarda el id en local storage y redirige a prouct-indo*/
document.addEventListener("DOMContentLoaded", async () => {
    const list = await lista(productos);

    list.forEach(element => {
        let pag = getHTML(element);
        document.getElementById("listaP").innerHTML += pag;
    });

//evento click para cada tarjeta
    document.querySelectorAll('.pruebaCard').forEach(card => {
        card.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            // ID del producto en local storage
            localStorage.setItem('selectedProductId', productId);
            // Redirigir
            window.location.href = 'product-info.html';
        });
    });
});