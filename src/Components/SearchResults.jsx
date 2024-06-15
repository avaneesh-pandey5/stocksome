import React from "react";
import "./SearchResults.css";
import { useNavigate } from "react-router-dom";

const SearchResults = ({
  results,
  setResult,
  setResults,
  setInput,
  onClickSearchResult,
  setResultsClicked,
  resultsClicked,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className="results-list"
      style={{ display: resultsClicked ? "block" : "none" }}
    >
      {results.map((result, id) => {
        return (
          <div
            key={id}
            className="search-result"
            onClick={() => navigate(`/company/${result.Symbol}`)}
          >
            {`${result.CompanyName} || ${result.Symbol}`}
          </div>
        );
      })}
    </div>
  );
};

export default SearchResults;
