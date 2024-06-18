import React, { useEffect, useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { LineChart } from '@mui/x-charts';

const AccountsTimeline = ({ dailyData }: { dailyData: number[] }) => {
  const [chartData, setChartData] = useState<{ day: number; price: number }[]>([]);

  useEffect(() => {
    const transformedData: { day: number; price: number }[] = [];
    dailyData.forEach((price, index) => {
      transformedData.push({
        day: index + 1,
        price: price,
      });
    });
    setChartData(transformedData);
  }, [dailyData]);

  return (
    <Container>
      {/* <Typography sx={{ mb: 3, borderBottom: 'none', fontSize: 'small' }}>Accounts Timeline</Typography> */}
      {/* <Box boxShadow={8}>
        <Typography sx={{ mb: 3, borderBottom: 'none', fontSize: 'small' }}>Accounts Timeline</Typography>
      </Box> */}
      <LineChart
        series={[
          {
            data: chartData.map(d => d.price),
          },
        ]}
        width={500}
        height={250}
        margin={{
          top: 45,
          bottom: 20,
        }}
        xAxis={[
          {
            tickNumber: chartData.length,
            data: chartData.map(d => d.day)
          }
        ]}
        sx={{ 
          "& .MuiChartsAxis-left .MuiChartsAxis-tickLabel": {
            strokeWidth: "0.4",
            fill: "#FFFFFF"
          },
          "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel": {
            strokeWidth: "0.5",
            fill: "#FFFFFF"
          },
          "& .MuiChartsAxis-bottom .MuiChartsAxis-line": {
            stroke: "#FFFFFF",
            strokeWidth: 0.4
          },
          "& .MuiChartsAxis-left .MuiChartsAxis-line": {
            stroke: "#FFFFFF00",
            strokeWidth: 0.4
          }
        }}
      />
    </Container>
  );
};

export default AccountsTimeline;
