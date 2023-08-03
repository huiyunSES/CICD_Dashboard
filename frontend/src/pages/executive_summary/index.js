import React, { useEffect, useState } from "react";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Search from "../../components/Search/by_product";
import { Deployment, AVGDeployment, DeploymentRate, DeploymentFrequency, DeploymentBarChart } from "./deployment";
import { Repository, RepositoryIdleRepos, RepositoryStatus } from "./repository";
import { AvgResolvingTime, FastestTeam, OverdueIssues, IssueChart } from './issue';
import { Coverage, CoverageChart } from './coverage';
import { PullRequestLeadTime, MergeRequest, Ratio, PullRequestSize } from './pullRequest';
import {
    queryIssue, queryDeployment, queryRepository, queryPullRequest, queryConverage,
} from "../../services/api";

export default function Dashboard() {
    const [issueData, setIssueData] = useState([])
    const [deploymentData, setDeploymentData] = useState([])
    const [repositoryData, setRepositoryData] = useState([])
    const [pullRequestData, setPullRequestData] = useState([])
    const [converageData, setConverageData] = useState([])

    const [query, setQuery] = useState({
        product_team: '',
    })
    const handleQueryChange = (key, value) => {
        setQuery({
            ...query,
            [key]: value
        })
    }

    const init = () => {
        getDeploymentData()
        getIssueData()
        getRepositoryData()
        getPullRequestData()
        getConverageData()
    }

    const getIssueData = async () => {
        const res = await queryIssue(query)
        setIssueData(res)
    }

    const getDeploymentData = async () => {
        const res = await queryDeployment(query)
        
        setDeploymentData(res)
    }

    const getRepositoryData = async () => {
        const res = await queryRepository(query)
        setRepositoryData(res)
    }

    const getPullRequestData = async () => {
        const res = await queryPullRequest(query)
        setPullRequestData(res)
    }

    const getConverageData = async () => {
        const res = await queryConverage(query)
        setConverageData(res)
    }

    useEffect(() => {
        init()
    }, [query])

    return (
        <Container maxWidth="xl" sx={{ mt: 2, mb: 2 }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper
                        sx={{
                            p: 1,
                        }}
                    >
                        <Search query={query} onQueryChange={handleQueryChange} />
                    </Paper>
                </Grid>
                <Grid item md={2.4} >
                    <Paper
                        sx={{
                            p: 3,
                            height: 240,
                            backgroundColor: '#003f5c',
                            color: '#ffffff',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                           
                            
                        }}
                    >
                        <Deployment data={deploymentData && deploymentData.Deployment} />
                    </Paper>
                </Grid>
                <Grid item md={2.4} >
                    <Paper
                        sx={{
                            p: 3,
                            height: 240,
                            backgroundColor: "#58508d",
                            color: '#ffffff',
                           
                        }}
                    >
                        <AVGDeployment data={deploymentData && deploymentData.Deployment} />
                    </Paper>
                </Grid>
                <Grid item md={2.4} >
                    <Paper
                        sx={{
                            p: 3,
                            height: 240,
                            backgroundColor: "#810551",
                            
                        }}
                    >
                        <DeploymentRate data={deploymentData && deploymentData.Deployment} />
                    </Paper>
                    </Grid>
                    <Grid item md={2.4} >
                    <Paper
                        sx={{
                            p: 3,
                            height: 240,
                            backgroundColor: 'black',
                            color: '#ffffff',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Repository data={repositoryData && repositoryData.github_usage} />
                    </Paper>
               
                </Grid>
                <Grid item md={2.4} >
                    <Paper
                        sx={{
                            p: 3,
                            height: 240,
                            backgroundColor: '#557A46',
                            color: '#ffffff',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <RepositoryIdleRepos data={repositoryData && repositoryData.idle_repositories} />
                    </Paper>
                </Grid>
               
                <Grid item md={3} >
                    <Paper
                        sx={{
                            p: 2,
                            height:320,
                        
                            
                        }}
                    >
                        <DeploymentFrequency data={deploymentData && deploymentData.Deployment} />
                    </Paper>
                </Grid>
                <Grid item md={4.5} >
                    <Paper
                        sx={{
                            p: 6,
                            height:320,
                            
                        }}
                    >
                        <DeploymentBarChart data={deploymentData && deploymentData.DeploymentFrequency} />
                    </Paper>
                </Grid>
              

                <Grid item md={4.5} >
                    <Paper
                        sx={{
                            p: 2,
                            height: 320,
                        }}
                    >
                        <RepositoryStatus data={repositoryData} />
                    </Paper>
                </Grid>

                <Grid item md={3} >
                    <Paper
                        sx={{
                            p: 2,
                            height: 260,
                            backgroundColor: '#435B66',
                            color: '#ffffff',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <AvgResolvingTime data={issueData} />
                    </Paper>
                </Grid>
                <Grid item md={3} >
                    <Paper
                        sx={{
                            p: 2,
                            height: 260,
                            backgroundColor: 'red',
                            color: '#ffffff',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <OverdueIssues data={issueData} />
                    </Paper>
                </Grid>

                <Grid item md={3} >
                    <Paper
                        sx={{
                            p: 2,
                            height: 260,
                        }}
                    >
                        <FastestTeam data={issueData} />
                    </Paper>
                </Grid>
                <Grid item md={3} >
                    <Paper
                        sx={{
                            p: 2,
                            height: 260,
                        }}
                    >
                        <Coverage data={converageData && converageData.team_with_most_HighCoverage} />
                    </Paper>
                </Grid>
                <Grid item md={6} >
                    <Paper
                        sx={{
                            p: 2,
                            height:321,
                        }}
                    >
                        <IssueChart data={issueData} />
                    </Paper>
                </Grid>
                <Grid item md={6} >
                    <Paper
                        sx={{
                            p: 2,
                        }}
                    >
                        <CoverageChart data={converageData && converageData.coverage_rate_distribution} />
                    </Paper>
                </Grid>
                <Grid item md={3} >
                    <Paper
                        sx={{
                            p: 2,
                            height: 240,
                            backgroundColor: '#99A98F',
                        
                        }}
                    >
                        <PullRequestLeadTime data={pullRequestData && pullRequestData.avg_pull_request_lead_time_days} />
                    </Paper>
                </Grid>

                <Grid item md={3} >
                    <Paper
                        sx={{
                            p: 2,
                            height: 240,
                            backgroundColor: '#FCBAAD',
                            color: '#ffffff',
                       
                        }}
                    >
                        <PullRequestSize data={pullRequestData && pullRequestData.total_pull_request} />
                    </Paper>
                </Grid>

                <Grid item md={3} >
                    <Paper
                        sx={{
                            p: 2,
                            height: 240,
                        }}
                    >
                        <MergeRequest data={pullRequestData && pullRequestData.avg_merge_time_days} />
                    </Paper>
                </Grid>

                <Grid item md={3} >
                    <Paper
                        sx={{
                            p: 2,
                            height: 240,
                            backgroundColor: 'purple',
                            color: '#ffffff',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Ratio data={pullRequestData && pullRequestData.merge_closed_ratio}/>
                    </Paper>
                </Grid>



            </Grid>
           
        </Container >
     
    );
}
