import React from "react";
import Navbar from "./Navbar";
import PriceSummary from "./PriceSummary";
import CompanyEssentials from "./CompanyEssentials";
import LineChart from "../Pages/StockDetails";
import PriceChart from "./TestChart";

const About = () => {
  return (
    <div className="">
      <Navbar />
      <div className="flex flex-row border-2 border-black h-screen overflow-y-scroll">
        <div>
          <div className="text-black pt-28 pl-20 mb-10">
            <div>
              <div className="text-3xl">Name of the company</div>
              <div className="flex flex-row">
                <div className="text-lg"> Symbol : </div>
                <div className="text-lg"> SYM </div>
              </div>
              <div className="grid grid-cols-2 gap-x-10">
                <div className="col-span-1 row-span-1">
                  <PriceSummary />
                </div>
                <div className="col-span-1 row-span-2"></div>
                <div className="col-span-1 row-span-1">
                  <CompanyEssentials />
                </div>
              </div>
              <div>Hello</div>
              <div>Hello</div>
              <div>Hello</div>
              <div>Hello</div>
              <div>Hello</div>
              <div>Hello</div>
              <div>Hello</div>
              <div>Hello</div>
              <div>Hello</div>
              <div>Hello</div>
              <div>Hello</div>
              <div>Hello</div>
              <div>Hello</div>
              <div>Hello</div>
              <div>Hello</div>
              <div>Hello</div>
            </div>
          </div>
          <PriceChart />
        </div>
      </div>
    </div>
  );
};

export default About;
