import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './Components/About';
import StockDetails from './Pages/StockDetails.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path='/company/:symbol' element = {<StockDetails />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import App from './App';
// import About from './Components/About';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
  // <React.StrictMode>
  //   <BrowserRouter>
  //     <Routes>
  //       <Route path="*" element={<App />} />
  //       <Route path="/about" element={<About />} />
  //     </Routes>
  //   </BrowserRouter>
  // </React.StrictMode>
// );
