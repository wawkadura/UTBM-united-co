import "./Associations.css";
import React, { useState } from 'react';
import AssociationFilters from "./association-filters/Association-filters";
import AssociationList from "./association-list/Association-list";

function Associations() {
    const [onlyFavorites, setOnlyFavorites] = useState(false);
    const [type, setType] = useState(null);
    const [searchcity, setSearchcity] = useState("");
    const [dateRange, setDateRange] = useState([1900,2022]);
    const [resetFilters, setResetFilters] = useState(false);

    const Filters = {
        favorites: {onlyFavorites, setOnlyFavorites},
        typeFilter: {type, setType},
        city: {searchcity, setSearchcity},
        dateRange: {dateRange, setDateRange},
        resetFilters: {resetFilters, setResetFilters},
    };

    return <div className="associations">
        <h2 className="AssoTitle">Liste des associations</h2>
        <AssociationFilters Filters={Filters}/>
        <AssociationList Filters={Filters}/>
    </div>
}

export default Associations