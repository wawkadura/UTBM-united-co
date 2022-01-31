import "./GraphUsers.css";
import React from 'react';
import { Chart } from 'primereact/chart';
import { useState, useEffect, useCallback } from "react";
import { Dropdown } from 'primereact/dropdown';

function GraphUsers(users) {
    var data = users.data
    const [selectedYear, setSelectedYear] = useState(2020);
    const [labels] = useState(['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'])
    const [associationsStats, setAssociationsStats] = useState([])
    const [donorsStats, setDonorsStats] = useState([])
    const [years, setYears] = useState([])

    const lineStylesData = {
        labels: labels,
        datasets: [
            {
                label: 'Associations',
                data: associationsStats,
                fill: false,
                tension: .4,
                borderColor: 'rgba(7, 30, 237)'
            },
            {
                label: 'Donateurs',
                data: donorsStats,
                fill: true,
                borderColor: 'rgba(154, 164, 255)',
                tension: .4,
                backgroundColor: 'rgba(154, 164, 255,0.2)'
            }
        ]
    };

    let basicOptions = {
        maintainAspectRatio: false,
        aspectRatio: .6,
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            },
            y: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            }
        }
    };

    const onYearChange = (e) => {
        setSelectedYear(e.value);
        changeDataYear(e.value)
    }
    
    const changeDataYear = useCallback((year) => {
        setAssociationsStats([])
        setDonorsStats([])
        Object.keys(data.associations).map((key) => key === year ? setAssociationsStats(data.associations[key]) : '');
        Object.keys(data.donors).map((key) => key === year ? setDonorsStats(data.donors[key]) : '');
    },[data]);

    useEffect(() => {
        var keys = Object.keys(data.associations)
        setYears(keys)
        setSelectedYear(keys[0]);
        changeDataYear(keys[0])
    }, [data, changeDataYear]);

    return (
        <div className="graph-users-card">
            <h5>Statistiques des nouvelles utilisateurs de la platforme au cours de l'année</h5>
            <br />
            <Dropdown value={selectedYear} options={years} onChange={onYearChange} />
            <Chart type="line" data={lineStylesData} options={basicOptions} />
        </div>
    )
}

export default GraphUsers
