import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PriceSummary = () => {
  const { symbol } = useParams();
  const [priceSummary, setPriceSummary] = useState(null);
  useEffect(() => {
    let isMounted = true; // Flag to track mounted state
    let response_ok = false;

    const fetchData = async (tickerSymbol) => {
      try {
        const response = await fetch(
          `http://localhost:5000/price-summary/${tickerSymbol}`
        );
        if (response.ok && isMounted) {
          response_ok = true;
          const data = await response.json();
          setPriceSummary(data);
          console.log(data);
        } else {
          throw new Error("Network response was not ok.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (!response_ok) {
      console.log(symbol);
      fetchData(`${symbol}.NS`);
    }

    // Replace this with the ticker symbol you want to fetch
    // console.log(result)

    // Cleanup function to set the flag false when the component unmounts
    return () => {
      isMounted = false;
    };
  }, []);
  if (!priceSummary) {
    return;
  }
  return (
    <div className="text-black border-2 border-black mt-10 justify-self-end">
      <div className="text-2xl font-bold m-2">Price Summary</div>
      <div className="flex flex-row justify-between">
        <div className="m-2 mr-10">
          <div>Today's High</div>
          <div>{priceSummary["Today High"]}</div>
        </div>
        <div className="m-2 mr-10">
          <div>Today's Low</div>
          <div>{priceSummary["Today Low"]}</div>
        </div>
        <div className="m-2 mr-10">
          <div>52W High</div>
          <div>{priceSummary["52W High"]}</div>
        </div>
        <div className="m-2 mr-10">
          <div>52W Low</div>
          <div>{priceSummary["52W Low"]}</div>
        </div>
      </div>
    </div>
  );
};

export default PriceSummary;
