(async () => {
  const axiosMod = await import("https://esm.run/axios@1");
  const zodMod = await import("https://esm.run/zod@3");

  const axios = axiosMod.default;
  const z = zodMod.z;

  const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1M2ZmNjljNmRiM2YxMjgxZTk2ZTRlODQ5ZWRhNmQ2NSIsInN1YiI6IjU2YzRhZmU1YzNhMzY4MGQzZTAwMDIyMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-TqKfzJ2O4yVBYI0aiaUDgkg_WDRhOoRfnC5U-QE2SU`
    }
  });

  const movieSchema = z.object({
    id: z.number(),
    title: z.string(),
    vote_average: z.number().optional(),
    overview: z.string().optional(),
    release_date: z.string().optional(),
    poster_path: z.string().nullable(),
  });
  
  const moviesResponseSchema = z.object({
    results: z.array(movieSchema),
  });

  window.searchMovies = async (query) => {
    try {
      const { data } = await instance.get("/search/movie", {
        params: { query }
      });
      const parsed = moviesResponseSchema.parse(data);
      console.log(parsed)
      return parsed;
    } catch (err) {
      console.error("❌ Error in searchMovies:", err);
      return { results: [] };
    }
  };

  window.renderMovieCard = (movie) => {
  const {
    title,
    vote_average = "N/A",
    overview = "No description available.",
    release_date = "Unknown",
    poster_path,
  } = movie;

  const posterUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : ""

  const cardHTML = `
    <div class="movie_card" style="display:flex;flex-direction:row;gap:16px;margin-bottom:20px;background:#222;color:#fff;padding:16px;border-radius:10px;">
      <img src="${posterUrl}" alt="${title}" />
      <div class="info_section">
        <div class="movie_header">
          <h1>${title}</h1>
          <h4>${release_date}</h4>
          <span class="minutes">Rating: ${vote_average}</span>
          <p class="type">Movie</p>
        </div>
        <div class="movie_desc">
          <p class="text">${overview}</p>
        </div>
      </div>
    </div>
  `;

  const container = document.getElementById("results");
  container.insertAdjacentHTML("beforeend", cardHTML);
};


  window.searchAndRender = async () => {
    const input = document.getElementById("messageInput");
    const query = input.value.trim();

    if (!query) return;

    document.getElementById("results").innerHTML = ""; // Clear old
    const result = await searchMovies(query);
    result.results.forEach(renderMovieCard);
  };

  console.log("✅ Type `searchAndRender()` or click the search button to search movies.");
})();
