// https://devexpress.github.io/devextreme-reactive/react/chart/docs/guides/animation/
import { useState } from "react";
import 'primeflex/primeflex.css';
import {useEffect} from 'react';
import { AccountAssociationApi } from '../../api/accountAssociationApi';
import { Chart } from 'primereact/chart';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';

function UserSatistics(){
    
    const id=sessionStorage.getItem('userId') //id of the user connected 

    const lightOptions = {
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        }
    };
    const [Alldate, setAllDate]=useState(new Date().getUTCFullYear());
    const [date, setDate]=useState(new Date().getUTCFullYear());
    const [pie,setPie] = useState();
    const [bar,setBar] = useState();
    const labelPie = [];
    const datePie = [];
    const dataPie = [];
    const labelBar = [];
    const dateBar = [];
    const dataBar = [];

    useEffect(()=>{
        fetchDate();
        fetchPieseries(date);
        fetchBarseries(date);
    },[]);

    //this methode get date regarding subscription
    async function fetchDate(){
        const resp = await AccountAssociationApi.getDate(id);
        setAllDate(resp.date);
    };
    //this methode get data regarding Bieserie graph by month
    async function fetchPieseries(date){
        const resp = await AccountAssociationApi.getPieSeries(id,date);
        setPie(resp.allDate);
    };
    //this methode get data regarding Barserie graph
    async function fetchBarseries(date){ 
        const resp = await AccountAssociationApi.getBarSeries(id,date);
        setBar(resp.allMonth);
    };
 
    const handleSubmit = (event) => {
        setDate(event.value);
        if (date)
        {
            fetchPieseries(event.value.date);
            fetchBarseries(event.value.date);
        }
    };
        
    if(pie){
        for (let i=0; i<pie.length; i++){
            labelPie.push(pie[i].title);
            dataPie.push(pie[i].total);
            datePie.push(pie[i].date);
        }     
    };

    if(bar){
        for (let i=0; i<bar.length; i++){
            labelBar.push(bar[i].month);
            dataBar.push(bar[i].total);
            dateBar.push(bar[i].date);
        }     
    };
    const chartDataPie = {
        labels: labelPie,
        datasets: [
            {
                data: dataPie,
                backgroundColor: [
                    "#42A5F5",
                    "#66BB6A",
                    "#FFA726"
                ],
                hoverBackgroundColor: [
                    "#64B5F6",
                    "#81C784",
                    "#FFB74D"
                ]
            }
        ]
    };

    const chartDataBar = {
        labels: labelBar,
        datasets: [
            {   
                type:'bar',
                label:'Nombre d\'adhérant',
                data: dataBar,
                backgroundColor: ["#42A5F5"],
            },
        ]
    };
   
    return <div>
        <Card title='Statistiques génerales ' style={{ height: '200%', width:'100%'}}>
            <div className="p-grid">
                <div className="p-col">
                    <Card  subTitle={"Nombre d'adhérent par service "+ date} >
                        <div className="card flex justify-content-center">
                        <Chart type="pie" data={chartDataPie} options={lightOptions}  style={{ width: '50%' }} />
                        </div>
                    </Card>
                </div>

                <div className="p-col">
                    <Card subTitle={"Nombre d'adhérent en "+date} >
                        <div className="card flex justify-content-center">
                            <Chart type="bar" data={chartDataBar} options={lightOptions} style={{ width: '100%' , height:'100%' }} /> 
                        </div>
                    </Card>
                </div>
            </div>
            <label>
                <Dropdown optionLabel="date" value={date} options={Alldate} onChange={handleSubmit} placeholder="Selectionner une date"/>
            </label>
        </Card>
    </div>
}

export default UserSatistics;


