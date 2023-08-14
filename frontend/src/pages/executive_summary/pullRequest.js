import * as React from 'react';
import styles from './pullRequest.module.css';
import Title from './title';
import Typography from '@mui/material/Typography';

export const PullRequestLeadTime = (props) => {
    const { data } = props;
    return (
        <div>
            <span style={{color: 'white', fontSize: '20px'}}>Pull Request Lead Time</span>
            <div className={styles.PullRequestLeadTime}>
                <Typography component="p" variant="h3" style ={{fontSize: '60px'}}>
                    {data} days
                </Typography>
            </div>
        </div>
    );
}
export const PullRequestSize = (props) => {
    const { data } = props;
    return (
        <div>
            <Title>Total Pull Request</Title>
            <div className={styles.PullRequestSize}>
                <Typography component="p" variant="h3" style={{fontSize: '60px'}}>
                    {data}
                </Typography>
            </div>
        </div>
    );
}

export const MergeRequest = (props) => {
    const { data } = props;
    return (
        <div>
            <Title>AVG Time to Merge Request</Title>
            <div className={styles.mergeRequest}>
                <Typography component="p" variant="h3" style={{fontSize: '60px'}}>
                    {data} days
                </Typography>
            </div>
        </div>
    );
}

export const Ratio = (props) => {
    const { data } = props;
    return (
        <div className={styles.ratio}>
            <Typography component="p" variant="h3">
                {data}%
            </Typography>
            <span>Ratio of merged to closed request</span>
        </div>
    );
}
