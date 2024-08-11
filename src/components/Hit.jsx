import { Highlight } from "react-instantsearch";
import { getPropertyByPath } from "instantsearch.js/es/lib/utils";
import { useNavigate } from "react-router-dom";

export const Hit = ({ hit }) => {
  const navigate = useNavigate();

  const handleShowMore = () => {
    navigate(`/film/${hit.objectID}`);
  };

  return (
    <article className="grid grid-cols-2 gap-8 max-sm:grid-cols-1 max-sm:text-center">
      <div className="max-sm:flex max-sm:flex-col max-sm:items-center ">
        <img
          src={hit.poster_path}
          alt="movie picture"
          className="h-[500px] w-[350px] object-cover shadow-lg rounded-2xl"
        />
      </div>
      <div className="flex flex-col justify-between max-sm:gap-6">
        <div>
          <h2 className="text-2xl font-semibold">
            <Highlight attribute="title" hit={hit} />
          </h2>
          <p className="mt-2">
            <Highlight attribute="overview" hit={hit} />
          </p>
          <span className="block mt-4 text-sm text-gray-400">
            {getPropertyByPath(hit, "cast.1.name")}
          </span>
          <p className="mt-4 text-sm text-gray-400">
            Release date: {hit.release_date}
          </p>
          <div className="flex justify-between items-center max-sm:flex-col max-sm:space-y-6">
            <p className="flex gap-4 mt-4">
              {hit.genres.map((genre, index) => (
                <span
                  key={index}
                  className="inline-block px-2 py-1 bg-slate-700 rounded-full shadow-lg"
                >
                  {genre}
                </span>
              ))}
            </p>
            <p className="mt-2 p-2 text-sm text-white font-bold bg-orange-700 rounded-full">
              {hit.vote_average}
            </p>
          </div>
        </div>
        <div>
          <button
            onClick={handleShowMore}
            className="p-2 bg-slate-700 hover:bg-slate-700/25 hover:font-bold transition-all rounded-lg max-sm:p-4 max-sm:text-xl"
          >
            Read more
          </button>
        </div>
      </div>
    </article>
  );
};
