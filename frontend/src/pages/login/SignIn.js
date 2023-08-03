import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import microsoft from '../../assets/images/microsoft.png';
import Equinix_logo from '../../assets/images/Equinix_logo.png';
import Equinix from '../../assets/images/Equinix.png';
import background from '../../assets/images/background.png';
import { PublicClientApplication } from '@azure/msal-browser';
import { config } from '../../Config'; // Import the MSAL configuration

const msalApp = new PublicClientApplication({
  auth: {
    clientId: config.appId,
    redirectUri: config.redirectUri,
    authority: config.authority,
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: true,
  },
});

export default function SignIn() {
  const navigate = useNavigate();

  const handleMicrosoftSignIn = async () => {
    try {
      const loginResponse = await msalApp.loginPopup({
        scopes: ['openid', 'profile', 'email'], // Add necessary scopes
      });

      // After successful login, navigate to the dashboard or any other route
      navigate('/dashboard/summary');
    } catch (error) {
      console.error('Error during Microsoft sign-in:', error);
    }
  };

  return (
    <Grid container component="main" sx={{ height: '100vh'}}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} style ={{backgroundColor: 'white'}}>

        <Box
          sx={{
            my: 15,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 1
            
         
          }}
        >
          <img src={Equinix_logo} alt="Logo" style={{ width: '180px', marginRight: '5px', marginTop: "150px"}} />
          <Typography component="h1" variant="h2" sx={{ mt: 5, mb: 6, mt: 8}} style ={{fontSize: "50px"}}>
            CICD Dashboard Portal
          </Typography>
          <Typography component="h1" variant="h5" style ={{fontSize: "18px", color: "#515A5A"}}>
            Login to Your Account
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <Button
              type="button" 
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                textTransform: 'none',
                borderColor: 'gray',
                backgroundColor: '#2F2F2F', 
                fontSize: "15px",
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                
              }}
              onClick={handleMicrosoftSignIn} 
            >
               <img src={microsoft} alt="Logo" style={{ width: '25px', height: '25px', marginRight: '5px'}} />
              Sign in with Microsoft
            </Button>
          </Box>
        </Box>
   
      </Grid>
      <Grid
        item
        xs={false}
        sm={4}
        md={6}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
          // backgroundImage: `url(${background})`,
          backgroundRepeat: 'no-repeat',
          backgroundColor: 'white',
          // backgroundColor: (t) =>
          //   t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: '650px',
          backgroundSize: 'cover',
          backgroundPosition: 'left',
  

        
        }}
      />
    </Grid>
  );
}
