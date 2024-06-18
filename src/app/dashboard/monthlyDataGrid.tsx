"use client";
import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Container, Typography, Box, Button, IconButton } from '@mui/material';

const MonthlyDataGrid = ({ monthlyTotals, setMonthlyTotals }: { monthlyTotals: number[]; setMonthlyTotals: React.Dispatch<React.SetStateAction<number[]>> }) => {
  const months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];

  const handleClearMonthlyTotals = () => {
    setMonthlyTotals(new Array(12).fill(0));
  };

  return (
    <Container maxWidth={false}>
      <TableContainer>
        <Table size='small'>
          <TableHead>
            <TableRow sx={{ '& td, & th': { border: 0 }, backgroundColor: '#272727' }}>
              {months.slice(0, 4).map((month) => (
                <TableCell key={month} sx={{ fontSize: 'small', color: 'white' }} align="center">
                  {month}
                </TableCell>
              ))}
            </TableRow>
            <TableRow sx={{ '& td, & th': { border: 0 }, backgroundColor: '#1F1F1F' }}>
              {monthlyTotals.slice(0, 4).map((value, index) => (
                <TableCell key={index} sx={{ fontSize: 'small', color: 'white' }} align="center">
                  {value}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody sx={{ '& td, & th': { border: 0 }, backgroundColor: '#1F1F1F' }}>
            {Array.from({ length: 2 }).map((_, i) => (
              <React.Fragment key={i}>
                <TableRow sx={{ backgroundColor: '#272727'}}>
                  {months.slice(i * 4 + 4, i * 4 + 8).map((month) => (
                    <TableCell key={month} sx={{ fontSize: 'small', color: 'white' }} align="center">
                      {month}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow sx={{ '& td, & th': { border: 0 }, backgroundColor: '#1F1F1F' }}>
                  {monthlyTotals.slice(i * 4 + 4, i * 4 + 8).map((value, index) => (
                    <TableCell key={index} sx={{ fontSize: 'small', color: 'white' }} align="center">
                      {value}
                    </TableCell>
                  ))}
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', flexDirection: 'row-reverse', mt: 1 }}>
        <Button onClick={handleClearMonthlyTotals} variant='outlined' size='small' color='error' sx={{ mt: 1, mb: 1, height: 25, width: 80, fontSize: 8, border: '0.5px solid red', textWrap: 'nowrap' }}>Clear Months</Button>
      </Box>
    </Container>
  );
}

export default MonthlyDataGrid;
