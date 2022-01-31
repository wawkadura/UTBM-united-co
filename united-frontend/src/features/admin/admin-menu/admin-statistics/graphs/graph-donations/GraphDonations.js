import "./GraphDonations.css";
import React from 'react';
import { Chart } from 'primereact/chart';
import { useState, useEffect, useCallback } from "react";
import { Dropdown } from 'primereact/dropdown';

function GraphDonations(donations) {
    var data = donations.data
    const [labels] = useState(['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'])
    const [donationsStats, setDonationsStats] = useState([])
    const [selectedYear, setSelectedYear] = useState();
    const [years, setYears] = useState([])
    const lineStylesData = {
        labels: labels,
        datasets: [
            {
                label: 'Dons',
                data: donationsStats,
                fill: true,
                borderColor: 'rgba(46, 204, 113)',
                tension: .4,
                backgroundColor: 'rgba(46, 204, 113,0.3)'
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
                legend: "ede",
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
        setDonationsStats([])
        Object.keys(data.donations).map((key) => key === year ? setDonationsStats(data.donations[key]) : '');
    },[data]);

    useEffect(() => {
        var keys = Object.keys(data.donations)
        setYears(keys)
        setSelectedYear(keys[0]);
        changeDataYear(keys[0])
    }, [changeDataYear, data]);
    return (
        <div className="graph-donations-card">
            <h5>Statistiques des dons générés grace à la platforme au cours de l'année</h5>
            <br />
            <Dropdown value={selectedYear} options={years} onChange={onYearChange} />
            <Chart type="line" data={lineStylesData} options={basicOptions} />
        </div>
    )
}

export default GraphDonations
