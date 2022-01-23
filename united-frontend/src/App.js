import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';


import Navbar from "./shared/navigation/navbar/Navbar";
import Footer from "./shared/navigation/footer/Footer";
import Home from "./features/home/Home";
import SignUp from "./features/sign-up/SignUp";
import Associations from './features/Associations/Associations';
import SignIn from './features/signIn/SignIn';
import ForgotPass from './features/signIn/ForgotPass';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFound from "./shared/not-found/NotFound";

import './App.css';

function App() {

    return (
        <Router>
            <div className="app">
                <Navbar />
                <div className="app-contents">
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route exact path="/home" element={<Home />} />
                        <Route exact path="/sign-up" element={<SignUp />} />
                        <Route exact path="/home/signIn" element={<SignIn/>}/>
                        <Route exact path="/home/signIn/forgotPass" element={<ForgotPass/>}/>
                        <Route exact path="/associations" element={<Associations />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
