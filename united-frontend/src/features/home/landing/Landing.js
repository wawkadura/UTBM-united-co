import {Button} from "primereact/button";

import './Landing.css';

function Landing() {
    return <div className="landing">
        <div className="contents">
            <h2><span>United.co</span> mets en relation des donateurs et des associations</h2>
            <Button icon="pi pi-arrow-down" className="p-button-rounded p-button-primary" />
        </div>
    </div>
}

export default Landing
