class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.initEventListeners();
    }
    initEventListeners() {
        this.view.onClick = t => this.onClicked(t);
    }
    async init() {
        const beer = await this.model.getRandomBeer();
        this.view.clearAllBeers();
        this.view.renderBeerCard(beer);
    }

    async onClicked(t) {
        if (t.className == 'beer-card-button') { this.view.renderBeerInfo(this.model.getBeer(t.getAttribute('name'))); }
        if (t.className == 'beer-card-div' || t.className == 'beer-card-span') { this.view.closeBeerCard(t.getAttribute('name')); }
        if (t.className == 'beer-section-2') { this.view.closeBeerInfo(); }
        if (t.className == 'random-beer-button') { this.view.handleRandomBeer(await this.model.getRandomBeer()); }
        if (t.className == 'clear-all-button') { this.view.clearAllBeers(); }
        if (t.className == 'search-beer-button' && this.view.inpSearchBeer.value) { this.view.handleSearchBeer(await this.model.getSearchBeer(this.view.inpSearchBeer.value, 1), 1); }
        if (t.className == 'next-beer-button') { this.view.handleSearchBeer(await this.model.getSearchBeer(this.model.searchStr, ++this.model.pageNumber), this.model.pageNumber); }
        if (t.className == 'prev-beer-button') { this.view.handleSearchBeer(await this.model.getSearchBeer(this.model.searchStr, --this.model.pageNumber), this.model.pageNumber); }
    }
}