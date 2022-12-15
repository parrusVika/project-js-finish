

import axios from 'axios';

const API_KEY = 'e52c7d8699df589ec79fa44e6b7f6a0c';
const BASE_URL = 'https://api.themoviedb.org/';


export default class FilmotekaApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    fetchFilmoteka() {
        const url = `${BASE_URL}3/search/search-movies?key=${API_KEY}&query=${this.searchQuery}`;
        return axios
            .get(url)
            .then(function (response) {
                console.log(response.data);
                return response.data;
            })
            .then(({ tota_results, results }) => {
                this.incrementPage();
                return { tota_results, results };
            })
            .catch(error => console.log(error));
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}