"use client";
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { Box, Button, Typography } from '@mui/material';
import { auth } from '@/utils/firebaseConfig';
import { useRouter } from 'next/navigation';

const AccountSettings = () => {
  const [user, setUser] = useState(auth.currentUser || null);
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  if (!user) {
    return (
      <Box>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  const handleBackToDashboard = () => {
    router.push('/dashboard')
  }

  return (
    <Box>
      <Typography variant="h6">Account Settings</Typography>
      <Typography>Name: {user.displayName}</Typography>
      <Typography>Email: {user.email}</Typography>
      <Typography>UID: {user.uid}</Typography>
      <Button variant='outlined' onClick={handleBackToDashboard} color="inherit">Back to Dashboard</Button>
    </Box>
  );
};

export default AccountSettings;
