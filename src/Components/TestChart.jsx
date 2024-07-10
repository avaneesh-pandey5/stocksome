// TestChart.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
  Filler,
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
  TimeScale,
  Filler
);

const TestChart = () => {
  const { symbol } = useParams(); // This hooks extract the parameter from the URL
  const [lineData, setLineData] = useState(null);
  const [dataRange, setDataRange] = useState("1d");
  const [scaleUnit, setScaleUnit] = useState("hour");

  const options = {
    responsive: true,
    maintainAspectRatio: true, // Keep the aspect ratio
    // aspectRatio: 4, // Lower value for a smaller chart
    devicePixelRatio: 2,
    plugins: {
      legend: {
        display: false,
        position: "top",
      },
      tooltip: {
        mode: "index",
        intersect: false,
        axis: "x",
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: scaleUnit,
          // tooltipFormat: "MMM YYYY",
          // displayFormats: {
          //   month: "MMM YYYY",
          // },
        },
        ticks: {
          source: "labels",
          autoSkip: true,
          maxTicksLimit: 7, // Adjust based on your preference for label density
        },
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: false,
        ticks: {
          maxTicksLimit: 6, // Adjust based on your preference for label density
        },
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
  };

  useEffect(() => {
    let isMounted = true; // Flag to track mounted state
    let response_ok = false;

    const fetchData = async (tickerSymbol, dataRange) => {
      try {
        const response = await fetch(
          `http://localhost:5000/pe-chart-data/${tickerSymbol}/${dataRange}`
        );
        if (response.ok && isMounted) {
          response_ok = true;
          const data = await response.json();
          console.log(data);
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
      fetchData(`${symbol}.NS`, dataRange);
    }

    // Replace this with the ticker symbol you want to fetch
    // console.log(result)

    // Cleanup function to set the flag false when the component unmounts
    return () => {
      isMounted = false;
    };
  }, [dataRange]);

  if (lineData === null) {
    return <div>Loading chart data...</div>;
  }

  return (
    <div className="border-black border-2 h-[60vh] w-[40vw]">
      <div className="pb-5 text-2xl font-bold m-2 ">Price Chart</div>
      <div className="flex flex-row gap-x-10 ml-2 mb-5">
        <div
          className={`cursor-pointer ${dataRange === "1d" ? "underline" : ""}`}
          onClick={() => {
            setDataRange("1d");
            setScaleUnit("hour");
          }}
        >
          1D
        </div>
        <div
          className={`cursor-pointer ${dataRange === "5d" ? "underline" : ""}`}
          onClick={() => {
            setDataRange("5d");
            setScaleUnit("day");
          }}
        >
          5D
        </div>
        <div
          className={`cursor-pointer ${dataRange === "1mo" ? "underline" : ""}`}
          onClick={() => {
            setDataRange("1mo");
            setScaleUnit("day");
          }}
        >
          1M
        </div>
        <div
          className={`cursor-pointer ${dataRange === "6mo" ? "underline" : ""}`}
          onClick={() => {
            setDataRange("6mo");
            setScaleUnit("month");
          }}
        >
          6M
        </div>
        <div
          className={`cursor-pointer ${dataRange === "ytd" ? "underline" : ""}`}
          onClick={() => {
            setDataRange("ytd");
            setScaleUnit("month");
          }}
        >
          YTD
        </div>
        <div
          className={`cursor-pointer ${dataRange === "1y" ? "underline" : ""}`}
          onClick={() => {
            setDataRange("1y");
            setScaleUnit("month");
          }}
        >
          1Y
        </div>
        <div
          className={`cursor-pointer ${dataRange === "5y" ? "underline" : ""}`}
          onClick={() => {
            setDataRange("5y");
            setScaleUnit("year");
          }}
        >
          5Y
        </div>
        <div
          className={`cursor-pointer ${dataRange === "max" ? "underline" : ""}`}
          onClick={() => {
            setDataRange("max");
            setScaleUnit("year");
          }}
        >
          MAX
        </div>
      </div>
      <Line data={lineData} options={options} />
    </div>
  );
};

export default TestChart;
