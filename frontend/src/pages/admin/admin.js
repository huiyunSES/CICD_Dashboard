import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';


export default function Admin() {
    const navigate = useNavigate();
    const [team, setTeam] = React.useState('');
    const [resName, setResName] = React.useState('');
    const [role, setRole] = React.useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
    };

    const handleTeamChange = (event) => {
        setTeam(event.target.value);
    };

    const handleResNameChange = (event) => {
        setResName(event.target.value);
    };

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };

    const handleRedirectToLogin = (event) => {
        event.preventDefault();
        navigate('/')
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                //   
                }}
            >
                <Typography component="h1" variant="h5">
                    First Time User: Create Your Account
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="given-name"
                                name="username"
                                required
                                fullWidth
                                id="username"
                                label="UserName"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="lastTime-select-label">Product Team</InputLabel>
                                <Select
                                    labelId="lastTime-select-label"
                                    id="lastTime-select"
                                    value={team}
                                    label="lastTime"
                                    onChange={handleTeamChange}
                                >
                                    <MenuItem value={10}>Last 7 days</MenuItem>
                                    <MenuItem value={20}>Last 30 days</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="lastTime-select-label">Name</InputLabel>
                                <Select
                                    labelId="name-select-label"
                                    id="name-select"
                                    value={resName}
                                    label="name"
                                    onChange={handleResNameChange}
                                >
                                    <MenuItem value={10}>Last 7 days</MenuItem>
                                    <MenuItem value={20}>Last 30 days</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="lastTime-select-label">Role</InputLabel>
                                <Select
                                    labelId="role-select-label"
                                    id="role-select"
                                    value={role}
                                    label="Role"
                                    onChange={handleRoleChange}
                                >
                                    <MenuItem value={10}>Role1</MenuItem>
                                    <MenuItem value={20}>Role2</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="#" onClick={handleRedirectToLogin} variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}
