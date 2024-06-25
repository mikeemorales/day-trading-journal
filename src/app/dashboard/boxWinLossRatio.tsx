import React from 'react';
import { Box, Typography } from '@mui/material';
import { useWinsLosses } from '../components/winsAndLossesContext';

const BoxWinLossRatio: React.FC = () => {
  const { winsCount, lossesCount } = useWinsLosses();
  const totalTrades = winsCount + lossesCount

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: 350, height: 130, mx: 'auto', boxShadow: '0px 0px 10px #1e1e1e' }}>
      <Typography variant='caption' fontWeight='bold' sx={{ pt: 2, pl: 2, color: '#FFFFFF' }}>
        Wins / Losses
      </Typography>
      <Typography variant='h5' fontWeight='bold' sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Box component='span' sx={{ color: '#0093FF', mr: 2 }}>{winsCount}</Box>:
        <Box component='span' sx={{ color: '#FF4040', ml: 2 }}>{lossesCount}</Box>
      </Typography>
    </Box>
  );
}

export default BoxWinLossRatio;
