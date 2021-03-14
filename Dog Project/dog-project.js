const BREEDS_URL = 'https://dog.ceo/api/breeds/list/all'; 
const select = document.querySelector('#breeds'); 
const image = document.querySelector('.dog-image'); 
const spinner = document.querySelector('.loading'); 

fetch(BREEDS_URL)
    .then(response => {
        return response.json(); 
    })
    .then(data => {
        const breedsObject = data.message; 
        const breedsArray = Object.keys(breedsObject); 
        for (let i = 0; i < breedsArray.length; i++) {
            const option = document.createElement('option'); 
            option.value = breedsArray[i]; 
            option.innerText = breedsArray[i]; 
            select.appendChild(option); 
        }        
    });

function getDogImage(url) {
    spinner.classList.add('show'); 
    image.classList.remove('show'); 
    fetch(url)
        .then(response => {
            return response.json(); 
        })
        .then(data => {
            const imageUrl = data.message; 
            image.src = imageUrl;
            // spinner.classList.remove('show'); 
            // image.classList.add('show'); 
        })
}

select.addEventListener('change', function(event) {
    const breedValue = event.target.value; 
    const breedUrl = `https://dog.ceo/api/breed/${event.target.value}/images/random`; 
    getDogImage(breedUrl); 
});

image.addEventListener('load', function() {
    spinner.classList.remove('show'); 
    image.classList.add('show'); 
})