console.log("holi");

const URL = 'https://api.thecatapi.com/v1/images/search';

window.onload = 
fetch(URL)
    .then(res => res.json())
    .then(data => {
        const img = document.querySelector('img');
        img.src = data[0].url;
    });

async function imgGatito() {
    const response = await fetch(URL);
    const data = await response.json();
    const img = document.querySelector('img');
    img.src = data[0].url;
}

const boton = document.querySelector('button');
boton.onclick = imgGatito;