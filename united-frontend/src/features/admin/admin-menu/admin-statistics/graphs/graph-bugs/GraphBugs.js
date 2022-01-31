import "./GraphBugs.css";
import React from 'react';
import { Chart } from 'primereact/chart';
import { useState, useEffect, useCallback } from "react";
import { Dropdown } from 'primereact/dropdown';


function GraphBugs(bugs) {
    var data = bugs.data
    const [labels] = useState(['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'])
    const [bugsStats, setBugsStats] = useState([])
    const [selectedYear, setSelectedYear] = useState();
    const [years, setYears] = useState([])
    const lineStylesData = {
        labels: labels,
        datasets: [
            {
                label: 'bugs',
                data: bugsStats,
                fill: true,
                borderColor: 'rgba(355,100,81)',
                tension: .4,
                backgroundColor: 'rgba(355,100,81,0.2)'
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
        setBugsStats([])
        Object.keys(data.bugs).map((key) => key === year ? setBugsStats(data.bugs[key]) : '');
    }, [data]);

    useEffect(() => {
        var keys = Object.keys(data.bugs)
        setYears(keys)
        setSelectedYear(keys[0]);
        changeDataYear(keys[0])
    }, [data, changeDataYear]);
    
    return (
        <div className="graph-bugs-card">
            <h5>Statistiques des nouveaux bugs signalés par les utilisateurs de la platforme</h5>
            <br />
            <Dropdown value={selectedYear} options={years} onChange={onYearChange} />
            <Chart type="line" data={lineStylesData} options={basicOptions} />
        </div>
    )
}

export default GraphBugs
