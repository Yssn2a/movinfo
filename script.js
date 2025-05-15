
document.addEventListener("DOMContentLoaded", function () {
  const currentPage = window.location.pathname.split("/").pop(); 
  if (currentPage === "index.html") {
   
    document.querySelector('[data-page="search"]').addEventListener('click', function () {
      window.location.href = 'Search/search.html';
    });

    
    document.querySelector('[data-page="latest"]').addEventListener('click', function () {
      window.location.href = 'popular/popular.html';
    });
  }
});
