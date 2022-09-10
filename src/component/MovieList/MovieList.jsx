import React, { useEffect, useState } from "react";
import "./MovieList.scss";
import instance from "../../axios";
import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";

const baseUrl = "https://image.tmdb.org/t/p/original";

export default function MovieList({ fetchUrl, title, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const request = await instance.get(fetchUrl);
      // console.log(request);
      setMovies(request.data.results);
      return request;
    };

    fetchData();
  }, [fetchUrl]);
  console.log(movies);

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  const opts = {
    height: "400",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div className="list">
      <h2 className="listTitle">{title}</h2>
      <div className="listPosters">
        {movies &&
          movies.map((movie) => (
            <img
              onClick={() => handleClick(movie)}
              className={`listPoster ${isLargeRow && "listPosterLarge"}`}
              src={`${baseUrl}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name}
              key={movie.id}
            />
          ))}
      </div>
      <div>
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}</div>
    </div>
  );
}
