"use client";
import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useRouter } from 'next/navigation';

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
      <Container maxWidth={false}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8 }}>
          <Typography variant="h4" gutterBottom sx={{ mb: 5 }}>
            Trading Journal Login
          </Typography>
          <Button variant="contained" color="primary" onClick={handleGoogleSignIn}>
            Sign in with Google
          </Button>
          <Typography variant='caption' sx={{ mt: 3 }}>current beta only allows for Google single sign-on</Typography>
        </Box>
      </Container>
    );
  };
  
  export default Login;