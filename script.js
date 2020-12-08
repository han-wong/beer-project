const artBeerInfo = document.querySelector('article.beer-info');
const btnRandomBeer = document.querySelector('button.random-beer');
const sectionBeers = document.querySelector('section.beers');
const urlRandomBeer = 'https://api.punkapi.com/v2/beers/random';

btnRandomBeer.addEventListener('click', e => getBeer(urlRandomBeer, showRandomBeer));

getBeer(urlRandomBeer, showRandomBeer);
function getBeer(url, callback) {
    fetch(url)
        .then(response => response.json())
        .then(callback)
        .catch(error => console.log(error));
}

function showRandomBeer(beer) {
    const art = document.createElement('article');
    const img = document.createElement('img');
    let info = [
        `${beer[0].image_url}`,
        `${beer[0].name}`,
        `first brewed: ${beer[0].first_brewed} `,
    ];
    const ul = document.createElement("ul");

    art.className = 'beer-info';
    img.className = 'beer-image';
    ul.className = 'beer-info-list';

    info.forEach((item, i) => {
        if (i == 0 && item != "null") {
            img.src = item;
        } else if (i == 0) {
            img.src = 'https://images.punkapi.com/v2/keg.png';
        } else {
            let li = document.createElement('li');
            li.textContent = item;
            ul.appendChild(li);
        }
    });

    art.appendChild(img);
    art.appendChild(ul);
    sectionBeers.appendChild(art);
    console.log(beer);
}

function removeAllChildNodes(parent) {
    while (parent.firstChild)
        parent.removeChild(parent.firstChild);
}