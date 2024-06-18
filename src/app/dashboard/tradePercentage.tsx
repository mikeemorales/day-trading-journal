"use client"
import React, { useEffect, useState } from 'react';
import { LineChart, lineElementClasses } from '@mui/x-charts';

const TradePercentage = () => {


  const week1 = [450, 325, -250, 450, 355];
  const week2 = [-250, -300, -100, 450, -6];
  const week3 = [450, 325, -250, 450, 355];
  const week4 = [450, 325, -250, -450, 355];
  const week5 = [-450, -325, -250, 450, 355];
  const xLabels = ['Mon', 'Tues', 'Weds', 'Thurs', 'Fri'];

  return (
      <LineChart
        width={500}
        height={250}
        series={[
          { data: week1, label: 'Wk. 1', area: true, stack: 'total', showMark: false },
          { data: week2, label: 'Wk. 2', area: true, stack: 'total', showMark: false },
          { data: week3, label: 'Wk. 3', area: true, stack: 'total', showMark: false },
          { data: week4, label: 'Wk. 4', area: true, stack: 'total', showMark: false },
          { data: week5, label: 'Wk. 5', area: true, stack: 'total', showMark: false },
        ]}
        xAxis={[
          { scaleType: 'point', data: xLabels, labelStyle: { color: 'white' } }
        ]}
        sx={{
          pl: 7,
          pt: 3,
          [`& .${lineElementClasses.root}`]: {
            display: 'none',
          },
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
        margin={{
          top: 45,
          bottom: 20,
          }}
      />
    );
}

export default TradePercentage

// 