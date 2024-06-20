"use client";
import React from 'react';
import { Box, Button, Container, Divider, Typography } from '@mui/material';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import stockChart from '/public/images/stock-chart.jpg'
import mainLogo from '/public/images/pl-logo.png'
import GoogleButton from 'react-google-button'

const Login: React.FC = () => {
    const auth = getAuth();
    const router = useRouter();
  
    const handleGoogleSignIn = async () => {
      const provider = new GoogleAuthProvider();
      try {
        await signInWithPopup(auth, provider);
        router.push('/dashboard');
      } catch (error) {
        console.error('Error during sign-in:', error);
      }
    };
  
    return (
      <Container maxWidth={false} sx={{ display: 'flex', justifyContent: 'center', margin: 'auto' }}>
        <Image
            src={stockChart}
            alt='login image'
            layout='fill'
            objectFit='cover'
          />
        <Box
          sx={{
            background: 'rgba(0, 0, 0, 0.12)',
            borderRadius: '16px',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(11.8px)',
            WebkitBackdropFilter: 'blur(11.8px)',
            backgroundColor: '#00000075',
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            justifyContent: 'center',
            height: 750,
            width: 750,
          }}
        >
          <Image
            src={mainLogo}
            alt='Profit Logs'
            height={100}
          />
          <Typography sx={{ mt: 10 }}/>
          <GoogleButton onClick={handleGoogleSignIn}/>
          {/* <Typography variant='caption' sx={{ mt: 3 }}>
           <Divider sx={{ backgroundColor: 'white', width: 100 }}/>
          </Typography>
          <Button variant="outlined" color="primary" sx={{ mt: 3, color: 'white' }}>
            Email
          </Button> */}
        </Box>
      </Container>
    );
  };
  
  export default Login;