import React, { useState } from "react";
import Button from "./Button";

const Navbar = () => {
  const [navIsOpen, setNavIsOpen] = useState(false);
  let links = [
    { name: "Home", link: "/" },
    { name: "Market", link: "/about" },
    { name: "News", link: "/" },
    { name: "Portfolio", link: "/" },
  ];
  return (
    <div className="w-full fixed top-0 left-0">
      <div className="md:flex items-center justify-between bg-[0x23153c] py-4 md:px-10 px-7">
        <div className="font-bold text-3xl cursor-pointer flex items-centre font-[Outfit] text-black pt-2">
          <span className="pl-5 text-4xl text-indigo-600 mr-2">
            <ion-icon name="bar-chart"></ion-icon>
          </span>
          STOCKSOME
        </div>
        <div
          onClick={() => {
            setNavIsOpen(!navIsOpen);
          }}
          className="text-indigo-600 text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
        >
          <ion-icon
            name={navIsOpen ? "close-outline" : "menu-outline"}
          ></ion-icon>
        </div>
        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-[0x23153c] md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-200 ease-in ${
            navIsOpen ? "top-20" : "top-[-490px]"
          }`}
        >
          {links.map((Link) => (
            <li key={Link.name} className="md:ml-8 text-xl md:my-0 my-7">
              <a
                href={Link.link}
                className=" text-black hover:text-gray-600 cursor-pointer"
              >
                {Link.name}
              </a>
            </li>
          ))}
          <Button>Login</Button>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

// import React from "react";

// const Navbar = () => {
//   return (
//     <div>
//       <div className="font-bold text-3xl cursor-pointer flex items-centre font-[Outfit] text-black pt-2">
//         <span className="pl-5 text-4xl text-indigo-600 mr-2">
//           <ion-icon name="bar-chart"></ion-icon>
//         </span>
//         STOCKSOME
//       </div>
//     </div>
//   );
// };

// export default Navbar;
