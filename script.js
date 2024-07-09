$(document).ready(function () {
  function searchMovies() {
    $.ajax({
      url:
        "http://www.omdbapi.com/?apikey=a52699d5&s=" +
        $(".input-keyword").val(),
      success: function (results) {
        console.log(results);
        const movies = results.Search;
        console.log(movies);

        let cards = "";
        movies.forEach((m) => {
          cards += showCards(m);
        });

        $(".movies-container").html(cards);

        // ketika tombol detail diklik
        $(".modal-detail-button").on("click", function () {
          $.ajax({
            url:
              "http://www.omdbapi.com/?apikey=a52699d5&i=" +
              $(this).data("imdbid"),
            success: (m) => {
              const movieDetail = showMovieDetail(m);
              $(".modal-body").html(movieDetail);
            },
            error: (e) => {
              console.log(e.responseText);
            },
          });
        });
      },
      error: (e) => {
        console.log(e.responseText);
        alert(e.responseText);
      },
    });
  }

  // Event listener untuk tombol search
  $(".search-button").on("click", function () {
    searchMovies();
  });

  // Event listener untuk menekan tombol Enter pada input field
  $(".input-keyword").on("keypress", function (e) {
    if (e.key === "Enter") {
      searchMovies();
    }
  });
});

function showCards(m) {
  return `<div class="col-md-4 my-3">
                  <div class="card">
                    <img src="${m.Poster}" class="card-img-top" />
                    <div class="card-body">
                      <h5 class="card-title">${m.Title}</h5>
                      <h6 class="card-subtitle mb-2 text-body-secondary">
                        ${m.Year}
                      </h6>
                      <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal"
      data-bs-target="#movieDetailModal" data-imdbid="${m.imdbID}">Show Details</a>
                    </div>
                  </div>
                </div>`;
}

function showMovieDetail(m) {
  return `<div class="container-fluid">
                                <div class="row">
                                  <div class="col-md-3">
                                    <img src="${m.Poster}" class="img-fluid" />
                                  </div>
                                  <div class="col-md">
                                    <ul class="list-group">
                                      <li class="list-group-item"><h4>${m.Title} (${m.Year})</h4></li>
                                      <li class="list-group-item"><strong>Director : </strong> ${m.Director}</li>
                                      <li class="list-group-item"><strong>Actors : </strong>${m.Actors}</li>
                                      <li class="list-group-item"><strong>Writer : </strong>${m.Writer}</li>
                                      <li class="list-group-item"><strong>Plot : </strong> <br>${m.Plot}</li>
                                    </ul>
                                  </div>
                                </div>
                              </div>`;
}