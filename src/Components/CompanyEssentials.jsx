import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CompanyEssentials = () => {
  const { symbol } = useParams();
  const [companyEssentials, setCompanyEssentials] = useState(null);
  useEffect(() => {
    let isMounted = true; // Flag to track mounted state
    let response_ok = false;

    const fetchData = async (tickerSymbol) => {
      try {
        const response = await fetch(
          `http://localhost:5000/company-essentials/${tickerSymbol}`
        );
        if (response.ok && isMounted) {
          response_ok = true;
          const data = await response.json();
          setCompanyEssentials(data);
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
  if (!companyEssentials) {
    return;
  }
  return (
    <div className="text-black border-2 border-black mt-10 justify-self-end ">
      <div className="text-2xl font-bold m-2">Company Essentials</div>
      <div className="grid justify-between grid-cols-4">
        <div className="m-2 mr-10">
          <div>Market Cap</div>
          <div>{companyEssentials["Market Cap (Cr.)"]} Cr.</div>
        </div>
        <div className="m-2 mr-10">
          <div>P/E</div>
          <div>{companyEssentials["P/E Ratio"]}</div>
        </div>
        <div className="m-2 mr-10">
          <div>P/B</div>
          <div>{companyEssentials["P/B Ratio"]}</div>
        </div>
        <div className="m-2 mr-10">
          <div>Sales Growth</div>
          <div>{companyEssentials["Sales Growth (%)"]}%</div>
        </div>
        <div className="m-2 mr-10">
          <div>Profit Growth</div>
          <div>{companyEssentials["Profit Growth (%)"]}%</div>
        </div>
        <div className="m-2 mr-10">
          <div>ROE</div>
          <div>{companyEssentials["ROE (%)"]}%</div>
        </div>
        <div className="m-2 mr-10">
          <div>ROCE</div>
          <div>{companyEssentials["ROCE (%)"]}%</div>
        </div>
        <div className="m-2 mr-10">
          <div>Debt</div>
          <div>{companyEssentials["Debt (Cr.)"]} Cr.</div>
        </div>
        <div className="m-2 mr-10">
          <div>EPS</div>
          <div>{companyEssentials["EPS (TTM)"]}</div>
        </div>
        <div className="m-2 mr-10">
          <div>Cash</div>
          <div>{companyEssentials["Cash (Cr.)"]} Cr.</div>
        </div>
        <div className="m-2 mr-10">
          <div>No. of Shares</div>
          <div>{companyEssentials["No. of Shares (Cr.)"]} Cr.</div>
        </div>
        <div className="m-2 mr-10">
          <div>Div. Yield</div>
          <div>{companyEssentials["Dividend Yield (%)"]}%</div>
        </div>
      </div>
    </div>
  );
};

export default CompanyEssentials;
