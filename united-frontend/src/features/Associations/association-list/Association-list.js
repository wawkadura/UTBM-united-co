import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../../../index.css';

import React, { useState, useEffect } from 'react';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Divider } from 'primereact/divider';
import { useNavigate } from "react-router-dom";
import { ProgressSpinner } from 'primereact/progressspinner';
import { Link } from "react-router-dom";

import { AssociationService } from '../AssociationService';
import './Association-list.css';

const AssociationList = ({ Filters }) => {
    const navigate = useNavigate();

    const { 
        typeFilter: {type, setType}, 
        favorites: {onlyFavorites, setOnlyFavorites}, 
        city: {searchcity, setSearchcity}, 
        dateRange: {dateRange, setDateRange}, 
        resetFilters: {resetFilters, setResetFilters}
    } = Filters;

    const [data, setData] = useState(null);
    const [filteredData,setFilteredData] = useState(null);
    const [filters,setFilters] = useState("");
    const [layout, setLayout] = useState('grid');
    const [displayModal, setDisplayModal] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [services, setServices] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingService, setIsLoadingService] = useState(false);
    
    const associationService = new AssociationService();
    const userId = sessionStorage.getItem('userId');

    // get association data on component load
    useEffect(() => {
       getAssociations();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // update filtered data on filter change
    useEffect(() => {
        if (resetFilters){
            setResetFilters(false);
            setFilters("");
            setOnlyFavorites(false);
            setType(null);
            setSearchcity("");
            setDateRange([1900,2022]);
        }
        
        let filterData = data;
        if (filters)
            filterData = filterData.filter((row) => row.name.toLowerCase().includes(filters.toLowerCase()))
        
        if (filterData && onlyFavorites)
            filterData = filterData.filter((row) => row.favorite)

        if (filterData && type)
            filterData = filterData.filter((row) => row.type.toLowerCase() === type.toLowerCase())
        
        if(filterData && searchcity)
            filterData = filterData.filter((row) => row.city.toLowerCase().includes(searchcity.toLowerCase()))

        if(filterData && dateRange && dateRange[0] && dateRange[1])
            filterData = filterData.filter((row) => row.created_at >= dateRange[0] && row.created_at <= dateRange[1] )

        setFilteredData(filterData);
    }, [ onlyFavorites, setOnlyFavorites, type, setType, searchcity, setSearchcity, dateRange, setDateRange, resetFilters, setResetFilters, data, filters ]);

    const getAssociations = () => {
        setIsLoading(true);
        associationService.getAssociations(userId).then(async data => {
            data = await Promise.all(data.map( async (association) => { 
                return { 
                    ...association, 
                    logo: await fetchLogo(association.logo),
                    created_at: getYearFromString(association.created_at)
                }
            }));
            setData(data); 
            setFilteredData(data);
            setIsLoading(false);
        });
    }

     //convert the binany data to string
    async function fetchLogo(logo){
        if(logo)
           return await btoa(String.fromCharCode(...new Uint8Array(logo.data)));
    }

    // Set association favorites
    const onHeartClick = (e, data) => {
        e.stopPropagation(); // do not take account of the parent's onClick
        associationService.setFavorites(userId, data.id, !data.favorite).then(getAssociations);
    }

    const getYearFromString = (value) => new Date(value).getFullYear();

    const onSearchChange = (event) => setFilters(event.target.value);

    // Open association details
    const onItemClick = (data) => {
        setDisplayModal(true);
        setModalData(data);
        setServices(null);
        setIsLoadingService(true);
        associationService.getServicesById(data.id).then((services) => {
            setServices(services);
            setIsLoadingService(false);
        });
    }

    // Listing associations
    const renderListItem = (data) => {
        return (
            <div className="p-col-12">
                <div className="product-list-item" onClick={() => onItemClick(data)}>
                    <img src={`data:image/png;base64,${data.logo}`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={data.name} />
                    <div className="product-list-detail">
                        <div className="product-name">{data.name}</div>
                        <div className="product-description">{data.description}</div>
                        <div className="product-date"><i className="pi pi-calendar product-icon"></i><span>{data.created_at}</span></div>
                        <div className="product-date"><i className="pi pi-building product-icon"></i><span>{data.city}</span></div>
                        <i className="pi pi-tag product-icon"></i><span className="product-type">{data.type}</span>
                    </div>
                    <div className="product-list-action">
                        { userId ? 
                            <div className="p-col-4" style={{textAlign: 'right'}} onClick={(e)=>onHeartClick(e, data)}>
                                {data.favorite ? <i className="pi pi-heart-fill product-heart"/> : <i className="pi pi-heart product-heart"/>}
                            </div>
                            : <></>
                        }
                    </div>
                </div>
            </div>
        );
    }

    // Listing associations on grid (default)
    const renderGridItem = (data) => {
        return (
            <div className="p-col-12 p-md-4">
                <div className="product-grid-item card" onClick={() => onItemClick(data)}>
                    <div className="product-grid-item-top">
                        <div className="p-grid p-nogutter">
                            <div className="p-col-10">
                                <i className="pi pi-tag product-icon"></i>
                                <span className="product-type">{data.type}</span>
                            </div>
                            { userId ?
                                <div className="p-col-2" style={{textAlign: 'right'}} onClick={(e)=>onHeartClick(e, data)}>
                                    {data.favorite ? <i className="pi pi-heart-fill product-heart"/> : <i className="pi pi-heart product-heart"/>}
                                </div>
                                : <></> 
                            }
                        </div>
                    </div>
                    <div className="product-grid-item-content">
                    <img src={`data:image/png;base64,${data.logo}`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={data.name} />
                        <div className="product-name">{data.name}</div>
                        <div className="product-description">{data.description}</div>
                        <div className="p-grid">
                            <div className="product-date p-col-6"><i className="pi pi-calendar product-icon"></i><span>{data.created_at}</span></div>
                            <div className="product-date p-col-6"><i className="pi pi-building product-icon"></i><span>{data.city}</span></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Define if it is grid or list layout
    const itemTemplate = (product, layout) => {
        if (!product) 
            return;
        if (layout === 'list')
            return renderListItem(product);
        else if (layout === 'grid')
            return renderGridItem(product);
    }

    // Header of list
    const renderHeader = () => {
        return (
            <div className="p-grid p-nogutter">
                <div className="p-grid p-col-6" style={{textAlign: 'left'}}>
                    <InputText value={filters} placeholder="Rechercher une association" onChange={onSearchChange}></InputText>
                    <div className="p-col-4 loading-header">
                        { isLoadingService ? <span>Chargement...</span> : <></> }
                    </div>
                </div>
                <div className="p-col-6" style={{textAlign: 'right'}}>
                    <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
                </div>
            </div>
        );
    }

    function handleClick(subPrice, serviceId, subType){
        sessionStorage.setItem('subPrice', subPrice);
        sessionStorage.setItem('serviceId', serviceId);
        sessionStorage.setItem('subType', subType);
        
        navigate('/sub');
    }

    // Association details
    const renderDialog = () => {
        return (
            <div className="dataview-modal-body">
                <img src={`data:image/png;base64,${modalData.logo}`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={data.name} />

                <div className="dataview-modal-items p-col-4">
                    <h2> 
                        <i className="pi pi-search modal-icon"></i>
                        Description
                    </h2>
                    <div className="dataview-modal-subsection">
                        <div className="dataview-modal-type">Type : {modalData.type}</div>
                        <div>{modalData.description}</div>
                        <div>Créée en {modalData.created_at}</div>
                    </div>
                    <h2>
                        <i className="pi pi-phone modal-icon"></i>
                        Contacts
                    </h2>
                    <div className="dataview-modal-subsection">
                        <div><b>Site web: </b>{modalData.website}</div>
                        <div><b>E-mail: </b>{modalData.email}</div>
                        <div><b>Adresse: </b>{modalData.address}</div>
                        <div><b>Téléphone: </b>{modalData.telephone}</div>
                    </div>
                </div>

                <div className="dataview-modal-separator p-col-1">
                    <Divider layout="vertical">
                        <b>-{'>'}</b>
                    </Divider>
                </div>

                <div className="dataview-modal-items p-col-4">
                    <h1>Abonnements</h1>
                    <Accordion className="dataview-modal-accordion">
                        {services.map((service) => { 
                            return  <AccordionTab key={service.id} header={
                                    <React.Fragment>
                                        <div className="p-grid">
                                        <span className="p-col-5" style={{marginLeft:'10px'}}>{service.price} € / mois</span>
                                        <span className="p-col-6">{service.title}</span></div>
                                    </React.Fragment>}>
                                        <div>{service.description}</div>
                                        <div className="dataview-modal-button">
                                            { userId ? 
                                                <Button label="Souscrire" onClick={() => (handleClick(service.price, service.id, "sub"))}/>
                                                :<Link style={{textDecoration:'none'}} to="/home/signIn"><Button label="Se connecter"/></Link>
                                            }
                                        </div>

                                    </AccordionTab>
                        })}
                        <AccordionTab header={
                        <React.Fragment>
                            <div className="p-grid">
                            <span className="p-col-5" style={{marginLeft:'10px'}}>? € / mois</span>
                            <span className="p-col-6">Personnalisé</span></div>
                        </React.Fragment>}>
                            <div>Destinés à ceux qui veulent choisir leur implication. <br></br><br></br> Vous bénéficierez des avantages correspondants à chaque palier</div>
                            <div className="dataview-modal-button">
                                { userId ? 
                                    <Button label="Souscrire" onClick={() => (handleClick(0, modalData.id, "don"))}/>
                                    :<Link style={{textDecoration:'none'}} to="/home/signIn"><Button label="Se connecter"/></Link>
                                }
                            </div>
                            
                        </AccordionTab>
                    </Accordion>
                    
                </div>
            </div>
        );
    }

    const header = renderHeader();

    return (
        <div className="dataview-demo">
            <div className="card">
                <DataView 
                    value={filteredData} 
                    layout={layout} 
                    header={header}
                    itemTemplate={itemTemplate} 
                    paginator rows={9}
                    emptyMessage={ isLoading ? <div style={{textAlign:'center', margin:'20px'}}><ProgressSpinner/></div> : "Pas de données"}/>
                { modalData && services ?
                <Dialog 
                    className="dataview-modal"
                    header={modalData.name} 
                    visible={displayModal} 
                    onHide={() => setDisplayModal(false)}>
                        {renderDialog()}   
                </Dialog>
                : <></>}
            </div>
        </div>
    );
}
              
export default AssociationList;
