import React from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

const Search = (props) => {
    const { query, onQueryChange } = props;
    const { product_team, } = query;

    const handleProductChange = (event) => {
        onQueryChange('product_team', event.target.value)
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
            </Grid>
        </Box>
    )
};

export default Search;