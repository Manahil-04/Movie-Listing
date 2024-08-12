const BASE_API_URL = 'http://www.omdbapi.com/';
const API_KEY = '2a44c055';

document.getElementById('searchButton').addEventListener('click', fetchMovies);

function fetchMovies() {
    const query = document.getElementById('searchInput').value;
    if (!query) return;
    const url = `${BASE_API_URL}?s=${query}&apikey=${API_KEY}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayMovies(data.Search);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function displayMovies(movies) {
    const moviesContainer = document.getElementById('movies');
    moviesContainer.innerHTML = '';

    if (!movies) {
        moviesContainer.innerHTML = '<p>No movies found</p>';
        return;
    }

    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');

        const defaultPoster = 'https://cdn.pixabay.com/photo/2017/01/25/17/35/picture-2008484_640.png';
        const moviePoster = movie.Poster || defaultPoster;
        const title = movie.Title || 'Unknown Title';
        const year = movie.Year || 'Unknown Year';

        movieElement.innerHTML = `
            <img src="${moviePoster}">
            <h2>${movie.Title}</h2>
            <p>${movie.Year}</p>
        `;

        moviesContainer.appendChild(movieElement);
    });
}
