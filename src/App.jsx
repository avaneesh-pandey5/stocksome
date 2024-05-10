import React, {useState, useEffect} from 'react'
import Navbar from './Components/Navbar'
import SearchBar from './Components/SearchBar'
import BackgroundAnimation from './Components/BackgroundAnimation'
import SearchResults from './Components/SearchResults'
import GLOBE from 'vanta/src/vanta.globe'
import './App.css'

const App = () => {
  useEffect(() => {
    GLOBE({
      el: '#vanta',
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      color: 0xba0a0a,
      backgroundColor: 0x0
    })

  }, [])

  // const [triggerAnimation,setTriggerAnimation] = useState(false);
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [result, setResult] = useState([]);
  
  // const handleSearchInFocus = () => {
  //   setTriggerAnimation(true);
  // }
  // const handleSearchOnBlur = () => {
  //   setTriggerAnimation(false);
  // }
  return (
    <div className='app'>
      <div className="bg" id="vanta">
      <Navbar />
      <SearchBar setInput={setInput} input={input} setResults={setResults}/>
      <SearchResults results={results} setResult = {setResult} setResults = {setResults} setInput = {setInput} />
      </div>
    </div>
  )
  
}

export default App

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