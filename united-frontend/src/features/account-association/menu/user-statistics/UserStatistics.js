// https://devexpress.github.io/devextreme-reactive/react/chart/docs/guides/animation/
import Paper from '@material-ui/core/Paper';
import {Chart,PieSeries,Title,ArgumentAxis,ValueAxis,BarSeries,Legend} from '@devexpress/dx-react-chart-material-ui';
import { useState } from "react";
import { ValueScale} from '@devexpress/dx-react-chart';
import 'primeflex/primeflex.css';
import { useForm } from "react-hook-form";

function UserSatistics({dataPieseries,dataBarseries}){

    const [date, setDate]=useState(new Date().getFullYear());
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        setDate(data.date);
    }
    const onError = (errors, e) => console.log(errors, e);
    
    const inputDate = (
        <form onSubmit={handleSubmit(onSubmit, onError)}>
            <label>
            <b>date :</b>
                <input type="text" {...register("date")} style={{ width: '100px', margin: '10px' }}/>
            </label>
                <input type="submit" value="Valider" />
        </form>
    )  
    return <div>
        
        <div className="p-grid">
            <div className="p-col">
                <Paper>
                    <Chart data={dataPieseries[date]}>
                        <PieSeries valueField="value" argumentField="argument" />
                        <Title text="Etude par année"/>
                        <Legend />
                    </Chart>
                </Paper>
            </div>

            <div className="p-col">
                <Paper>
                    <Chart data={dataBarseries[date]}>
                    <ValueScale name="value" />
                    <ArgumentAxis />
                    <ValueAxis scaleName="value" showGrid={false} showLine showTicks />
                    <BarSeries name={"nb adhérent en "+ date} valueField="value" argumentField="month" scaleName="value"/>
                    <Title text="Nombre d'adhérents par mois"/>
                    <Legend />
                    </Chart>
                </Paper>
            </div>
        </div>

        {inputDate}
    </div>
}

export default UserSatistics;


