import * as React from 'react';
import styles from './issue.module.css';
import Typography from '@mui/material/Typography';
import Title from './title';
import { CommonChart } from '../../components/Chart/index'

export const AvgResolvingTime = (props) => {
    const { data = {} } = props;
    const { average_resolving_time } = data;
    return (
        <div className={styles.avgTime}>
            <Typography component="p" variant="h3">
                {average_resolving_time} hrs
            </Typography>
            <span>
                Avg Resolving Time
            </span>
        </div>
    );
}

export const FastestTeam = (props) => {
    const { data = {} } = props;
    const { fastest_team } = data;
    return (
        <div>
            <span style ={{color: 'white', marginTop: '20px', display: 'block' }}>Fastest Team</span>
            <div className={styles.team}>
                <Typography component="p" variant="h3">
                    {fastest_team}
                </Typography>
            </div>
        </div>
    );
}

export const OverdueIssues = (props) => {
    const { data = {} } = props;
    const { overdue_issue } = data;
    return (
        <div className={styles.avgTime}>
            <Typography component="p" variant="h3">
                {overdue_issue}
            </Typography>
            <span>Overdue Issues</span>
        </div>
    );
}

export const IssueChart = (props) => {
    const { data } = props;

    const [option, setOption] = React.useState({});

    const initChartData = () => {
        if (!data) return;
        const xAxisData = data.map(item => item.product_team)
        const totalData = data.map(item => Number(item.total_issue))
        const closedData = data.map(item => Number(item.closed_issue))
    
        const isSingleProduct = xAxisData.length === 1; // Check if there's only one product
    
        setOption({
            tooltip: {
                trigger: 'axis',
            },
            xAxis: {
                type: 'category',
                data: xAxisData,
                name: 'Product Team',
                nameLocation: 'middle',
                nameGap: 30,
                nameTextStyle: {
                    fontWeight: 'bold' 
                }
            },
            yAxis: {
                type: 'value',
                name: 'Issue Count',
                nameLocation: 'middle',
                nameGap: 40,
                nameTextStyle: {
                    fontWeight: 'bold' 
                }
            },
            legend: {
                data: ['Total', 'Close']
            },
            series: [
                {
                    label: {
                        show: true,
                        position: 'top'
                    },
                    data: totalData,
                    type: 'bar',
                    name: "Total",
                    barWidth: isSingleProduct ? '10%' : 'auto' 
                },
                {
                    label: {
                        show: true,
                        position: 'top'
                    },
                    data: closedData,
                    type: 'bar',
                    name: "Close",
                    barWidth: isSingleProduct ? '10%' : 'auto' 
                }
            ]
        })
    }
    

    React.useEffect(() => {
        initChartData()
    }, [data])


    return (
        <div>
            <Title>Total Issues and Closed Issues by Product Teams</Title>
            <div className={styles.productTeams}>
                <CommonChart option={option} />
            </div>
        </div>
    );
}

export const IssueLineChart = (props) => {
    const { data } = props;

    const [option, setOption] = React.useState({});

    const initChartData = () => {
        if (!data) return;
        const xAxisData = data.map(item => item.month)
        const yAxisData = data.map(item => item.avg_resolving_time_hours)
        setOption({
            tooltip: {
                trigger: 'axis',
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
                name: 'Time by hrs',
                nameLocation: 'middle',
                nameGap: 50,
                nameTextStyle: {
                    fontWeight: 'bold' 
                }
            },
            series: [
                {
                    data: yAxisData,
                    type: 'line'
                }
            ]
        })
    }

    React.useEffect(() => {
        initChartData()
    }, [data])


    return (
        <div>
            <Title>Avg Resolving Time By Month</Title>
            <div className={styles.productTeams}>
                <CommonChart option={option} />
            </div>
        </div>
    );
}

