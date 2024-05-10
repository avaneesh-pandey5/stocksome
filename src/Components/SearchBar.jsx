import React, { useState, useEffect } from 'react';
import { FaSearch } from "react-icons/fa";

const SearchBar = ({onFocus, onBlur,setInput,input,setResults}) => {

  const [debouncedInput, setDebouncedInput] = useState(input);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedInput(input);
        }, 300); // Adjust timing as needed
        return () => clearTimeout(handler);
    }, [input]);

    useEffect(() => {
        if (debouncedInput) {
            const fetchData = async () => {
                try {
                    const response = await fetch(`http://localhost:5000/search-result/${debouncedInput}`);
                    const data = await response.json();
                    setResults(data);
                }
                catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
            fetchData();
        }
    }, [debouncedInput]);

  return (
    <div className="flex justify-center items-center w-full mr-[700px] mt-[70px] h-1 pt-64"> {/* Adjust margin-top as needed */}
      <form className="flex border-2 border-gray-300 rounded-lg overflow-hidden z-[10]">
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 w-80 md:w-[600px] text-black" // Adjust width as needed
          value={input}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="flex items-center justify-center px-4 border-l">
          <FaSearch id="search-icon" className='text-indigo-600' />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
