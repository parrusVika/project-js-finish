import FilmotekaApiService from './filmoteka-service'
import Notiflix from 'notiflix';

const refs = {
    form: document.querySelector('.search-form'),
    galleryContainer: document.querySelector('.gallery'),
};

let results = 1;



const FilmotekaApiService = new FilmotekaApiService();

refs.form.addEventListener('submit', onSearch);

function onSearch(e) {
    e.preventDefault();

    FilmotekaApiService.query = e.currentTarget.elements.searchQuery.value;

    if (!FilmotekaApiService.query) {
        Notiflix.Notify.failure(
            'Search box cannot be empty. Please enter the word.'
        );
        return;
    }


    FilmotekaApiService.resetPage();
    clearGalleryContainer();

    fetchFilmoteka();

    refs.form.reset();
}

function fetchFilmoteka() {
    FilmotekaApiService.fetchFilmoteka().then(({ total_results, results }) => {
        if (!results) {
            Notiflix.Notify.failure(
                " Search result not successful.Enter the correct movie name and "
            );
            return;

        }
    });
}

console.log(fetchFilmoteka)

function renderImagesCards(movies) {
    const markup = movies
        .map(
            movies =>
                `<div class="photo-card">
  <a href="${movies.largeImageURL}" class="gallery__item">
    <img class="img" src="${movies.webformatURL}" alt="${movies.tags}" loading="lazy" />
  </a>
  <div class="info">
    <p class="info-item"></p>
  </div>
</div>`
        )
        .join('');

    refs.galleryContainer.insertAdjacentHTML('beforeend', markup);
}

// function clearGalleryContainer() {
//     refs.galleryContainer.innerHTML = '';
// }

// function scrollImagesCards() {
//     const { height: cardHeight } =
//         refs.galleryContainer.firstElementChild.getBoundingClientRect();

//     window.scrollBy({
//         top: cardHeight * 2,
//         behavior: 'smooth',
//     });
// }