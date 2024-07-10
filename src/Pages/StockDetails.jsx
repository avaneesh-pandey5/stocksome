import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "moment";
import "chartjs-adapter-moment";
import Navbar from "../Components/Navbar";
import PriceChart from "../Components/PriceChart";
import PriceSummary from "../Components/PriceSummary";
import CompanyEssentials from "../Components/CompanyEssentials";
import TestChart from "../Components/TestChart";
import SearchBar from "../Components/SearchBar";
import SearchResults from "../Components/SearchResults";

export const LineChart = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [result, setResult] = useState([]);
  const [resultsClicked, setResultsClicked] = useState(false);
  const handleOnFocus = () => {
    setResultsClicked(true);
  };
  const { symbol } = useParams();
  const [companyName, setCompanyName] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/get-name/${symbol}`
        );
        const data = await response.json();
        setCompanyName(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleOnBlur = () => {
    // if (!resultsClicked){
    //   setResults([]);
    // }
    // setResultsClicked(false);
    setTimeout(() => {
      setResultsClicked(false);
    }, 500);
  };

  const onClickSearchResult = (result) => {
    setResult(result);
    console.log(result);
    // navigate('/StockDetails.jsx')
  };
  return (
    <div className="">
      <Navbar />
      <div className="flex flex-row border-2 border-black h-screen overflow-y-scroll">
        <div>
          <div className="text-black pt-28 pl-20 mb-10">
            <div>
              <div className="w-full ml-[25%] pb-10">
                <SearchBar
                  onBlur={handleOnBlur}
                  onFocus={handleOnFocus}
                  setInput={setInput}
                  input={input}
                  setResults={setResults}
                />
                <div className="search-results-container w-full ml-[25%]">
                  <SearchResults
                    results={results}
                    setResult={setResult}
                    setResults={setResults}
                    setInput={setInput}
                    onClickSearchResult={onClickSearchResult}
                    setResultsClicked={setResultsClicked}
                    resultsClicked={resultsClicked}
                  />
                </div>
              </div>
              <div className="text-3xl">{companyName["CompanyName"]} </div>
              <div className="flex flex-row">
                <div className="text-lg"> Symbol : </div>
                <div className="text-lg"> {symbol} </div>
              </div>
              <div className="grid grid-cols-2">
                <div className="col-span-1 row-span-1">
                  <PriceSummary />
                </div>
                <div className="col-span-1 row-span-2 mt-10 pl-5 m-10">
                  <PriceChart />
                </div>
                <div className="col-span-1 row-span-1">
                  <CompanyEssentials />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LineChart;
