console.log("holi");

const API_URL = 'https://api.thecatapi.com/v1/images/search?limit=3&api_key=live_LG5ied2ExWeAyOKVMg8VDTi7146HtGpFG56YfZ7rslxbMWB9jUbLDjNLlk6iAhiF';

//Funciona en el momento en que la página se termina de cargar
/*window.onload = 
fetch(API_URL)
    .then(res => res.json())
    .then(data => {
        const img = document.querySelector('img');
        img.src = data[0].url;
    });*/

async function imgGatito() {
    const response = await fetch(API_URL);
    const data = await response.json();

    const img1 = document.getElementById('img1');
    const img2 = document.getElementById('img2');
    const img3 = document.getElementById('img3');

    img1.src = data[0].url;
    img2.src = data[1].url;
    img3.src = data[2].url;

}

const boton = document.getElementById('botonsito');
boton.onclick = imgGatito;

//Se llama la función para que funcione al recargar la página
imgGatito();