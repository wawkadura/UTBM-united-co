import Landing from "./landing/Landing";
import Services from "./services/Services";
import Associations from "./associations/Associations";
import ContactForm from "./contact-form/ContactForm";
import About from "./about/About";

import './Home.css';

function Home() {
    return <div className="home">
        <Landing/>
        <Services/>
        <Associations/>
        <About/>
        <ContactForm/>
    </div>
}

export default Home
