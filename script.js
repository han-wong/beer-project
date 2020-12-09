const btnRandomBeer = document.querySelector('button.random-beer');
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
    const art = document.createElement('article');
    const btn = document.createElement('button');
    const div = document.createElement('div');
    const div2 = document.createElement('div');
    const h4 = document.createElement('h4');
    const img = document.createElement('img');

    art.onclick = e => {
        if (e.target != btn) sec.removeChild(art);
        else renderBeerInfo(beer);
    };

    art.className = 'beer-card';
    div.className = 'beer-card-div';
    div2.className = 'beer-card-div-2';
    btn.className = 'beer-card-button';
    img.src = beer.image_url != null ? beer.image_url : './error-404-beer-not-found-prints.jpg';
    h4.innerText = beer.name;
    btn.innerText = 'See More >';

    div.appendChild(img);
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

    const art = document.createElement('article');
    const div = document.createElement('div');
    const div2 = document.createElement('div');
    const h4 = document.createElement('h4');
    const img = document.createElement('img');
    const ul = document.createElement("ul");
    const info = [
        `${beer.description}`,
        `Alcohol by volume: ${beer.abv} %`,
        `Volume: ${beer.volume.value} ${beer.volume.unit}`,
        `${beer.ingredients}`,
        `${beer.ingredients.hops}`,
        `Consume together with the following food: ${beer.food_pairing.join(' or ')}`,
        `Brewers tips: ${beer.brewers_tips}`,
    ];

    art.className = 'beer-info';
    div.className = 'beer-info-div';
    div2.className = 'beer-info-div-2';
    ul.className = 'beer-info-list';

    art.onclick = e => {
        disableButtons(document.querySelectorAll("nav>button"), false);
        disableButtons(document.querySelectorAll(".beer-card-button"), false);
        removeAllChildNodes(sec2);
        sec.classList.remove('transparent');
    };

    h4.textContent = beer.name;
    img.src = beer.image_url != null ? beer.image_url : './error-404-beer-not-found-prints.jpg';

    info.forEach((a, b) => {
        const li = document.createElement('li');
        li.textContent = a;
        ul.appendChild(li);
    });

    div.appendChild(img);
    div2.appendChild(h4);
    div2.appendChild(ul);
    art.appendChild(div);
    art.appendChild(div2);
    sec2.appendChild(art);
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