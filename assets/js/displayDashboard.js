var movieDashboardEl = document.getElementById("movie-dashboard");

// Rendering recently released movies from the TMDB website via API request 

function displayDashboard() {
    var tmdbAPIKey = "2afde4157466d3c7f2ac22591131e338";
    var movieDbURL = `https://api.themoviedb.org/3/discover/movie?api_key=${tmdbAPIKey}`;
    
    fetch(movieDbURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            // Dynamically rendering the recently released movies on the landing page
            for (var i = 0; i < data.results.length; i++) {
                var posterID = data.results[i].poster_path.slice(1); // Removed redundant variable re-declaration
                movieDashboardEl.innerHTML += `<a class="section"><img src="https://image.tmdb.org/t/p/original${data.results[i].poster_path}" placeholder="${data.results[i].title}" id="${posterID}" style="width:140px;"/></a>`;
            }
        });
}

// Redirecting to the review page and store the persistant data in the local storage once we clicked on the movie poster on the landing page

function displayMovieReview(event) {
    var currentMovieTile = event.target;
    var movieName = currentMovieTile.getAttribute('placeholder');
    var posterID = currentMovieTile.getAttribute('id').split('.');
    var imageID = posterID.pop()
    var newimageID = posterID.join(".")

    var viewedMovies = JSON.parse(localStorage.getItem('viewedMovies')) || [];
    viewedMovies.push({ name: movieName, posterID: posterID });
    localStorage.setItem('viewedMovies', JSON.stringify(viewedMovies));

    // Redirect to the review page in the same window
    window.location.href = `./review.html?movie=${movieName}&posterid=${newimageID}`;
}

window.addEventListener("load", displayDashboard);
movieDashboardEl.addEventListener("click", displayMovieReview);
