import React from 'react'
import "./SearchResults.css"

const SearchResults = ({ results, setResult, setResults,setInput}) => {
  
  return (
    <div className='results-list'>
      {
        results.map((result, id) => {
          return <div key={id} className='search-result' onClick={(e) => { setResult(result) 
            setResults([])
            
            setInput("")
          }}>
            {
              `${result.CompanyName} || ${result.Symbol}`
              
            }
          </div>
        })
      }

    </div>
  )
}

export default SearchResults