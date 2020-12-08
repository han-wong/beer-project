const artBeerInfo = document.querySelector('article.beer-info');
const btnRandomBeer = document.querySelector('button.random-beer');
const main = document.querySelector('main');
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
    showBeer(beer[0]);
}

function showBeer(beer) {
    const art = document.createElement('article');
    const button = document.createElement('button');
    const div = document.createElement('div');
    const div2 = document.createElement('div');
    const h4 = document.createElement('h4');
    const img = document.createElement('img');

    img.addEventListener('click', e => sectionBeers.removeChild(art));

    art.className = 'beer-info';
    div.className = 'beer-image';
    div2.className = 'beer-name';
    button.className = 'see-more';
    img.src = beer.image_url != null ? beer.image_url : './null.jpg';
    h4.innerText = beer.name;
    button.addEventListener('click', e => renderBeerDescription(beer));
    button.innerText = 'See More >';

    div.appendChild(img);
    div2.appendChild(h4);
    div2.appendChild(button);
    art.appendChild(div);
    art.appendChild(div2);
    sectionBeers.appendChild(art);
}

function renderBeerDescription(beer) {
    console.log(beer);
    const art = document.createElement('article');
    const img = document.createElement('img');
    const div = document.createElement('div');
    const h4 = document.createElement('h4');
    const button = document.createElement('button');
    const info = [
        `${beer.description}`,
        `Alcohol by volume: ${beer.abv} %`,
        `Volume: ${beer.volume.value} ${beer.volume.unit}`,
        `${beer.ingredients}`,
        `${beer.ingredients.hops}`,
        `Consume together with the following food: ${beer.food_pairing.join(' or ')}`,
        `Brewers tips: ${beer.brewers_tips}`,
    ];
    const ul = document.createElement("ul");

    art.className = 'beer-description';
    ul.className = 'beer-info-list';

    art.addEventListener('click', e => {
        main.removeChild(art);
        sectionBeers.classList.remove('invisible');
    });
    sectionBeers.classList.add('invisible');
    h4.textContent = beer.name;
    img.src = beer.image_url != null ? beer.image_url : './null.jpg';
    info.forEach((a, b) => {
        const li = document.createElement('li');
        li.textContent = a;
        ul.appendChild(li);
    });
    div.appendChild(h4);
    div.appendChild(ul);
    art.appendChild(img);
    art.appendChild(div);
    main.appendChild(art);
}
function removeAllChildNodes(parent) {
    while (parent.firstChild)
        parent.removeChild(parent.firstChild);
}