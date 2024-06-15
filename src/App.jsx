import React, { useState, useEffect } from "react";
import Navbar from "./Components/Navbar";
import SearchBar from "./Components/SearchBar";
import BackgroundAnimation from "./Components/BackgroundAnimation";
import SearchResults from "./Components/SearchResults";
import GLOBE from "vanta/src/vanta.globe";
import "./App.css";

const App = () => {
  useEffect(() => {
    GLOBE({
      el: "#vanta",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      color: 0x7d8,
      color2: 0x0,
      backgroundColor: 0xfefefe,
    });
  }, []);

  // const [triggerAnimation,setTriggerAnimation] = useState(false);
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [result, setResult] = useState([]);
  const [resultsClicked, setResultsClicked] = useState(false);

  // const handleSearchInFocus = () => {
  //   setTriggerAnimation(true);
  // }
  // const handleSearchOnBlur = () => {
  //   setTriggerAnimation(false);
  // }

  const handleOnFocus = () => {
    setResultsClicked(true);
  };

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
    <div className="app">
      <div className="bg" id="vanta">
        <Navbar />
        <div className="content-container">
          <div className="search-container">
            <SearchBar
              onBlur={handleOnBlur}
              onFocus={handleOnFocus}
              setInput={setInput}
              input={input}
              setResults={setResults}
            />
            <div className="search-results-container">
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
        </div>
      </div>
    </div>
  );
};

export default App;

// flex justify-center items-center bg-black w-full h-screen p-20 pb-40
// {/* <BackgroundAnimation triggerAnimation={triggerAnimation}/> */}

// return (
//   <>

//     <Navbar />
//     <div className='bg' id='vanta'>
//       <SearchBar onFocus={handleSearchInFocus} onBlur={handleSearchOnBlur} setInput={setInput} input={input} setResults={setResults}/>
//       <SearchResults results={results} setResult = {setResult} setResults = {setResults} setInput = {setInput} />
//     </div>
//     <div>
//       {console.log(result)}
//     </div>

//   </>

// )

// return (
//   <div className='app'>
//     <div className="bg" id="vanta">
//     <Navbar />
//     <SearchBar setInput={setInput} input={input} setResults={setResults}/>
//     <SearchResults results={results} setResult = {setResult} setResults = {setResults} setInput = {setInput} />
//     </div>
//   </div>
// )
