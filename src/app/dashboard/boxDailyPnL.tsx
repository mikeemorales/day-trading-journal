import React from 'react';
import { Box, Typography } from '@mui/material';

const BoxDailyPnL = ({ dailyPnL }: { dailyPnL: number | null }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: 500, height: 130, mx: 'auto', boxShadow: '0px 0px 10px #1e1e1e' }}>
      <Typography variant='h6' fontWeight='bold' sx={{ pt: 1, pl: 2, color: '#FFFFFF' }}>
        Daily PnL
      </Typography>
      <Typography variant='h6' fontWeight='bold' sx={{ display: 'flex', justifyContent: 'center', pt: 1, color: dailyPnL! < 0 ? '#FF4040' : '#0093FF' }}>
        {dailyPnL !== null ? dailyPnL : 0}
      </Typography>
    </Box>
  );
}

export default BoxDailyPnL;
