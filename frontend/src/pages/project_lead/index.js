import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Search from "./search";
import ProjectLeadCard from "../../components/ProjectLeadCard";
import { queryProjectLead } from "../../services/api";

const Lead = () => {
    const [projectLeadData, setProjectLeadData] = useState([])
    const [query, setQuery] = useState({
        product_team: '',
        run_conclusion: 'All',
        repository_name: '',
    })

    const handleQueryChange = (key, value) => {
        setQuery({
            ...query,
            [key]: value
        })
    }
    const getProjectLeadData = async () => {
        const res = await queryProjectLead(query)
        setProjectLeadData(res)
    }
    useEffect(() => {
        getProjectLeadData()
    }, [query])

    return (
        <Container maxWidth="xl" sx={{ mt: 2, mb: 2 }}>
            <Paper
                sx={{
                    p: 1,
                }}
            >
                <Search query={query} onQueryChange={handleQueryChange} />
            </Paper>
            <Paper
                sx={{
                    p: 1,
                    mt: 2,
                }}
            >
                <Grid container spacing={3}>
                    {projectLeadData && projectLeadData.map((item, index) => (
                        <Grid item md={12} key={index} >
                            <ProjectLeadCard item={item} />
                        </Grid>
                    ))}
                </Grid>
            </Paper>
        </Container>
    )
}

export default Lead