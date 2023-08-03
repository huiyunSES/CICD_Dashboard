import * as React from 'react';
import styles from './issue.module.css';
import Typography from '@mui/material/Typography';
import Title from './title';
import { CommonChart } from '../../components/Chart/index'

export const AvgResolvingTime = (props) => {
    const { data } = props;
    const {Issue} = data;
    return (
        <div className={styles.avgTime}>
            <Typography component="p" variant="h3" style ={{fontSize: '50px'}}>
                {Issue && Issue.average_resolving_time} hrs
            </Typography>
            <span>
                Avg Resolving Time
            </span>
        </div>
    );
}

export const FastestTeam = (props) => {
    const { data } = props;
    const {Issue} = data;
    return (
        <div>
            <Title>Fastest Team Resolving Issues</Title>
            <div className={styles.team}>
                <Typography component="p" variant="h3">
                    {Issue && Issue.fastest_team}
                </Typography>
            </div>
        </div>
    );
}

export const OverdueIssues = (props) => {
    const { data } = props;
    const {Issue} = data;
    return (
        <div className={styles.avgTime}>
            <Typography component="p" variant="h3" style= {{fontSize:'60px'}}>
                {Issue && Issue.overdue_issue}
            </Typography>
            <span>Overdue Issues</span>
        </div>
    );
}

export const IssueChart = (props) => {
    const { data } = props;
    const {Issue_chart} = data;

    const [option, setOption] = React.useState({});

    const initChartData = () => {
        if(!Issue_chart) return;
        const xAxisData = Issue_chart.map(item=>item.product_team)
        const totalData = Issue_chart.map(item=>Number(item.total_issue))
        const closedData = Issue_chart.map(item=>Number(item.closed_issue))
        setOption({
            tooltip: {
              trigger: 'axis',
            },
            xAxis: {
                type: 'category',
                data: xAxisData
            },
            yAxis: {
                type: 'value'
            },
            legend:{
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
                    name: "Total"
                },
                {
                    label: {
                      show: true,
                      position: 'top'
                    },
                    data: closedData,
                    type: 'bar',
                    name: "Close"
                }
            ]
        })
    }

    React.useEffect(() => {
        initChartData()
    }, [data])


    return (
        <div>
            <Title>Total Issues v.s Closed Issues by Product Teams</Title>
            <div className={styles.productTeams}>
                <CommonChart option={option} />
            </div>
        </div>
    );
}