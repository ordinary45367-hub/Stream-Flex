import "./styles/HeroBanner.css";
export function HeroBanner({ movie }) {
  console.log(movie);

  return (
    <>
      <section className="hero-section container-fluid py-4">
        <div className="banner-wrapper row">
          <div className="poster-picture col-12 col-md-3 col-lg3">
            <img
              className="img-fluid poster-img rounded"
              src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
              alt=""
            />
          </div>
          <div className="banner-picture col-12 col-md-9 col-lg9 position-relative">
            <img
              className="banner-img rounded"
              src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
              alt=""
            />
            <div className="content position-absolute top-50 start-0 translate-middle-y text-white p-3 p-md-4">
              <h1 className="title">{movie?.title}</h1>
              <p className="rating">
                ⭐ {Number(movie?.vote_average).toFixed(1)}
              </p>
              <p className="overview">{movie?.overview}</p>
              <div className="btn-wrapper">
                <a
                  href={`https://vidsrc.sh/embed/movie?tmdb=${movie?.id}`}
                  className="wath-movie-btn btn btn-danger"
                >
                  {" "}
                  <i className="fa-solid fa-play me-2"></i>
                  Watch Movie
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
