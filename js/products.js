document.addEventListener('DOMContentLoaded', function(){
    const url = "https://japceibal.github.io/emercado-api/cats_products/101.json"
    const productos = document.querySelector("productos")
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const productosContainer = document.getElementById('productos');
            data.products.forEach(product => {
                // Crear el HTML para cada tarjeta
                const cardHTML = `
                    <div class="col-md-4 mb-4">
                        <div class="card">
                            <img src="${product.image}" class="card-img-top" alt="${product.name}">
                            <div class="card-body">
                                <h5 class="card-title">${product.name}</h5>
                                <p class="card-text">${product.description}</p>
                                <p class="card-text"><strong>Precio:</strong> ${product.currency} ${product.cost}</p>
                                <p class="card-text"><strong>Cantidad Vendidos:</strong> ${product.soldCount}</p>
                            </div>
                        </div>
                    </div>`;
                    console.log("funciona");
                    
                    productosContainer.innerHTML+= cardHTML
        });

    })        
    .catch(error => console.error("Error en el fetch de productos", error));
});