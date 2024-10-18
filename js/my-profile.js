const input = document.getElementById("img");
const preview = document.getElementById("preview");
const saveBtn = document.getElementById("saveBtn");

// Cargar la imagen de perfil guardada al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.email) {
        document.getElementById("email").value = user.email;
    }

    if (localStorage.getItem("userPfp")) {
        document.getElementById('pic').src = localStorage.getItem('userPfp');
    }
});

// Actualizar la vista previa de la imagen seleccionada
input.addEventListener('change', updateImageDisplay);

function updateImageDisplay() {
    preview.innerHTML = "";
    const imagenes = input.files;

    if (imagenes.length === 0) {
        preview.innerHTML = '<p class="p-1 text-center fs-5 mb-1">No hay ningún archivo seleccionado actualmente.</p>';
    } else {
        if (validFileType(imagenes[0])) {
            preview.innerHTML = `
            <p><b>Nombre de archivo:</b> ${imagenes[0].name} <br> <b>Tamaño de archivo:</b> ${returnFileSize(imagenes[0].size)}.</p>`;
            document.getElementById("pic").src = URL.createObjectURL(imagenes[0]); // Cambiar la imagen en el perfil
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

// Convertir tamaño de archivo
function returnFileSize(bytes) {
    if (bytes < 1024) {
        return `${bytes} bytes`;
    } else if (bytes < 1048576) {
        return `${(bytes / 1024).toFixed(1)} KB`;
    } else {
        return `${(bytes / 1048576).toFixed(1)} MB`;
    }
}

// Función para verificar campos del formulario
function verify() {
    let valid = true;

    // Verificar campos requeridos (sin incluir teléfono)
    document.querySelectorAll(".verify").forEach(element => {
        const errorElement = element.nextElementSibling;

        if (element.value.trim() === "" && element.id !== "phone") { // Excluye el campo de teléfono
            element.classList.add("is-invalid");
            errorElement.textContent = "Este campo es obligatorio";
            valid = false;
        } else {
            element.classList.remove("is-invalid");
            element.classList.add("is-valid");
            errorElement.textContent = "";
        }

        element.addEventListener("keyup", () => {
            if (element.value.trim() === "" && element.id !== "phone") { // Excluye el campo de teléfono
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

// Guardar imagen de perfil seleccionada en localStorage
input.addEventListener("change", () => {
    const imgCatch = input.files[0];
    const reader = new FileReader();

    reader.addEventListener("load", function () {
        localStorage.setItem("userPfp", reader.result);
    }, false);

    if (imgCatch) {
        reader.readAsDataURL(imgCatch);
    }
});
