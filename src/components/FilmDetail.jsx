import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, LookingSimilar } from "react-instantsearch";

const searchClient = algoliasearch(
  import.meta.env.VITE_ALGOLIA_APP_ID,
  import.meta.env.VITE_ALGOLIA_API_KEY
);

const index = searchClient.initIndex("movie");

const FilmDetail = () => {
  const { objectID } = useParams();
  const [film, setFilm] = useState(null);

  useEffect(() => {
    const fetchFilm = async () => {
      try {
        const { hits } = await index.search("", {
          filters: `objectID:${objectID}`,
          hitsPerPage: 1,
        });
        const foundFilm = hits[0];

        console.log(foundFilm);
        console.log(hits);

        if (foundFilm) {
          setFilm(foundFilm);
        } else {
          console.error("Film not found. ObjectID:", objectID);
        }
      } catch (error) {
        console.error("Error fetching film:", error);
      }
    };

    fetchFilm();
  }, [objectID]);

  if (!film) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Link
          to="/"
          className="text-xs mb-12 text-white/30 hover:text-white hover:border-b-2 transition-all duration-75 max-md:hidden"
        >
          Home
        </Link>
        <p className="text-center text-xl text-gray-500">
          No details for this film.
        </p>
      </div>
    );
  }

  return (
    <div id="header" className="max-w-5xl mx-auto p-4 mt-20">
      <Link
        to="/"
        className="text-xs text-white/30 hover:text-white hover:border-b-2 transition-all duration-75 max-md:hidden"
      >
        Home
      </Link>
      <h1 className="text-4xl font-bold mb-20 text-center max-sm:mb-8">
        {film.title}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
        <div className="text-center max-sm:flex max-sm:flex-col max-sm:items-center">
          <img
            src={film.poster_path}
            alt={film.title}
            className="w-full h-auto rounded-lg shadow-2xl transition-all hover:scale-95 hover:shadow-black duration-300 max-sm:w-1/2"
          />
        </div>
        <div className="max-sm:text-center">
          <p className="text-lg mb-4 max-sm:text-base">{film.overview}</p>
          <p className="mb-2">
            <strong>Release Date:</strong> {film.release_date}
          </p>
          <p className="mb-2">
            <strong className="font-bold text-lg">Original Language:</strong>{" "}
            {film.original_language}
          </p>
          <p className="mb-2">
            <strong className="font-bold text-lg">Vote Average:</strong>{" "}
            {film.vote_average}
          </p>
          <p className="mb-2">
            <strong className="font-bold text-lg">Popularity:</strong>{" "}
            {film.popularity}
          </p>
          <p className="mb-2">
            <strong className="font-bold text-lg">Genres:</strong>{" "}
            {film.genres.join(", ")}
          </p>
          <h3 className="font-bold text-lg mt-4 mb-2">Cast</h3>
          <div className="flex items-center justify-between max-sm:flex-col">
            <ul className="list-disc list-inside space-y-2">
              {film.cast.slice(0, 5).map((actor, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                  {actor.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="text-center text-orange-600 text-4xl font-bold mt-8 flex flex-col items-center">
        <InstantSearch searchClient={searchClient} indexName="movie">
          <span className="text-base text-white/35 font-thin">top 6</span>
          {film && (
            <LookingSimilar
              objectIDs={[film.objectID]}
              itemComponent={SimilarComponent}
              limit={6}
            />
          )}
        </InstantSearch>
      </div>
    </div>
  );
};

function SimilarComponent({ item }) {
  const handleClick = () => {
    const header = document.getElementById("header");
    if (header) {
      header.scrollIntoView({ behavior: "smooth" });
    }
    navigate(`/film/${item.objectID}`);
  };

  return (
    <Link to={`/film/${item.objectID}`} onClick={handleClick}>
      <img
        src={item.poster_path}
        alt={item.title}
        className="rounded-2xl cursor-pointer hover:scale-95 hover:shadow-2xl hover:shadow-black transition-all"
      />
    </Link>
  );
}

export default FilmDetail;
