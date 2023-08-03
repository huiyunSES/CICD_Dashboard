import React from 'react'
import Tooltip from '../Tooltip/index';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PersonIcon from '@mui/icons-material/Person';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import { BiGitBranch } from 'react-icons/bi';
import styles from './index.module.css'
import github from '../../assets/images/github1.png'
const redBg = `linear-gradient(135deg, #8B0000, #D70040)`
const greenBg = `linear-gradient(135deg, #0B6623, #228B22)`
const orangeBg = `linear-gradient(135deg, #ad4e00, #F28C28)`
const blueBg = `linear-gradient(135deg, #00008B, #0000FF)`
const DeveloperCard = (props) => {
    const { item } = props

    const getBackgroundColor = (rate) => {
        rate = Number(rate)
        if (rate < 0.5) {
            return redBg
        } else if (rate < 0.75) {
            return orangeBg
        } else if (rate < 0.9) {
            return blueBg
        } else {
            return greenBg
        }
    }

    return (
        <div className={styles.card} style={{ background: getBackgroundColor(item.converage_rate) }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div className={styles.header}>#{item.run_number}</div>
                    <div className={styles.title} style={{ fontSize: '14px', fontWeight: 'bold' }}>{item.repository_name}</div>
                </div>
                <img src={github} className={styles.githubIcon} />
            </div>
            <div className={styles.manageBlock}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <PlayCircleOutlineIcon style={{ fontSize: '14px' }} />
                        <span>&nbsp;{item.run_name}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <BiGitBranch style={{ fontSize: '14px' }} />
                        <span>&nbsp;{item.main_branch}</span>
                    </div>
                </div>
                <div className={styles.dispatch}>{item.event}</div>
            </div>
            <div className={styles.progress} >
                <DeviceHubIcon style={{ fontSize: "16px" }} />
                {item.workflow_steps && item.workflow_steps.length > 0 && item.workflow_steps.map((step, index) => {
                    return <Tooltip title={step.step_name} key={step.step_name} >
                        {step.conclusion === "Success" ?
                            <CheckCircleIcon className={styles.icon} style={{ fontSize: "16px" }} />
                            : <HighlightOffIcon className={styles.icon} style={{ color: '#faad14', fontSize: "16px" }} />}
                    </Tooltip>
                })}
            </div>
            <div className={styles.foot}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <PersonIcon style={{ fontSize: '20px' }} />
                    <span style={{ marginLeft: '4px', fontSize: '12px', color: '#FAFAFA' }}>{item.github_username}</span>
                </div>

                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '16px', color: 'white', fontWeight: 'bold' }}>{item.step_conclusion}</div>
         
                    <div className='coverage' style ={{fontWeight:'bold'}}>Coverage: {item.converage_rate && Math.floor(item.converage_rate * 100)} %</div>
                </div>
            </div>
            <div className={styles.lastupdate}>
                <div style={{ fontSize: '10px', color: '#FAFAFA', fontStyle: 'italic' }}>Last Update: {item.updated_at && item.updated_at.replace(/T/g, ' ')}</div>
            </div>
        </div>
    )

}
export default DeveloperCard