import React from "react";
import Navbar from "./Navbar";

const About = () => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="flex flex-row border-2 border-black">
        <div>
          <div className="text-black flex justify-start flex-start pt-28 pl-20">
            <div>
              <div className="text-3xl flex-col"> Name of the company </div>
              <div className="flex flex-row">
                <div className="text-lg"> Symbol : </div>
                <div className="text-lg"> SYM </div>
              </div>
              <div className="text-black border-2 border-black mt-10 justify-self-end">
                <div className="text-2xl font-bold">Price Summary</div>
                <div className="flex flex-row justify-between">
                  <div>Hello</div>
                  <div>Hello</div>
                  <div>Hello</div>
                  <div>Hello</div>
                  <div>Hello</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
