import React, { useState, useEffect, useRef } from 'react';
import * as echarts from 'echarts';

export const CommonChart = (props) => {
    const chartRef = useRef(null);
    const [chart, setChart] = useState(null);
    const handleResize = () => {
        chart && chart.resize();
    };
    useEffect(() => {
        const _chart = echarts.init(chartRef.current);
        _chart.setOption(props.option);
        setChart(_chart);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [props.option]);

    return (
        <div ref={chartRef} style={{ height: '100%', width: '100%' }}>
        </div>
    );
}
