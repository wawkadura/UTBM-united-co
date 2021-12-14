import { Card } from 'primereact/card';
import "./NotFound.css";

function NotFound() {
    return <div className="not-found">
        <Card title="404 - Not found" style={{ width: '30rem', height: '8rem', marginTop: '2em'}}>
            <p className="p-m-0" style={{lineHeight: '1.5'}}>La page que vous essayez d'accéder n'existe pas</p>
        </Card>
    </div>
}

export default NotFound
