
document.addEventListener('DOMContentLoaded', function(){
    var catID = localStorage.getItem("catID");
    const url = "https://japceibal.github.io/emercado-api/cats_products/" + catID + ".json"
    const productosContainer = document.getElementById('productos');

    fetch(url)
        .then(response => response.json())
        .then(data => {
            productosData = data.products; // Guardamos los productos para luego filtrarlos
            mostrarProductos(productosData); // Mostramos los productos inicialmente
        })
        .catch(error => console.error("Error en el fetch de productos", error));

    // Función para mostrar los productos
    function mostrarProductos(productos) {
        productosContainer.innerHTML = ''; // Limpiamos el contenedor
        productos.forEach(product => {
            const cardHTML = `
                <div class="col-md-4 mb-4 wow col-12 col-md-3 col-lg-3">
                    <div class="card pruebaCard">
                        <img src="${product.image}" class="card-img-top" alt="${product.name}">
                        <div class="card-body"> 
                            <div class="row">
                                <div class="col-9"><h3 class="card-title">${product.name}</h3></div>
                                <div class="col-3 text-end"><a class="fa-solid fa-bag-shopping h3 comprarIcon" href="cart.html"></a></div>
                            </div>
                            <p class="card-text descripcionCard">${product.description}</p>
                            <div class="row">
                                <p class="card-text priceCard col-12"><strong>Precio: ${product.cost} ${product.currency}</strong></p>
                            </div>
                            <div class="row">
                                <p class="card-text cantCard col-12"><strong>Cantidad Vendidos: ${product.soldCount}</strong></p>
                            </div>
                        </div>
                    </div>
                </div>`;
            productosContainer.innerHTML += cardHTML;
        });
    }
});