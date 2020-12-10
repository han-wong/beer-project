class Model {

    beers = [];
    pageNumber = 1;
    randomBeer;
    searchStr;
    url = 'https://api.punkapi.com/v2/beers';
    urlRandomBeer = 'https://api.punkapi.com/v2/beers/random';
    urlSearchBeer = 'https://api.punkapi.com/v2/beers?beer_name=';

    constructor() {

    }

    getBeer(id) {
        return this.beers.find(beer => beer.id == id);
    }

    async getBeers() {
        if (!this.beers || this.beers.length == 0) {
            this.beers = await this.getData(this.urlRandomBeer);
        }
        return this.beers;
    }

    async getData(url) {
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    async getRandomBeer() {
        const beer = await this.getData(this.urlRandomBeer);
        this.beers.push(beer[0]);
        return beer[0];
    }

    async getSearchBeer(searchStr, pageNumber) {
        const url = `${this.urlSearchBeer}${searchStr}&page=${pageNumber}&per_page=10`;
        const beers = await this.getData(url);
        for (const beer of beers) {
            this.beers.push(beer);
        }
        this.pageNumber = pageNumber;
        this.searchStr = searchStr;
        return beers;
    }
}