const fotoPerfilInput = document.getElementById('profile-pic-input');
const fotoPerfil = document.getElementById('profile-pic')
const formFoto = document.getElementById('profile-pic-form')

formFoto.addEventListener('submit', (e) =>{
    e.preventDefault();
    const foto = fotoPerfilInput.files[0];
    if (foto) {
        const reader = new FileReader();

        reader.onloadend = () =>{
            const base64Imagen = reader.result;
            fotoPerfil.src = base64Imagen
            localStorage.setItem('fotoPerfil', base64Imagen);
        };
        reader.readAsDataURL(foto)
    }
});

window.addEventListener('load', () => {
    const fotoAlmacenada = localStorage.getItem('fotoPerfil');
    if(fotoAlmacenada){
        fotoPerfil.src = fotoAlmacenada;
    }
})

