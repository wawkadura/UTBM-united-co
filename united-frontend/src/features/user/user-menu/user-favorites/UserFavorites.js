import "./UserFavorites.css";

import {Card} from "primereact/card";
import {Divider} from "primereact/divider";
import {ScrollPanel} from 'primereact/scrollpanel';
import {Button} from "primereact/button";

import image from "../../../../shared/images/association.png";

const associations = [
    {name: "SPA", type: "Protection animale", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do"},
    {name: "SPA", type: "Protection animale", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do"},
    {name: "SPA", type: "Protection animale", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do"},
    {name: "SPA", type: "Protection animale", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do"},
    {name: "SPA", type: "Protection animale", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do"},
    {name: "SPA", type: "Protection animale", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do"},
    {name: "SPA", type: "Protection animale", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do"},
    {name: "SPA", type: "Protection animale", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do"},
    {name: "SPA", type: "Protection animale", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do"}
]

function UserFavorites() {
    function header(fileName) {
        return (
        <div className="association-header">
            <img src={image} alt="association_logo"/>
            <div>
                <Button icon="pi pi-info-circle" className="p-button-rounded p-button-text" />
                <Button icon="pi pi-heart-fill" className="p-button-rounded p-button-text" />
            </div>
        </div>
        )
    }

    function card(association) {
        return (
            <Card title={association.name} subTitle={association.type} header={header(association.name)} style={{ width: '26rem', height: 'auto', marginBottom: '1rem', marginRight: '1rem' }}>
                <p className="p-m-0" style={{lineHeight: '1.5'}}>{association.description}</p>
            </Card>
        )
    }

    function cards() {
        const cards = [];
        for (const association of associations) { cards.push(card(association)) }

        return cards;
    }

    return <div className="user-favorites">
        <Card title="Vos associations favorites" subTitle="Vous pouvez retrouvez sur cette page l'ensemble des associations que vous préférez" style={{ height: '100%' }}>
            <Divider/>

            <ScrollPanel style={{width: '100%', height: '41.381rem'}}>
                <div className="user-associations">
                    {cards()}
                </div>
            </ScrollPanel>
        </Card>
    </div>
}

export default UserFavorites
