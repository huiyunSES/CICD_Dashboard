import React from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Search = (props) => {
    const { query, onQueryChange } = props;
    const { product_team, converage_rate_range, last_time, github_username, repository_name, } = query;

    const handleProductChange = (event) => {
        onQueryChange('product_team', event.target.value)
    };

    const handleCoverageRateChange = (event) => {
        onQueryChange('converage_rate_range', event.target.value)
    };

    const handleLastTimeChange = (event) => {
        onQueryChange('last_time', event.target.value)
    };

    const handleGithubOwnerChange = (event) => {
        onQueryChange('github_username', event.target.value)
    };

    const handleRepositoryNameChange = (event) => {
        onQueryChange('repository_name', event.target.value)
    };

    return (
        <Box component="form" noValidate>
            <Grid container spacing={2}>
                <Grid item md={3}>
                    <TextField
                        name="product"
                        fullWidth
                        label="Product"
                        value={product_team}
                        onChange={handleProductChange}
                        size="small"
                    />
                </Grid>
                <Grid item md={3}>
                    <FormControl fullWidth size="small">
                        <InputLabel id="coverageRate-select-label">Coverage Rate</InputLabel>
                        <Select
                            labelId="coverageRate-select-label"
                            id="coverageRate-select"
                            value={converage_rate_range}
                            label="Coverage Rate"
                            onChange={handleCoverageRateChange}
                        >
                            <MenuItem value='All'>All</MenuItem>
                            <MenuItem value='0-50%'>0-50%</MenuItem>
                            <MenuItem value='50-75%'>50%-75%</MenuItem>
                            <MenuItem value='75-90%'>75%-90%</MenuItem>
                            <MenuItem value='90-100%'>90%-100%</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item md={2}>
                    <FormControl fullWidth size="small">
                        <InputLabel id="lastTime-select-label">LastTime</InputLabel>
                        <Select
                            labelId="lastTime-select-label"
                            id="lastTime-select"
                            value={last_time}
                            label="lastTime"
                            onChange={handleLastTimeChange}
                        >
                            <MenuItem value='All'>All</MenuItem>
                            <MenuItem value='Last 7 days'>Last 7 days</MenuItem>
                            <MenuItem value='Last 30 days'>Last 30 days</MenuItem>
                            <MenuItem value='Last 3 months'>Last 3 months</MenuItem>
                            <MenuItem value='6 months ago'>6 months ago</MenuItem>
                            <MenuItem value='Last 1 year'>Last 1 year</MenuItem>
                        
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item md={2}>
                    <TextField
                        name="owner"
                        fullWidth
                        label="GitHub Owner"
                        value={github_username}
                        onChange={handleGithubOwnerChange}
                        size="small"
                    />
                </Grid>
                <Grid item md={2}>
                    <TextField
                        name="repository_name"
                        fullWidth
                        label="Repository"
                        value={repository_name}
                        onChange={handleRepositoryNameChange}
                        size="small"
                    />
                </Grid>
            </Grid>
        </Box>
    )
};

export default Search;