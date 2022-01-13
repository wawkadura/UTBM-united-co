import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import Navbar from "./shared/navigation/navbar/Navbar";
import Footer from "./shared/navigation/footer/Footer";
import Home from "./features/home/Home";
import Subscription from "./features/subscription/Subscription"

import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import NotFound from "./shared/not-found/NotFound";

import './App.css';

function App() {

  return (
      <Router>
          <div className="app">
              <Navbar/>
              <div className="app-contents">
                  <Routes>
                      <Route exact path="/" element={<Home/>}/>
                      <Route exact path="/home" element={<Home/>}/>
                      <Route exact path="/sub" element={<Subscription/>}/>
                      <Route path="*" element={<NotFound/>}/>
                  </Routes>
              </div>
              <Footer/>
          </div>
      </Router>
  );
}

export default App;
