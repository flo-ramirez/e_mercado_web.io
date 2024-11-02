const saveBtn = document.getElementById("saveBtn");

// Cargar la información del usuario guardada al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.email) {
        document.getElementById("email").value = user.email;
    }
});

// Función para verificar campos del formulario
function verify() {
    let valid = true;

    // Verificar campos requeridos
    document.querySelectorAll(".verify").forEach(element => {
        const errorElement = element.nextElementSibling;

        if (element.value.trim() === "" && element.id !== "phone") {
            element.classList.add("is-invalid");
            errorElement.textContent = "Este campo es obligatorio";
            valid = false;
        } else {
            element.classList.remove("is-invalid");
            element.classList.add("is-valid");
            errorElement.textContent = "";
        }

        element.addEventListener("keyup", () => {
            if (element.value.trim() === "" && element.id !== "phone") {
                element.classList.add("is-invalid");
                errorElement.textContent = "Este campo es obligatorio";
                valid = false;
            } else {
                element.classList.remove("is-invalid");
                element.classList.add("is-valid");
                errorElement.textContent = "";
            }
        });
    });

    // Si todos los campos son válidos, guardar datos en localStorage
    if (valid) {
        const name = document.getElementById("name").value.trim();
        const surname = document.getElementById("surname").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const secName = document.getElementById("secName").value.trim();
        const secSurname = document.getElementById("secSurname").value.trim();
        const email = document.getElementById("email").value.trim();

        let user = JSON.parse(localStorage.getItem("user")) || {};
        user = { name, surname, phone, email, secName, secSurname };

        localStorage.setItem("user", JSON.stringify(user));
        alert("Datos guardados correctamente");
    } else {
        alert("Por favor completa todos los campos obligatorios.");
    }
}

// Habilitar o deshabilitar el botón de guardar
document.querySelectorAll("input").forEach(element => {
    element.addEventListener("input", () => {
        const allFieldsComplete = Array.from(document.querySelectorAll(".verify")).every(input => input.value.trim() !== "" || input.id === "phone");
        saveBtn.disabled = !allFieldsComplete;
    });
});

// DESAFIATE
const fotoPerfilInput = document.getElementById("img");
const preview = document.getElementById("preview");
const fotoPerfil = document.getElementById("pic");

// Cargar la imagen de perfil guardada al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    const fotoAlmacenada = localStorage.getItem("userPfp");
    if (fotoAlmacenada) {
        fotoPerfil.src = fotoAlmacenada;
    }
    userData()
});
function userData() {
    const userLocalStorage = JSON.parse(localStorage.getItem("user"));
    if (userLocalStorage) {
        const fields = ["name", "surname", "phone", "secName", "secSurname", "email"];
        
        fields.forEach(field => {
            const input = document.getElementById(field);
            if (input) {
                input.value = userLocalStorage[field] || '';
            }
        });
    }
}

// Actualizar la vista previa de la imagen seleccionada
fotoPerfilInput.addEventListener('change', updateImageDisplay);

function updateImageDisplay() {
    preview.innerHTML = ""; // Limpiar el contenido anterior de la vista previa
    const imagenes = fotoPerfilInput.files;

    if (imagenes.length === 0) {
        preview.innerHTML = '<p class="p-1 text-center fs-5 mb-1">No hay ningún archivo seleccionado actualmente.</p>';
    } else {
        if (validFileType(imagenes[0])) {
            const reader = new FileReader();
            reader.onload = function () {
                const base64Imagen = reader.result;
                fotoPerfil.src = base64Imagen; // Mostrar la imagen en el perfil
                localStorage.setItem("userPfp", base64Imagen); // Guardar la imagen en localStorage
            };
            reader.readAsDataURL(imagenes[0]);
        } else {
            preview.innerHTML = `<p class="p-1 text-center fs-5 mb-1"><b>Nombre de archivo:</b> ${imagenes[0].name}: El formato del archivo no es válido.</p>`;
        }
    }
}

// Validar tipo de archivo
const fileTypes = ["image/jpeg", "image/jpg", "image/png"];

function validFileType(file) {
    return fileTypes.includes(file.type);
}