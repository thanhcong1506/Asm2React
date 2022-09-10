import React from "react";
import MovieList from "../../component/MovieList/MovieList";
import requests from "../../requests";
import Banner from "../../component/Banner/Banner";
import NavBar from "../../component/NavBar/NavBar";

import "./Browse.scss";

function Browse() {
  return (
    <div>
      <div className="home">
        <NavBar />
        <Banner />
        <MovieList fetchUrl={requests.fetchNetflixOriginals} isLargeRow />
        <MovieList title="Xu hướng" fetchUrl={requests.fetchTrending} />
        <MovieList title="Xếp hạng cao" fetchUrl={requests.fetchTopRated} />
        <MovieList title="Hành động" fetchUrl={requests.fetchActionMovies} />
        <MovieList title="Hài" fetchUrl={requests.fetchComedyMovies} />
        <MovieList title="Kinh dị" fetchUrl={requests.fetchHorrorMovies} />
        <MovieList title="Lãng mạn" fetchUrl={requests.fetchRomanceMovies} />
        <MovieList title="Tài liệu" fetchUrl={requests.fetchDocumentaries} />
      </div>
    </div>
  );
}

export default Browse;
