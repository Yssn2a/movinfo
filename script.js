
document.addEventListener("DOMContentLoaded", function () {
  const currentPage = window.location.pathname.split("/").pop(); 
  if (currentPage === "index.html") {
   
    document.querySelector('[data-page="search"]').addEventListener('click', function () {
      window.location.href = '/movinfo/Search/search.html';
    });

    
    document.querySelector('[data-page="latest"]').addEventListener('click', function () {
      window.location.href = '/movinfo/Popular/popular.html';
    });
  }
});
