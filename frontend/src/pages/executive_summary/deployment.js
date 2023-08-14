import * as React from 'react';
import styles from './deployment.module.css';
import Typography from '@mui/material/Typography';
import Title from './title';
import { CommonChart } from '../../components/Chart/index'

export const Deployment = (props) => {
    const { data ={} } = props;
    const { total_deployment } = data;
    return (
        <div>
            <div className={styles.deployment}>
                <Typography component="p" variant="h3">
                    {total_deployment}
                </Typography>
                <span>
                    Total deployment
                </span>
            </div>
        </div>
    );
}

export const AVGDeployment = (props) => {
    const { data ={} } = props;
    const { avg_deployment_time } = data;
    return (
        <div>
            <span style ={{fontSize: '17px', color:'white'}}>AVG Deployment Time from  Non Prod to Prod</span>
            <div className={styles.avgDeployment}>
                <Typography component="p" variant="h3" style={{marginTop:'-20px', fontSize: '50px'}} >
                    {avg_deployment_time} hrs
                </Typography>
            </div>
        </div>
    );
}
export const DeploymentBarChart = (props) => {
    const { data } = props;

    const [option, setOption] = React.useState({});

    const initChartData = () => {
        if (!data) return 
        const xAxisData = [];
        const yAxisData = [];
        data.forEach(item => {
            const date = item.deployment_month;
            if (xAxisData.includes(date)) {
                const index = xAxisData.indexOf(date);
                yAxisData[index] = yAxisData[index] + Number(item.deployment_frequency);
            } else {
                xAxisData.push(date);
                yAxisData.push(Number(item.deployment_frequency));
            }
        });

        setOption({
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    // Use axis to trigger tooltip
                    type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
                }
            },
            xAxis: {
                type: 'category',
                data: xAxisData,
                name: 'Month',
                nameLocation: 'middle',
                nameGap: 30,
                nameTextStyle: {
                    fontWeight: 'bold' 
                }
            },
            yAxis: {
                type: 'value',
                name: 'Deployment Count',
                nameLocation: 'middle',
                nameGap: 40,
                nameTextStyle: {
                    fontWeight: 'bold' 
                }
            },
            series: [
                {
                    data: yAxisData,
                    type: 'bar'
                }
            ]
        })
    }

    React.useEffect(() => {
        initChartData()
    }, [data])


    return (
        <div>
            <Title >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Deployment Frequency</span>
                
                </div>
            </Title>
            <div className={styles.bar}>
                <CommonChart option={option} />
            </div>
        </div>
    );
}

export const DeploymentRate = (props) => {
    const { data ={} } = props;
const {success_rate_percentage} = data
    
    return (
        <div>
            {/* <Title className="title">Deployment Success Rate</Title> */}
            <span style={{color:'white', fontSize: '20px'}}>Deployment Success Rate</span>
            <div className={styles.deploymentRate}>
                <Typography component="p" variant="h3" style={{fontSize:'50px'}}>
                    {success_rate_percentage} %
                </Typography>
            </div>
        </div>
    );
}

export const DeploymentFrequency = (props) => {
    const { data ={} } = props;
    const getdata = ()=>{
        const {total_deployment} = data
        if(!total_deployment) return;
        const total = Number(total_deployment);
        if(total/7>1) {
            return 'Weekly'
        } else if(total/15>1) {
            return 'Biweekly'
        } else if(total/30>1) {
            return 'Monthly'
        } else {
            return 'daily'
        }
    }
    return (
        <div>
            <Title>Deployment Frequency</Title>
            <div className={styles.deploymentFrequency}>
                <Typography component="p" variant="h3" >
                    {getdata()}
                </Typography>
            </div>
        </div>
    );
}
