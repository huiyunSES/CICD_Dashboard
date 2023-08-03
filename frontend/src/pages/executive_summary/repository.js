import * as React from 'react';
import styles from './repository.module.css';
import Typography from '@mui/material/Typography';
import Title from './title';
import GitHubIcon from '@mui/icons-material/GitHub';
import { CommonChart } from '../../components/Chart/index'

export const Repository = (props) => {
    const { data } = props;
    return (
        <div className={styles.repository}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <GitHubIcon sx={{ fontSize: 60, marginRight: 2 }} />
                <Typography component="p" variant="h3" >
                    {data}%
                </Typography>
            </div>
            <span style ={{fontSize: '20px'}}>Github Usage </span>
        </div>
    );
}

export const RepositoryIdleRepos = (props) => {
    const { data } = props;
    return (
        <div className={styles.idleRepos}>
            <Typography component="p" variant="h5" style={{fontSize:'30px'}}>
                Idle Repos
            </Typography>
            <Typography component="p" variant="h4">
                {data}
            </Typography>
        </div>
    );
}

export const RepositoryStatus = (props) => {
    const { data } = props;

    const [option, setOption] = React.useState({});
    const initChartData = () => {
        if (!data) return;
        const {active_repositories_percentage,inactive_repositories_percentage} = data;

        setOption({
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left'
            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: '50%',
                    data: [
                        { value: active_repositories_percentage, name: 'Active Repository' },
                        { value: inactive_repositories_percentage, name: 'Inactive Repository' },
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        })
    }
    React.useEffect(() => {
        initChartData()
    }, [data])

    return (
        <div>
            <Title>Repository Status</Title>
            <div className={styles.status}>
                <CommonChart option={option} />
            </div>
        </div>
    );
}