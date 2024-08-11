import algoliasearch from "algoliasearch/lite";
import { Hits, InstantSearch, SearchBox, Configure } from "react-instantsearch";

import { Hit } from "./Hit";

const searchClient = algoliasearch(
  import.meta.env.VITE_ALGOLIA_APP_ID,
  import.meta.env.VITE_ALGOLIA_API_KEY
);

export const Search = () => {
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName="movie_by_vote_average_desc"
    >
      <Configure hitsPerPage={10} />
      <div className="max-w-[960px] w-full block mx-auto my-12">
        <SearchBox
          placeholder="Search for film"
          classNames={{
            root: "search-box",
          }}
        />
        <h1 className="text-4xl my-8 text-center font-bold text-orange-700 font-serif">
          Top 10
        </h1>
        <Hits hitComponent={Hit} />
      </div>
    </InstantSearch>
  );
};
