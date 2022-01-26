import "./Association-filters.css";
import { AssociationService } from "../AssociationService";
import { useState, useEffect } from "react";

import { Checkbox } from 'primereact/checkbox';
import { Divider } from 'primereact/divider';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from "primereact/inputtext";
import { Slider } from 'primereact/slider';
import { Button } from "primereact/button";

function AssociationFilters({ Filters }) {
    const associationService = new AssociationService();
    const userId = sessionStorage.getItem('userId');

    const { 
        favorites: {onlyFavorites, setOnlyFavorites}, 
        typeFilter: {type, setType}, 
        city: {searchcity, setSearchcity}, 
        dateRange: {dateRange, setDateRange}, 
        resetFilters: {setResetFilters} 
    } = Filters;
    const [types, setTypes] = useState(null);
    const [dateFilterMinMaxValues, setDateFilterMinMaxValues] = useState([1900,2022]);

    // get types values for filtering
    useEffect(() => {
        getFilterOptions();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const getFilterOptions = () => {
        associationService.getTypes().then(data => setTypes(data));
        associationService.getDateFilterMinMaxValues().then(data => {
            if(data) {
                setDateFilterMinMaxValues([parseInt(data.min), parseInt(data.max)]);
                setDateRange([data.min, data.max]);
            } 
        });
    }
    return <div className="association-filters">
        
        <h2 className="association-filters-title">Filtres</h2>

        { userId ? 
            <div>
                <Divider/>
                <div className="p-grid">
                    <span className="association-filters-item p-col-9">Vos favoris</span>
                    <Checkbox 
                        className="association-filters-checkbox p-col-3" 
                        onChange={e => setOnlyFavorites(e.checked)} 
                        checked={onlyFavorites}
                    />
                </div>
            </div>
            : <></>
        }
        

        <Divider/>
        <div className="association-filters-sub">
            <h4 className="association-filters-item">Type</h4>
            <Dropdown 
                className="association-filters-input" 
                value={type} 
                options={types} 
                onChange={(e) => setType(e.value)} 
                placeholder="Choisissez un type"
                showClear
            />

            <h4 className="association-filters-item">Ville</h4>
            <InputText
                className="association-filters-input" 
                placeholder="Rechercher une ville" 
                value={searchcity}
                onChange={(e)=>setSearchcity(e.target.value)}
            />

            <h4 className="association-filters-item">Date de création</h4>
            <Slider 
                className="association-filters-slider" 
                value={dateRange} 
                onChange={(e) => setDateRange(e.value)} 
                range 
                min={dateFilterMinMaxValues[0]} 
                max={dateFilterMinMaxValues[1]}
            />
            <h5 className="association-filters-date">{dateRange[0]}, {dateRange[1]}</h5>
            
            
           
        </div>

        <Divider/>
        <div className="association-filters-reset-button">
            <Button 
                label="Réinitialiser" 
                className="p-button-info"
                onClick={()=> setResetFilters(true)}
            />
        </div>
 

    </div>
}

export default AssociationFilters
