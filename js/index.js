/*document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
    window.onload = function(){
        const logueado = localStorage.getItem('logueado');
        if (logueado !== 'true'){
            window.location = '/login.html';
        }
   }
});*/

document.addEventListener("DOMContentLoaded", function(){
    // Verificar si el usuario está logueado antes de cargar cualquier otra cosa
    const logueado = localStorage.getItem('logueado');
    if (logueado !== 'true'){
        window.location.href = '/login.html';
        return; // Detiene la ejecución del resto del código si el usuario no está logueado
    }

    // Lógica existente para manejar los clicks en las categorías
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html";
    });

    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html";
    });

    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html";
    });
});
