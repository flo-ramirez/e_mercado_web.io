document.addEventListener("DOMContentLoaded", function () {
    const ingBtn = document.getElementById("ingBtn");
    const toast = document.getElementById("toast");

    // Evento al hacer clic en el botón de login
    ingBtn.addEventListener("click", async (event) => {
        event.preventDefault(); // Evita que el formulario se envíe

        // Obtener los valores de usuario y contraseña
        const usuario = document.getElementById("usuario").value.trim();
        const contrasena = document.getElementById("contrasena").value.trim();

        // Validar que los campos no estén vacíos y que el email tenga un formato correcto
        if (usuario === "admin@admin.com" && contrasena === "admin") {
            try {
                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                const raw = JSON.stringify({
                    "username": usuario,
                    "password": contrasena
                });

                const requestOptions = {
                    method: "POST",
                    headers: myHeaders,
                    body: raw,
                    redirect: "follow"
                };

                // Hacemos la solicitud fetch
                const response = await fetch("http://localhost:3000/login", requestOptions);

                console.log("Response status:", response.status);  // Verificar el código de estado

                if (response.ok) {
                    const data = await response.json(); // Parseamos la respuesta a JSON

                    console.log("Response data:", data);  // Verificar los datos recibidos

                    if (data.token) {
                        localStorage.setItem("token", data.token);  // Guardamos el token
                        localStorage.setItem("logueado", "true");

                        // Redirige a index.html después de 1 segundo
                        setTimeout(() => {
                            window.location.href = "index.html";
                        }, 1000);
                    } else {
                        showToast("Usuario y/o contraseña incorrectos.");
                    }
                } else {
                    console.error("Login failed with status:", response.status);
                    showToast("Hubo un error en la autenticación.");
                }
            } catch (error) {
                console.error("Error al intentar hacer login:", error);
                showToast("Hubo un error, inténtalo de nuevo.");
            }
        } else {
            showToast("Por favor ingrese el usuario y la contraseña correctos.");
        }
    });

    // Función para mostrar el mensaje de error (toast)
    function showToast(message = "Por favor complete los campos correctamente.") {
        toast.textContent = message; // Agrega el mensaje personalizado
        toast.classList.add("show"); // Muestra el toast
        setTimeout(() => {
            toast.classList.remove("show"); // Oculta el toast después de 3 segundos
        }, 3000);
    }
});
