// @ts-ignore
import algoliasearch from "algoliasearch/dist/algoliasearch-lite.esm.browser";
import { InstantSearch, SearchBox, RefinementList, HitsPerPage, Configure, InfiniteHits } from "react-instantsearch-hooks-web";
import { Panel } from 'react-instantsearch-dom';
import Game from "~/components/Game";

const searchClient = algoliasearch(
  "C9BHVM3T1K",
  "a021d620f7d285c51059d38910c190e8",
);

export default function Index() {
  return (
    <InstantSearch searchClient={searchClient} indexName="dev_games">
      <Configure hitsPerPage={100} maxValuesPerFacet={20}/>
      <div className="max-w-7xl p-4 md:grid grid-cols-[200px_1fr] gap-4 m-auto">
        <div className="hidden md:block">
          <Panel header="Genre">
            <RefinementList attribute="genre" />
          </Panel>
          <Panel header="Conception">
            <RefinementList attribute="conception" />
          </Panel>
          <Panel header="Development">
            <RefinementList attribute="development" />
          </Panel>
        </div>
        <div>
          <div className="pb-2">
            <SearchBox />
            <div className="md:hidden block pt-2">
              <Panel header="Genre">
                <RefinementList attribute="genre" />
              </Panel>
              <Panel header="Conception">
                <RefinementList attribute="conception" />
              </Panel>
              <Panel header="Development">
                <RefinementList attribute="development" />
              </Panel>
            </div>
          </div>
          <InfiniteHits hitComponent={Game} />
        </div>
      </div>
    </InstantSearch>
  );
}