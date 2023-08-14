import * as React from 'react';
import styles from './coverage.module.css';
import Title from './title';
import Typography from '@mui/material/Typography';
import { CommonChart } from '../../components/Chart/index'

export const Coverage = (props) => {
    const { data } = props;
    return (
        <div>
            <Title>Most 90% Coverage Team </Title>
            <div className={styles.coverage}>
                <Typography component="p" variant="h4">
                    {data && data.product_team}
                </Typography>
            </div>
        </div>
    );
}

export const CoverageChart = (props) => {
    const { data } = props;

    const [option, setOption] = React.useState({});

    const initChartData = () => {
        if (!data) return;
        const xAxisData = data.map(item => item.product_team);
        const seriesData1 = data.map(item => item['0-50%']);
        const seriesData2 = data.map(item => item['50-75%']);
        const seriesData3 = data.map(item => item['75-90%']);
        const seriesData4 = data.map(item => item['90-100%']);
    
        const isSingleProduct = xAxisData.length === 1;
    
        setOption({
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {},
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                name: 'Codebase count',
                nameLocation: 'middle',
                nameGap: 17.7,
                nameTextStyle: {
                    fontWeight: 'bold' 
                }
            },
            yAxis: {
                type: 'category',
                data: xAxisData,
                name: 'Product Team',
                nameLocation: 'middle',
                nameGap: 55,
                nameTextStyle: {
                    fontWeight: 'bold' 
                }
            },
            series: [
                {
                    name: '0-50%',
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show: true
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: seriesData1,
                    barWidth: isSingleProduct ? '20%' : 'auto'
                },
                {
                    name: '50-75%',
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show: true
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: seriesData2,
                    barWidth: isSingleProduct ? '20%' : 'auto'
                },
                {
                    name: '75-90%',
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show: true
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: seriesData3,
                    barWidth: isSingleProduct ? '20%' : 'auto'
                },
                {
                    name: '90-100%',
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show: true
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: seriesData4,
                    barWidth: isSingleProduct ? '20%' : 'auto'
                }
            ]
        });
    };
    

    React.useEffect(() => {
        initChartData()
    }, [data])


    return (
        <div>
            <Title>Coverage Rate Distribution</Title>
            <div className={styles.verticalBar}>
                <CommonChart option={option} />
            </div>
        </div>
    );
}
