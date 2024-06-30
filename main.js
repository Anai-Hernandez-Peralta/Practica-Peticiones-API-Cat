const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=3';

const API_URL_FAVORITES = 'https://api.thecatapi.com/v1/favourites';

const API_URL_FAVORITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}`;

const API_URL_UPLOAD = 'https://api.thecatapi.com/v1/images/upload';

//const spanError = document.getElementById('error');

//Funciona en el momento en que la página se termina de cargar
/*window.onload = 
fetch(API_URL)
    .then(res => res.json())
    .then(data => {
        const img = document.querySelector('img');
        img.src = data[0].url;
    });*/

async function generateMichis() {
    const response = await fetch(API_URL_RANDOM);
    const data = await response.json();

    console.log('Random');
    console.log(data);

    if(response.status !== 200){
        alert(`Hubo un error al cargar las imagenes: ${response.status} ${data.message}`);
        //spanError.innerHTML = "Hubo un error: " + response.status;
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
    }

}
const boton = document.getElementById('botonsito');
boton.onclick = generateMichis;

async function loadFavouriteMichis() {
    const response = await fetch(API_URL_FAVORITES,{
        method: 'GET',
        headers: {
            'X-API-KEY': 'live_LG5ied2ExWeAyOKVMg8VDTi7146HtGpFG56YfZ7rslxbMWB9jUbLDjNLlk6iAhiF'
        }
    });
    const data = await response.json();

    console.log('favoritos');
    console.log(data);

    if(response.status !== 200){
        alert(`Hubo un error al cargar los favoritos: ${response.status} ${data.message}`);
        //spanError.innerHTML = "Hubo un error: " + response.status;
    } else {
        const section = document.getElementById('favorite-michis');

        //Limpiar el html antes de cargar a favoritos
        section.innerHTML = "";

        const h2 = document.createElement('h2');
        const h2Text = document.createTextNode('Michis favoritos');
        h2.appendChild(h2Text);
        section.appendChild(h2);

        data.forEach(michi => {
            const article = document.createElement('article');
            const img = document.createElement('img');
            const btn = document.createElement('button');
            const btnText = document.createTextNode('Quitar de favoritos');

            btn.onclick = () => deleteFavouriteMichi(michi.id);

            img.src = michi.image.url;
            img.width = 500;
            btn.appendChild(btnText);
            article.appendChild(img);
            article.appendChild(btn);
            section.appendChild(article);
        });
    }
}

async function saveFavouriteMichi(id) {
    const response = await fetch(API_URL_FAVORITES, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': 'live_LG5ied2ExWeAyOKVMg8VDTi7146HtGpFG56YfZ7rslxbMWB9jUbLDjNLlk6iAhiF'
        },
        body: JSON.stringify({
            image_id: id
        })
    });
    const data = await response.json();

    console.log('save');
    console.log(data);

    if(response.status !== 200){
        alert(`Hubo un error al guardar en favoritos: ${response.status} ${data.message}`);
        //spanError.innerHTML = "Hubo un error: " + response.status + data.message;
    } else {
        console.log('Michi guardado en Favoritos');
        loadFavouriteMichis();
    } 
}

async function deleteFavouriteMichi(id) {
    const response = await fetch(API_URL_FAVORITES_DELETE(id), {
        method: 'DELETE',
        headers: {
            'X-API-KEY': 'live_LG5ied2ExWeAyOKVMg8VDTi7146HtGpFG56YfZ7rslxbMWB9jUbLDjNLlk6iAhiF'
        }
    });
    const data = await response.json();

    if(response.status !== 200){
        alert(`Hubo un error al borrar de favoritos: ${response.status} ${data.message}`);
        //spanError.innerHTML = "Hubo un error: " + response.status + data.message;
    } else {
        console.log('Michi elminado de favoritos');
        loadFavouriteMichis();
    }
}

async function uploadMichiPhoto() {
    const form = document.getElementById('uploadingForm');
    const formData = new FormData(form);

    console.log(formData.get('file'));

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
        console.log(response);
        console.log(data)
        //spanError.innerHTML = "Hubo un error: " + response.status + data.message;
    } else {
        console.log('Foto subida:D');
        console.log({data});
        console.log(data.url);
        
        saveFavouriteMichi(data.id);
    }
}

//Se llama la función para que funcione al recargar la página
generateMichis();
loadFavouriteMichis();