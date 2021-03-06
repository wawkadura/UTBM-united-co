import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import { ScrollTop } from 'primereact/scrolltop';
import Navbar from "./shared/navigation/navbar/Navbar";
import Footer from "./shared/navigation/footer/Footer";
import Home from "./features/home/Home";
import Admin from "./features/admin/Admin";
import AccountAssociation from "./features/account-association/AccountAssociation";
import Subscription from "./features/subscription/Subscription"
import User from "./features/user/User";
import SignUp from "./features/sign-up/SignUp";
import Associations from './features/Associations/Associations';
import SignIn from './features/signIn/SignIn';
import ForgotPass from './features/signIn/ForgotPass';
import Ticket from './shared/Ticket/Ticket';
import Faq from './features/faq/Faq';

import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import NotFound from "./shared/not-found/NotFound";
import './App.css';
import Service from './features/service/service';

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
                        <Route exact path="/admin" element={<Admin />} />
                        <Route exact path="/sub" element={<Subscription/>}/>
                        <Route exact path="/user" element={<User/>}/>
                        <Route exact path="/home/signIn" element={<SignIn/>}/>
                        <Route exact path="/home/signIn/forgotPass" element={<ForgotPass/>}/>
                        <Route exact path="/ticket" element={<Ticket adminView={false}/>}/>
                        <Route exact path="/associations" element={<Associations />} />
                        <Route path="/accountassociation" element={<AccountAssociation/>}/>
                        <Route exact path="/FAQ" element={<Faq />} />
                        <Route exact path="/service" element={<Service />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
                <ScrollTop behavior="smooth" />
                <Footer />
            </div>
        </Router>
    );
}

export default App;
