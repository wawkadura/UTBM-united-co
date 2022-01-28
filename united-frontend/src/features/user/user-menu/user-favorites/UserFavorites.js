import "./UserFavorites.css";

import {Card} from "primereact/card";
import {Divider} from "primereact/divider";
import {ScrollPanel} from 'primereact/scrollpanel';
import {Button} from "primereact/button";

import image from "../../../../images/shared/association.png";
import {Dialog} from "primereact/dialog";
import {InputText} from "primereact/inputtext";
import {useEffect, useState} from "react";
import {Panel} from "primereact/panel";
import {UserService} from "../../UserService";

const _associations = [
    {id: 1, name: "SPA", type: "Protection animale", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do", isFavorite: true},
    {id: 2,name: "SPA", type: "Protection animale", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do", isFavorite: true},
    {id: 3,name: "SPA", type: "Protection animale", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do", isFavorite: true},
    {id: 4,name: "SPA", type: "Protection animale", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do", isFavorite: true},
    {id: 5,name: "SPA", type: "Protection animale", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do", isFavorite: true},
    {id: 6,name: "Médecin", type: "Santé", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do", isFavorite: true}
]

function UserFavorites({userId}) {
    const userService = new UserService();
    const [associations, setAssociations] = useState(_associations);

    const [displayBasic, setDisplayBasic] = useState(false);
    const dialogFuncMap = {'displayBasic': setDisplayBasic};

    const onClick = (name) => { dialogFuncMap[`${name}`](true); }
    const onHide = (name) => { dialogFuncMap[`${name}`](false); }

    useEffect(() => {
        userService.getFavoriteAssociations(userId).then(data => console.log(data));
    });

    function header(id, name, isFavorite) {
        return (
        <div className="association-header">
            <img src={image} alt="association_logo"/>
            <div>
                <Button icon="pi pi-info-circle" className="p-button-rounded p-button-text" onClick={() => onClick('displayBasic')} />
                <Button icon={isFavorite ? "pi pi-heart-fill" : "pi pi-heart"} className="p-button-rounded p-button-text"  onClick={() => removeAssociation(id)}/>
            </div>
        </div>
        )
    }

    function card(id, association) {
        return (
            <Card id={id} title={association.name} subTitle={association.type} header={header(association.id, association.name, association.isFavorite)} style={{ width: '100%', height: 'auto'}}>
                <p className="p-m-0" style={{lineHeight: '1.5'}}>{association.description}</p>
            </Card>
        )
    }

    function cards() {
        const cards = [];
        let id = 0;
        for (const association of associations) {cards.push(card(id++, association));}

        return cards;
    }

    function removeAssociation(id) {
        setAssociations(associations.filter(association => association.id !== id));
    }

    return <div className="user-favorites">
        <Card title="Vos associations favorites" subTitle="Vous pouvez retrouvez sur cette page l'ensemble des associations que vous préférez" style={{ height: '100%' }}>
            <Divider/>

            <ScrollPanel style={{width: '100%', height: '41.381rem'}}>
                <div className="user-associations">
                    {cards()}
                </div>
            </ScrollPanel>

            <Dialog className="dialog" header="Détails de l'association" modal={true} position="center" draggable={false} visible={displayBasic} style={{ width: '40vw' }} onHide={() => onHide('displayBasic')}>
                <Divider/>
                <Panel header="Informations">
                    <p><span className="user-info">Nom </span>: SPA</p>
                    <Divider />

                    <p><span className="user-info">Type </span> : Protection animale</p>
                    <Divider />

                    <p><span className="user-info">Email </span>: spa@gmail.com</p>
                    <Divider />

                    <p><span className="user-info">Téléphone : </span>+336255454</p>
                </Panel>
            </Dialog>
        </Card>
    </div>
}

export default UserFavorites
