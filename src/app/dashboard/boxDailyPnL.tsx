import React from 'react';
import { Box, Typography } from '@mui/material';

const BoxDailyPnL = ({ dailyPnL }: { dailyPnL: number | null }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: 350, height: 130, mx: 'auto', boxShadow: '0px 0px 10px #1e1e1e' }}>
      <Typography variant='caption' fontWeight='bold' sx={{ pt: 2, pl: 2, color: '#FFFFFF' }}>
        Daily PnL
      </Typography>
      <Typography variant='h5' fontWeight='bold' sx={{ display: 'flex', justifyContent: 'center', pt: 1, color: dailyPnL! < 0 ? '#FF4040' : '#0093FF' }}>
        $ {dailyPnL !== null ? dailyPnL : 0}
      </Typography>
    </Box>
  );
}

export default BoxDailyPnL;
