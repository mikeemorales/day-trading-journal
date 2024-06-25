import React from 'react';
import { Box, Typography } from '@mui/material';

const BoxDailyPnL = ({ dailyPnL }: { dailyPnL: number | null }) => {
  const today = new Date()
  const month = today.getMonth() + 1
  const year = today.getFullYear()
  const date = today.getDate()
  const currentDate = month + '-' + date + '-' + year

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: 350, height: 130, mx: 'auto', boxShadow: '0px 0px 10px #1e1e1e' }}>
      <Typography variant='caption' fontWeight='bold' sx={{ pt: 2, pl: 2, color: '#FFFFFF' }}>
        Daily PnL <span>{` (${currentDate})`}</span>
      </Typography>
      <Typography variant='h5' fontWeight='bold' sx={{ display: 'flex', justifyContent: 'center', mt: 2, color: dailyPnL! < 0 ? '#FF4040' : '#0093FF' }}>
        $ {dailyPnL !== null ? dailyPnL : 0}
      </Typography>
    </Box>
  );
}

export default BoxDailyPnL;
