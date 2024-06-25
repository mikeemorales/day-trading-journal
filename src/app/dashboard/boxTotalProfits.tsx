import React from 'react';
import { Box, Typography } from '@mui/material';
import { useAccountContext } from '../components/accountsContext';

const BoxTotalProfits = () => {
  const { liquidity } = useAccountContext();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: 350, height: 130, mx: 'auto', boxShadow: '0px 0px 10px #1e1e1e' }}>
      <Typography variant='caption' fontWeight='bold' sx={{ pt: 2, pl: 2, color: '#FFFFFF' }}>
          Total Profits
        </Typography>
        <Typography variant='h5' fontWeight='bold' sx={{ display: 'flex', justifyContent: 'center', mt: 2, color: liquidity < 0 ? '#FF4040' : '#0093FF' }}>
          $ {liquidity}
        </Typography>
    </Box>
  );
}

export default BoxTotalProfits;
