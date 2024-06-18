"use client"
import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Container } from '@mui/material';

const MonthlyPnLChart = ({ weeklyTotals }: { weeklyTotals: number[] }) => {
    const series = [{ data: weeklyTotals }];

  return (
    <Container>
        <BarChart
            xAxis={[
                { 
                  scaleType: 'band', data: ['WEEK 1', 'WEEK 2', 'WEEK 3', 'WEEK 4', 'WEEK 5'], 
                  colorMap: 
                    {
                      type: 'ordinal',
                      colors: ['#ccebc5', '#a8ddb5', '#7bccc4', '#4eb3d3', '#2b8cbe', '#08589e'],
                    },
                    labelStyle: { color: 'white' }
                }
            ]}
            width={500}
            height={250}
            grid={{ horizontal: true }}
            series={series}
            margin={{
            top: 45,
            bottom: 20,
            }}
            barLabel='value'
            sx={{ 
              "& .MuiChartsAxis-left .MuiChartsAxis-tickLabel":{
                strokeWidth:"0.4",
                fill:"#FFFFFF"
              },
                "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel":{
                    strokeWidth:"0.5",
                    fill:"#FFFFFF"
                },
                "& .MuiChartsAxis-bottom .MuiChartsAxis-line":{
                  stroke:"#FFFFFF",
                  strokeWidth:0.4
                },
                "& .MuiChartsAxis-left .MuiChartsAxis-line":{
                  stroke:"#FFFFFF00",
                  strokeWidth:0.4
                }
              }}
        />
    </Container>
  );
}

export default MonthlyPnLChart;
