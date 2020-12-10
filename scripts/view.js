class View {
    body = this.getElement('body');
    btnClearAll = this.getElement('.clear-all-button');
    btnNextBeer = this.getElement('.next-beer-button');
    btnPrevBeer = this.getElement('.prev-beer-button');
    btnRandom = this.getElement('.random-beer-button');
    btnSearchBeer = this.getElement('.search-beer-button');
    inpSearchBeer = this.getElement('.search-beer-input');
    main = this.getElement('main');
    sec = this.getElement('.beer-section');
    sec2 = this.getElement('.beer-section-2');
    urlDefaultImage = 'https://images.punkapi.com/v2/keg.png';
    onClick;

    constructor() {
        this.initEventListeners();
    }

    initEventListeners() {
        this.body.addEventListener('click', e => this.onClick(e.target));
    }

    clearAllBeers() {
        this.btnClearAll.disabled = true;
        this.btnRandom.disabled = false;
        this.btnNextBeer.disabled = true;
        this.btnPrevBeer.disabled = true;
        this.inpSearchBeer.placeholder = 'Search beer names';
        this.removeAllChildNodes(this.sec);
    }

    closeBeerCard(id) {
        for (const article of document.querySelectorAll('article.beer-card')) {
            if (article.getAttribute('name') == id) {
                this.sec.removeChild(article);
                break;
            }
        }
        if (!this.sec.hasChildNodes()) {
            this.btnClearAll.disabled = true;
        }
    }

    closeBeerInfo() {
        this.disableButtons(document.querySelectorAll("nav button"), false);
        this.disableButtons(document.querySelectorAll(".beer-card-button"), false);
        this.removeAllChildNodes(this.sec2);
        this.inpSearchBeer.disabled = false;
        this.sec.classList.remove('transparent');
        this.sec2.classList.add('hidden');
    }

    createElement(type, className, text, attr) {
        const element = document.createElement(type);
        if (className) element.className = className;
        if (text) { if (type === 'img') element.src = text; else element.innerHTML = text; }
        if (attr) element.setAttribute(attr.name, attr.value);
        return element;
    }

    disableButtons(buttons, bool) {
        for (const button of buttons) {
            button.disabled = bool;
        }
    }

    getElement(selector) {
        const element = document.querySelector(selector);
        return element;
    }

    handleRandomBeer(beer) {
        this.btnClearAll.disabled = false;
        if (this.inpSearchBeer.value != "") {
            this.btnNextBeer.disabled = true;
            this.btnPrevBeer.disabled = true;
        }
        this.renderBeerCard(beer);
    }

    handleSearchBeer(beers, pageNumber) {
        if (this.inpSearchBeer.value) this.inpSearchBeer.placeholder = `Showing results for ${this.inpSearchBeer.value}`;
        this.inpSearchBeer.value = '';
        this.removeAllChildNodes(this.sec);
        beers.length != 10 ? this.btnNextBeer.disabled = true : this.btnNextBeer.disabled = false;
        pageNumber == 1 ? this.btnPrevBeer.disabled = true : this.btnPrevBeer.disabled = false;
        for (const beer of beers) {
            this.renderBeerCard(beer);
        }
    }

    renderBeerCard(beer) {
        console.log(beer);
        this.btnClearAll.disabled = false;
        const art = this.createElement('article', 'beer-card', null, { name: 'name', value: beer.id });
        const btn = this.createElement('button', 'beer-card-button', 'See More >', { name: 'name', value: beer.id });
        const div = this.createElement('div', 'beer-card-div', null, { name: 'name', value: beer.id });
        const div2 = this.createElement('div', 'beer-card-div-2');
        const h4 = this.createElement('h4', null, beer.name);
        const span = this.createElement('span', 'beer-card-span', null, { name: 'name', value: beer.id });

        span.style.backgroundImage = `url(${beer.image_url ? beer.image_url : this.urlDefaultImage})`;

        div.appendChild(span);
        div2.append(h4, btn);
        art.appendChild(div);
        art.appendChild(div2);
        this.sec.appendChild(art);
    }

    renderBeerInfo(beer) {

        this.disableButtons(document.querySelectorAll("nav button"), true);
        this.disableButtons(document.querySelectorAll(".beer-card-button"), true);
        this.removeAllChildNodes(this.sec2);
        this.inpSearchBeer.disabled = true;
        this.sec.classList.add('transparent');
        this.sec2.classList.remove('hidden');

        const art = this.createElement('article', 'beer-info');
        const div = this.createElement('div', 'beer-info-div');
        const div2 = this.createElement('div', 'beer-info-div-2');
        const div3 = this.createElement('div');
        const h4 = this.createElement('h4', null, beer.name);
        const span = this.createElement('span');
        const ul = this.createElement('ul', 'beer-info-list');
        const info = [
            `${beer.description}`,
            `Alcohol by volume: ${beer.abv} %`,
            `Volume: ${beer.volume.value} ${beer.volume.unit}`,
            `Ingredients: ${Object.getOwnPropertyNames(beer.ingredients).join(', ')}`,
            `Hops: ${beer.ingredients.hops.map(hops => hops.name).join(', ')}`,
            `Consume together with the following food: ${beer.food_pairing.map(food => '<a href="http://www.google.com/search?q=' + food + '" target="_blank">' + food + '</a>').join(' or ')}`,
            `Brewers tips: ${beer.brewers_tips}`,
        ];

        span.style.backgroundImage = `url(${beer.image_url ? beer.image_url : this.urlDefaultImage})`;

        info.forEach((a) => {
            const li = this.createElement('li', null, a);
            ul.appendChild(li);
        });

        div.append(span);
        div3.append(h4, ul);
        div2.append(div3);
        art.append(div, div2);
        this.sec2.append(art);
    }

    removeAllChildNodes(parent) {
        while (parent.firstChild)
            parent.removeChild(parent.firstChild);
    }
}