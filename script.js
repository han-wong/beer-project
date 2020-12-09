const btnRandomBeer = document.querySelector('button.random-beer');
const urlDefaultImage = 'https://images.punkapi.com/v2/keg.png';
const main = document.querySelector('main');
const sec = document.querySelector('.beer-section');
const sec2 = document.querySelector('.beer-section-2');
const urlRandomBeer = 'https://api.punkapi.com/v2/beers/random';

btnRandomBeer.addEventListener('click', e => getBeer(urlRandomBeer, showRandomBeer));

getBeer(urlRandomBeer, showRandomBeer);

main.addEventListener('click', e => console.log(e));

function getBeer(url, callback) {
    fetch(url)
        .then(response => response.json())
        .then(callback)
        .catch(error => console.log(error));
}

function showRandomBeer(beer) {
    renderBeer(beer[0]);
}

function renderBeer(beer) {
    const art = createElement('article', 'beer-card');
    const btn = createElement('button', 'beer-card-button', 'See More >');
    const div = createElement('div', 'beer-card-div');
    const div2 = createElement('div', 'beer-card-div-2');
    const h4 = createElement('h4', null, beer.name);
    const span = createElement('span');

    art.onclick = e => {
        if (e.target != btn) sec.removeChild(art);
        else renderBeerInfo(beer);
    };

    span.style.backgroundImage = `url(${beer.image_url ? beer.image_url : urlDefaultImage})`;

    div.appendChild(span);
    div2.appendChild(h4);
    div2.appendChild(btn);
    art.appendChild(div);
    art.appendChild(div2);
    sec.appendChild(art);
}

function renderBeerInfo(beer) {
    btnRandomBeer.disabled = true;
    disableButtons(document.querySelectorAll("nav>button"), true);
    disableButtons(document.querySelectorAll(".beer-card-button"), true);
    removeAllChildNodes(sec2);
    sec.classList.add('transparent');

    const art = createElement('article', 'beer-info');
    const div = createElement('div', 'beer-info-div');
    const div2 = createElement('div', 'beer-info-div-2');
    const h4 = createElement('h4', null, beer.name);
    const span = createElement('span');
    const ul = createElement('ul', 'beer-info-list');
    const info = [
        `${beer.description}`,
        `Alcohol by volume: ${beer.abv} %`,
        `Volume: ${beer.volume.value} ${beer.volume.unit}`,
        `Ingredients: ${Object.getOwnPropertyNames(beer.ingredients).join(', ')}`,
        `Hops: ${beer.ingredients.hops.map(hops => hops.name).join(', ')}`,
        `Consume together with the following food: ${beer.food_pairing.map(food => '<a href="http://www.google.com/search?q=' + food + '" target="_blank">' + food + '</a>').join(' or ')}`,
        `Brewers tips: ${beer.brewers_tips}`,
    ];

    art.onclick = e => {
        disableButtons(document.querySelectorAll("nav>button"), false);
        disableButtons(document.querySelectorAll(".beer-card-button"), false);
        removeAllChildNodes(sec2);
        sec.classList.remove('transparent');
    };

    div.style.backgroundImage = `url(${beer.image_url ? beer.image_url : urlDefaultImage})`;

    info.forEach((a, b) => {
        const li = createElement('li', null, a);
        ul.appendChild(li);
    });
    div.appendChild(span);
    div2.appendChild(h4);
    div2.appendChild(ul);
    art.appendChild(div);
    art.appendChild(div2);
    sec2.appendChild(art);
}

function createElement(type, className = null, text = null, attr = null) {
    const element = document.createElement(type);
    if (className) element.className = className;
    if (text) { if (type === 'img') element.src = text; else element.innerHTML = text; }
    if (attr) element.setAttribute(attr.name, attr.value);
    return element;
}

function disableButtons(buttons, bool) {
    for (const button of buttons) {
        button.disabled = bool;
    }
}
function removeAllChildNodes(parent) {
    while (parent.firstChild)
        parent.removeChild(parent.firstChild);
}