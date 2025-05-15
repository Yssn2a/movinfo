const bearerToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1M2ZmNjljNmRiM2YxMjgxZTk2ZTRlODQ5ZWRhNmQ2NSIsInN1YiI6IjU2YzRhZmU1YzNhMzY4MGQzZTAwMDIyMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-TqKfzJ2O4yVBYI0aiaUDgkg_WDRhOoRfnC5U-QE2SU";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";
const BASE_URL = "https://api.themoviedb.org/3/movie/popular";
let currentPage = 1; // Start from page 1

async function loadMovies(page = 1) {
  try {
    const response = await fetch(`${BASE_URL}?page=${page}`, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();
    const container = document.getElementById("movies-container");

    if (data.results && Array.isArray(data.results)) {
      data.results.forEach(movie => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
          <div class="card2">
            <div class="Poster" style='background-image: linear-gradient(163deg, #4000ff00 30%, #5500ffb8 200%), url("${IMAGE_BASE + movie.poster_path}");'></div>
            <p id="name">${movie.title}</p>
            <p id="rating">Rating: ${movie.vote_average}</p>
            <p>Release: ${movie.release_date}</p>
          </div>
        `;
        container.appendChild(card);
      });
    } else {
      console.error("Unexpected API response format:", data);
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
}

// Load first page on page load
document.addEventListener("DOMContentLoaded", () => {
  loadMovies(currentPage);

  const loadMoreBtn = document.getElementById("load-more");
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", () => {
      currentPage++;
      loadMovies(currentPage);
    });
  }
});
