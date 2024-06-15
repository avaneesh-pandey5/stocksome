import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "moment";
import "chartjs-adapter-moment";
import Navbar from "../Components/Navbar";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";

// Registering components required by Chart.js to render the chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

export const LineChart = () => {
  // console.log(result)
  const { symbol } = useParams(); // This hooks extract the parameter from the URL
  const [lineData, setLineData] = useState(null); // Start with null to represent 'no data'

  // Options for Chart.js (customize this according to your needs)
  const options = {
    responsive: true,
    maintainAspectRatio: true, // Keep the aspect ratio
    aspectRatio: 4, // Lower value for a smaller chart
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Stock Closing Prices",
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: "month",
          tooltipFormat: "MMM YYYY",
          displayFormats: {
            month: "MMM YYYY",
          },
        },
        ticks: {
          source: "labels",
          autoSkip: true,
          maxTicksLimit: 12, // Adjust based on your preference for label density
        },
      },
      y: {
        beginAtZero: false,
      },
    },
  };
  // const options = {};
  useEffect(() => {
    let isMounted = true; // Flag to track mounted state
    let response_ok = false;

    const fetchData = async (tickerSymbol) => {
      try {
        const response = await fetch(
          `http://localhost:5000/chart-data/${tickerSymbol}`
        );
        if (response.ok && isMounted) {
          response_ok = true;
          const data = await response.json();
          setLineData(data);
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

  // Conditional rendering based on whether data has been fetched
  if (lineData === null) {
    return <div>Loading chart data...</div>;
  }

  // Render the Line chart with fetched data

  return (
    <div className="app">
      <div className="bg" id="vanta">
        <Navbar />
        <Line options={options} data={lineData} />
      </div>
    </div>
  );
};

export default LineChart;

// const StockDetails = () => {
//   const { symbol } = useParams(); // This hooks extract the parameter from the URL
//   const [companyData, setCompanyData] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await fetch(`http://localhost:5000/chart-data/${symbol}.NS`);
//       const data = await response.json();
//       setCompanyData(data);
//     };
//     fetchData();
//   }, [symbol]);

//   return (
//     <div>
//       {companyData ? (
//         <div>
//           <h1>{companyData.name}</h1>
//           <p>{companyData.description}</p>
//           {console.log(companyData)}
//           {/* other data rendering */}
//         </div>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

// export default StockDetails;
