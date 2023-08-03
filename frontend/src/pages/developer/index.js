import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Search from "./search";
import DeveloperCard from "../../components/DeveloperCard";
import { queryDeveloper } from "../../services/api";
const Developer = () => {
    const [developerData, setDeveloperData] = useState([])
    const [query, setQuery] = useState({
        product_team: '',
        converage_rate_range: 'All',
        last_time: 'All',
        github_username: '',
        repository_name: '',
   
    })

    const handleQueryChange = (key, value) => {
        setQuery({
            ...query,
            [key]: value
        })
    }

    const getDeveloperData = async () => {
        const res = await queryDeveloper(query)
        setDeveloperData(res)
    }

    useEffect(() => {
        getDeveloperData()
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
                    {developerData && developerData.map((item, index) => (
                        <Grid item lg={3} md={4} sm={6} xs={12} key={index} >
                            <DeveloperCard item={item} />
                        </Grid>
                    ))}
                </Grid>
            </Paper>
        </Container>
    )
}

export default Developer