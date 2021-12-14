import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import './App.css';

import Navbar from "./shared/navigation/navbar/Navbar";
import Footer from "./shared/navigation/footer/Footer";
import Home from "./features/home/Home";

function App() {

  return (
    <div className="App">
        <Navbar/>
        <Home/>
        <Footer/>
    </div>
  );
}

export default App;
