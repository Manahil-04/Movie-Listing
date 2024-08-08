document.getElementById('searchButton').addEventListener('click', fetchMovies);

function fetchMovies() {
    const query = document.getElementById('searchInput').value;
    if (!query) return;

    fetch(`http://www.omdbapi.com/?s=${query}&apikey=2a44c055`)
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

        const moviePoster = movie.Poster;
        movieElement.innerHTML = `
            <img src="${moviePoster}">
            <h2>${movie.Title}</h2>
            <p>${movie.Year}</p>
        `;

        moviesContainer.appendChild(movieElement);
    });
}
