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

import { AssociationService } from '../AssociationService';
import './Association-list.css';

const AssociationList = ({ Filters }) => {
    const { 
        typeFilter: {type, setType}, 
        favorites: {onlyFavorites, setOnlyFavorites}, 
        country: {searchCountry, setSearchCountry}, 
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
    
    const associationService = new AssociationService();

    useEffect(() => {
        associationService.getAssociations().then(data => {
            setData(data); 
            setFilteredData(data);
        });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (resetFilters){
            setResetFilters(false);
            setFilters("");
            setOnlyFavorites(false);
            setType(null);
            setSearchCountry("");
            setDateRange([1900,2022]);
        }
        
        let filterData = data;
        if (filters)
            filterData = filterData.filter((row) => row.name.toLowerCase().includes(filters.toLowerCase()))
        
        if (filterData && onlyFavorites)
            filterData = filterData.filter((row) => row.favorite)

        if (filterData && type)
            filterData = filterData.filter((row) => row.type.toLowerCase() === type.toLowerCase())
        
        if(filterData && searchCountry)
            filterData = filterData.filter((row) => row.country.toLowerCase().includes(searchCountry.toLowerCase()))

        if(filterData && dateRange && dateRange[0] && dateRange[1])
            filterData = filterData.filter((row) => row.date >= dateRange[0] && row.date <= dateRange[1] )

        setFilteredData(filterData);
    }, [ onlyFavorites, setOnlyFavorites, type, setType, searchCountry, setSearchCountry, dateRange, setDateRange, resetFilters, setResetFilters, data, filters ]);
    
    const onSearchChange = (event) => setFilters(event.target.value);
    
    const onHeartClick = (data) => {
        console.log(data);
    }

    const onItemClick = (data) => {
        setDisplayModal(true);
        setModalData(data);
        associationService.getServicesById(data.id).then((services) => setServices(services));
    }

    const renderListItem = (data) => {
        return (
            <div className="p-col-12">
                <div className="product-list-item">
                    <img src={`images/product/${data.image}`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={data.name} />
                    <div className="product-list-detail">
                        <div className="product-name">{data.name}</div>
                        <div className="product-description">{data.description}</div>
                        <div className="product-date"><i className="pi pi-calendar product-icon"></i><span>{data.date}</span></div>
                        <i className="pi pi-tag product-icon"></i><span className="product-type">{data.type}</span>
                    </div>
                    <div className="product-list-action">
                    <div className="p-col-4" style={{textAlign: 'right'}} onClick={()=>onHeartClick(data)}>
                                {data.favorite ? <i className="pi pi-heart-fill product-heart"/> : <i className="pi pi-heart product-heart"/>}
                            </div>
                        {/* <span className="product-price">${data.price}</span> */}
                        {/* <Button icon="pi pi-shopping-cart" label="Add to Cart" disabled={data.inventoryStatus === 'OUTOFSTOCK'}></Button> */}
                        {/* <span className={`product-badge status-${data.inventoryStatus.toLowerCase()}`}>{data.inventoryStatus}</span> */}
                    </div>
                </div>
            </div>
        );
    }

    const renderGridItem = (data) => {
        return (
            <div className="p-col-12 p-md-4">
                <div className="product-grid-item card" onClick={() => onItemClick(data)}>
                    <div className="product-grid-item-top">
                        <div className="p-grid p-nogutter">
                            <div className="p-col-8">
                                <i className="pi pi-tag product-icon"></i>
                                <span className="product-type">{data.type}</span>
                            </div>
                            <div className="p-col-4" style={{textAlign: 'right'}} onClick={()=>onHeartClick(data)}>
                                {data.favorite ? <i className="pi pi-heart-fill product-heart"/> : <i className="pi pi-heart product-heart"/>}
                            </div>
                        </div>
                        {/* <span className={`product-badge status-${data.inventoryStatus.toLowerCase()}`}>{data.inventoryStatus}</span> */}
                    </div>
                    <div className="product-grid-item-content">
                    <img src={`images/product/${data.image}`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={data.name} />
                        <div className="product-name">{data.name}</div>
                        <div className="product-description">{data.description}</div>
                        <div className="p-grid">
                            <div className="product-date p-col-6"><i className="pi pi-calendar product-icon"></i><span>{data.date}</span></div>
                            <div className="product-date p-col-6"><i className="pi pi-building product-icon"></i><span>{data.country}</span></div>
                        </div>
                    </div>
                    <div className="product-grid-item-bottom">
                        {/* <span className="product-price">${data.price}</span> */}
                        {/* <Button icon="pi pi-shopping-cart" label="Add to Cart" disabled={data.inventoryStatus === 'OUTOFSTOCK'}></Button> */}
                    </div>
                </div>
            </div>
        );
    }

    const itemTemplate = (product, layout) => {
        if (!product) {
            return;
        }

        if (layout === 'list')
            return renderListItem(product);
        else if (layout === 'grid')
            return renderGridItem(product);
    }

    const renderHeader = () => {
        return (
            <div className="p-grid p-nogutter">
                <div className="p-col-6" style={{textAlign: 'left'}}>
                    <InputText value={filters} placeholder="Rechercher une association" onChange={onSearchChange}></InputText>
                    {/* <Dropdown options={sortOptions} value={sortKey} optionLabel="label" placeholder="Sort By Price" onChange={onSortChange}/> */}
                </div>
                <div className="p-col-6" style={{textAlign: 'right'}}>
                    <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
                </div>
            </div>
        );
    }

    const renderDialog = () => {
        return (
            <div className="dataview-modal-body">
                <img src={`images/product/${data.image}`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={data.name} />

                <div className="dataview-modal-items p-col-4">
                    <h2> 
                        <i className="pi pi-search modal-icon"></i>
                        Description
                    </h2>
                    <div className="dataview-modal-subsection">
                        <div className="dataview-modal-type">Type : {modalData.type}</div>
                        <div>{modalData.description}</div>
                        <div>Créée en {modalData.date}</div>
                    </div>
                    <h2>
                        <i className="pi pi-phone modal-icon"></i>
                        Contacts
                    </h2>
                    <div className="dataview-modal-subsection">
                        <div><b>Site web: </b>{modalData.web}</div>
                        <div><b>E-mail: </b>{modalData.mail}</div>
                        <div><b>Adresse: </b>{modalData.address}</div>
                        <div><b>Téléphone: </b>{modalData.phone}</div>
                    </div>
                </div>
                <div className="dataview-modal-separator p-col-1">
                    <Divider layout="vertical">
                        <b>-{'>'}</b>
                    </Divider>
                </div>

                <div className="dataview-modal-items p-col-4">
                    <h1> 
                        Abonnements
                    </h1>
                    <Accordion className="dataview-modal-accordion">
                        {services.map((service) => { 
                            return  <AccordionTab header={
                                    <React.Fragment>
                                        <div className="p-grid">
                                        <span className="p-col-5" style={{marginLeft:'10px'}}>{service.price} € / mois</span>
                                        <span className="p-col-6">{service.title}</span></div>
                                    </React.Fragment>}>
                                        <div>{service.description}</div>
                                        <div className="dataview-modal-button">
                                            <Button label="Souscrire" />
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
                                <Button label="Souscrire" />
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
                    emptyMessage="Pas de données"/>
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
