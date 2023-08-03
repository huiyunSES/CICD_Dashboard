import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Search = (props) => {
    const { query, onQueryChange } = props;
    const { product_team, run_conclusion, repository_name } = query;

    const handleProductChange = (event) => {
        onQueryChange('product_team', event.target.value)
    };

    const handleStatusChange = (event) => {
        onQueryChange('run_conclusion', event.target.value)
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
                    <TextField
                        name="repository_name"
                        fullWidth
                        label="Repository"
                        value={repository_name}
                        onChange={handleRepositoryNameChange}
                        size="small"
                    />
                </Grid>
                <Grid item md={3}>
                    <FormControl fullWidth size="small">
                        <InputLabel id="status-select-label">Status</InputLabel>
                        <Select
                            labelId="status-select-label"
                            id="status-select"
                            value={run_conclusion}
                            label="Status"
                            onChange={handleStatusChange}
                        >
                            <MenuItem value='All'>All</MenuItem>
                            <MenuItem value='Success'>Success</MenuItem>
                            <MenuItem value='Failure'>Failure</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
               
            </Grid>
        </Box>
    )
};

export default Search;