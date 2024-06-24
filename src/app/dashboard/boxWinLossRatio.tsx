import React from 'react';
import { Box, Typography } from '@mui/material';
import { useInputValuesContext } from '../components/weeklyDataGridInputContext';

const BoxWinLossRatio = () => {
    const { weeklyInputValues, setWeeklyInputValues } = useInputValuesContext();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: 350, height: 130, mx: 'auto', boxShadow: '0px 0px 10px #1e1e1e' }}>
      <Typography variant='caption' fontWeight='bold' sx={{ pt: 2, pl: 2, color: '#FFFFFF' }}>
          Win / Loss Ratio %
        </Typography>
        {weeklyInputValues.map((weekValues, index) => (
           <Typography key={index} variant='h6' fontWeight='bold' sx={{ display: 'flex', justifyContent: 'center', pt: 1, color: '#FFFFFF' }}>
            week {index + 1}: {weekValues.join(', ')}
           </Typography> 
        ))}
    </Box>
  );
}

export default BoxWinLossRatio;
