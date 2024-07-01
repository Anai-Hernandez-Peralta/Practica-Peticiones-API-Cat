const api = axios.create({
    baseURL: `https://api.thecatapi.com/v1`
});

api.defaults.headers.common['X-API-KEY'] = 'live_LG5ied2ExWeAyOKVMg8VDTi7146HtGpFG56YfZ7rslxbMWB9jUbLDjNLlk6iAhiF';

const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=3';

const API_URL_FAVORITES = 'https://api.thecatapi.com/v1/favourites';

const API_URL_FAVORITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}`;

const API_URL_UPLOAD = 'https://api.thecatapi.com/v1/images/upload';


ocultarRealizado();


function ocultarLoadingPage() {
    const divContenedorCarga = document.getElementById('contenedor-carga');
    divContenedorCarga.style.visibility = 'hidden';
    divContenedorCarga.style.opacity = '0';
    divContenedorCarga.style.zIndex = '-10';
}

function mostrarLoadingPage() {
    const divContenedorCarga = document.getElementById('contenedor-carga');
    divContenedorCarga.style.visibility = 'visible';
    divContenedorCarga.style.opacity = '50%';
    divContenedorCarga.style.zIndex = '10000';
}

function ocultarRealizado() {
    const contenedorRealizado = document.getElementById('contenedorRealizado');
    contenedorRealizado.style.visibility = 'hidden';
    contenedorRealizado.style.opacity = '0';
    contenedorRealizado.style.zIndex = '-10';
}

function mostrarRealizado() {
    const contenedorRealizado = document.getElementById('contenedorRealizado'); 
    const imgRealizado = document.getElementById('realizadoImg');

    imgRealizado.style.opacity = '1';
    contenedorRealizado.style.visibility = 'visible';
    contenedorRealizado.style.opacity = '50%';
    contenedorRealizado.style.zIndex = '10000';
}


async function generateMichis() {
    mostrarLoadingPage();

    const {data, status} = await api.get('/images/search?limit=3');

    /*const response = await fetch(API_URL_RANDOM);
    const data = await response.json();*/

    console.log('Random');
    //console.log(data);

    if(status !== 200){
        alert(`Hubo un error al cargar las imagenes: ${status} ${data.message}`);
        //spanError.innerHTML = "Hubo un error: " + status;
    } else {

        const img1 = document.getElementById('img1');
        const img2 = document.getElementById('img2');
        const img3 = document.getElementById('img3');

        img1.src = data[0].url;
        img2.src = data[1].url;
        img3.src = data[2].url;

        const btn1 = document.getElementById('favorite-btn1');
        const btn2 = document.getElementById('favorite-btn2');
        const btn3 = document.getElementById('favorite-btn3');
    
        btn1.onclick = () => saveFavouriteMichi(data[0].id);
        btn2.onclick = () => saveFavouriteMichi(data[1].id);
        btn3.onclick = () => saveFavouriteMichi(data[2].id);
        ocultarLoadingPage();
    }

}
const boton = document.getElementById('botonsito');
boton.onclick = generateMichis;

async function loadFavouriteMichis() {
    const {data, status} = await api.get('/favourites');

    /*const response = await fetch(API_URL_FAVORITES,{
        method: 'GET',
        headers: {
            'X-API-KEY': 'live_LG5ied2ExWeAyOKVMg8VDTi7146HtGpFG56YfZ7rslxbMWB9jUbLDjNLlk6iAhiF'
        }
    });
    const data = await response.json();*/

    console.log('favoritos');
    //console.log(data);

    if(status !== 200){
        alert(`Hubo un error al cargar los favoritos: ${status} ${data.message}`);
        //spanError.innerHTML = "Hubo un error: " + status;
    } else {
        const section = document.getElementById('favorite-michis');

        //Limpiar el html antes de cargar a favoritos
        section.innerHTML = "";

        data.forEach(michi => {
            const article = document.createElement('article');
            const img = document.createElement('img');
            const btn = document.createElement('button');
            const btnText = document.createTextNode('Quitar de favoritos');
            const btnImg = document.createElement('img');

            btn.onclick = () => deleteFavouriteMichi(michi.id);

            img.src = michi.image.url;
            btnImg.src = 'https://www.svgrepo.com/show/401238/broken-heart.svg';
            img.width = 500;
            btn.appendChild(btnText);
            btn.appendChild(btnImg);
            article.appendChild(img);
            article.appendChild(btn);
            section.appendChild(article);
        });
    }
}

async function saveFavouriteMichi(id) {
    mostrarRealizado();

    const {data, status} = await api.post('/favourites', {
        image_id: id,
    });

    /*const response = await fetch(API_URL_FAVORITES, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': 'live_LG5ied2ExWeAyOKVMg8VDTi7146HtGpFG56YfZ7rslxbMWB9jUbLDjNLlk6iAhiF'
        },
        body: JSON.stringify({
            image_id: id
        })
    });
    const data = await response.json();*/

    console.log('save');
    //console.log(data);

    if(status !== 200){
        alert(`Hubo un error al guardar en favoritos: ${status} ${data.message}`);
        //spanError.innerHTML = "Hubo un error: " + status + data.message;
    } else {
        console.log('Michi guardado en Favoritos');
        loadFavouriteMichis();
        ocultarRealizado();
    }
}

async function deleteFavouriteMichi(id) {
    mostrarRealizado();

    const {data, status} = await api.delete(`/favourites/${id}`);

    /*const response = await fetch(API_URL_FAVORITES_DELETE(id), {
        method: 'DELETE',
        headers: {
            'X-API-KEY': 'live_LG5ied2ExWeAyOKVMg8VDTi7146HtGpFG56YfZ7rslxbMWB9jUbLDjNLlk6iAhiF'
        }
    });
    const data = await response.json();*/

    if(status !== 200){
        alert(`Hubo un error al borrar de favoritos: ${status} ${data.message}`);
        //spanError.innerHTML = "Hubo un error: " + status + data.message;
    } else {
        console.log('Michi elminado de favoritos');
        loadFavouriteMichis();
        ocultarRealizado();
    }
}

async function uploadMichiPhoto() {
    botonSubir.style.backgroundColor = '#FFE7E7';

    mostrarLoadingPage();

    const form = document.getElementById('uploadingForm');
    const formData = new FormData(form);

    //console.log(formData.get('file'));

    const response = await fetch(API_URL_UPLOAD, {
        method: 'POST',
        headers: {
            //'Content-Type': 'multipart/form-data',
            'X-API-KEY': 'live_LG5ied2ExWeAyOKVMg8VDTi7146HtGpFG56YfZ7rslxbMWB9jUbLDjNLlk6iAhiF'
        },
        body: formData,
    });
    const data = await response.json();

    if(response.status < 200 && response.status > 300){
        alert(`Hubo un error al subir la foto: ${response.status} ${data.message}`);
        //console.log(response);
        //console.log(data);

        //spanError.innerHTML = "Hubo un error: " + response.status + data.message;
    } else {
        console.log('Foto subida:D');
        //console.log({data});
        //console.log(data.url);
        
        saveFavouriteMichi(data.id);
        ocultarLoadingPage();
    }
}
const botonSubir = document.getElementById('upload-input');
const inputSubir = document.getElementById('file');
botonSubir.addEventListener('click', () => {
    inputSubir.click();
})
botonSubir.addEventListener('blur', (event) => {
    event.target.style.background = '#474F7A';
})

//Se llama la función para que funcione al recargar la página
generateMichis();
loadFavouriteMichis();
window.onload = ocultarLoadingPage();