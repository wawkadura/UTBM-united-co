// https://devexpress.github.io/devextreme-reactive/react/chart/docs/guides/animation/
import Paper from '@material-ui/core/Paper';
import {Chart,PieSeries,Title,ArgumentAxis,ValueAxis,BarSeries,Legend} from '@devexpress/dx-react-chart-material-ui';
import { useState } from "react";
import { ValueScale} from '@devexpress/dx-react-chart';
import 'primeflex/primeflex.css';
import { useForm } from "react-hook-form";
import {InputText} from "primereact/inputtext";
import { Button } from 'primereact/button';


function UserSatistics(){

    // Sample data for graphics
    const dataPieseries = {
        2022:[
            { argument:'Regular', value:10 },
            { argument:'Premium', value:20 },
            { argument:'Premiun+', value:10},
        ],
        2021:[
            { argument:'Regular', value:7 },
            { argument:'Premium', value:2 },
            { argument:'Premiun+', value:5},
        ],
        2020:[
            { argument:'Regular', value:0 },
            { argument:'Premium', value:0 },
            { argument:'Premiun+', value:0},
        ],
    };

    const dataBarseries = {
        2022: [
            { month: 'Jan', value: 50 },
            { month: 'Feb', value: 100 },
            { month: 'Mar', value: 30, },
            { month: 'Apr', value: 107},
            { month: 'May', value: 95 },
            { month: 'Jun', value: 15 },
            { month: 'Jul', value: 20},
            { month: 'Aug', value: 110},
            { month: 'Sep', value: 54, },
            { month: 'Oct', value: 129 },
            { month: 'Nov', value: 48 },
            { month: 'Dec', value: 43 },
        ],
        2021: [
            { month: 'Jan', value: 100 },
            { month: 'Feb', value: 200 },
            { month: 'Mar', value: 50 },
            { month: 'Apr', value: 127 },
            { month: 'May', value: 105 },
            { month: 'Jun', value: 180 },
            { month: 'Jul', value: 150 },
            { month: 'Aug', value: 120 },
            { month: 'Sep', value: 59 },
            { month: 'Oct', value: 139 },
            { month: 'Nov', value: 66 },
            { month: 'Dec', value: 55 },
        ],
        "none": [
            { month: 'Jan', value: 0},
            { month: 'Feb', value: 0 },
            { month: 'Mar', value: 0 },
            { month: 'Apr', value: 0 },
            { month: 'May', value: 0 },
            { month: 'Jun', value: 0 },
            { month: 'Jul', value: 0 },
            { month: 'Aug', value: 0 },
            { month: 'Sep', value: 0 },
            { month: 'Oct', value: 0 },
            { month: 'Nov', value: 0 },
            { month: 'Dec', value: 0 },
        ],
        
    };

    const [date, setDate]=useState(new Date().getFullYear());
    const { register, handleSubmit,reset, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        setDate(data.date);
        // reset();
    }
    const ErrorMessage = ({message})=>(<h5 className='errors-text-color'>{message}</h5>) ;
    const onError = (errors, e) => console.log(errors, e);
    
    const inputDate = (
        <form onSubmit={handleSubmit(onSubmit, onError)}>
            <label>
            <b>Date :</b>
                <InputText type="number" {...register("date",{required:"Saisir une année", maxLength:{value:4, message:"Saisir une année correct"},minLength:{value:4,message:"Saisir une année correct"}})} style={{ width: '100px', margin: '10px' }}/>
                {errors?.date && <ErrorMessage message={errors.date.message}/>}  
                <input type="submit" value="Valider" />
            </label>
                
        </form>
    ); 

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


