import React from 'react'
import Divider from '@mui/material/Divider';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import PersonIcon from '@mui/icons-material/Person';
import Grid from '@mui/material/Grid';
import styles from './index.module.css'
const redBg = `linear-gradient(135deg, #8B0000, #D70040)`
const greenBg = `linear-gradient(135deg, #0B6623, #228B22)`

const ProjectLeadCard = (props) => {
    const { item } = props
    const getStatus = (workflow_runs) => {
        if (!workflow_runs || workflow_runs.length === 0) return 0
        let success = 0
        let fail = 0
        workflow_runs.forEach(item => {
            if (item.run_conclusion === 'Success') {
                success++
            } else {
                fail++
            }
        })
        return success / (success + fail) 
    }

    const success_percentage = Math.floor(getStatus(item.workflow_runs))

    return (
        <div>
            <div className={styles.head}>
                <div><span style={{ color: '#AA336A', fontWeight: 'bold' }}>{item.product_team}</span>
                    <span style={{ marginLeft: '12px', color: '#0F52BA' }}>{item.repository_name}</span></div>
                <div className={styles.label}
                    style={{ color: success_percentage <= 0.9 ? redBg : greenBg }}>
                    {(success_percentage < 1) ? <ErrorIcon style={{ marginRight: '6px' }} /> : <CheckCircleIcon style={{ marginRight: '6px' }} />}
              
                </div>
            </div>

            <div className={styles.group}>
                <Grid container spacing={3}>
                    {item.workflow_runs && item.workflow_runs.map((workflow, index) => {
                        return <Grid item md={2.7} key={workflow.workflow_id}>
                            <div className={styles.card} key={index + 'card'} style={{ background: workflow.run_conclusion === 'Success' ? greenBg : redBg }}>
                                <div className={styles.title}>
                                    <span># {workflow.run_number}</span>
                                    <span className={styles.event}>{workflow.event}</span>
                                </div>
                                <div className={styles.name}><PlayCircleOutlineIcon style={{ fontSize: '14px' }} /><span>&nbsp;{workflow.run_name}</span></div>
                                <div className={styles.version}>Coverage: {workflow.converage_rate && Math.floor(workflow.converage_rate * 100)}%</div>
                                <div className={styles.status}>{workflow.run_conclusion === 'Success' ?
                                    <CheckCircleIcon style={{ fontSize: '14px' }} className={styles.successIcon} /> :
                                    <HighlightOffIcon className={styles.failIcon} style={{ fontSize: '14px' }} />} <span>{workflow.run_conclusion}</span></div>
                                <div className={styles.time}>
                                    <span className={styles.github_name}><PersonIcon style={{ fontSize: '13px' }} /><span>&nbsp;{workflow.github_username}</span></span>
                                    <span>{workflow.updated_at && workflow.updated_at.replace(/T/g, ' ')}</span>
                                </div>
                            </div>
                        </Grid>
                    })}
                </Grid>
            </div>

            <div className={styles.lastupdate}>
                {/* <div>updated_at({item.updated_at})</div> */}
            </div>
            <Divider />
        </div>
    )

}
export default ProjectLeadCard