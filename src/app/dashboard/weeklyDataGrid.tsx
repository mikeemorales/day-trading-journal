"use client";
import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box, Button, Container, FormControl, MenuItem, Select, TextField } from '@mui/material';
import { useAccountContext } from '../components/accountsContext';
import { SelectChangeEvent } from '@mui/material/Select';
import { useInputValuesContext } from '../components/weeklyDataGridInputContext';

interface RowData {
  weeks: string,
  week1: string,
  week2: string,
  week3: string,
  week4: string,
  week5: string,
  weeklyTotal: number,
  monthlyTotal: number | null
};

const createData = (
  weeks: string,
  week1: string,
  week2: string,
  week3: string,
  week4: string,
  week5: string,
  weeklyTotal: number,
  monthlyTotal: number | null
): RowData => {
  return { weeks, week1, week2, week3, week4, week5, weeklyTotal, monthlyTotal };
};

const WeeklyDataGrid = ({
  setWeeklyTotals,
  weeklyTotals,
  monthlyTotals,
  setMonthlyTotals,
  selectedMonth,
  handleMonthChange,
  setDailyData,
  setDailyPnLValue,
}: {
  setWeeklyTotals: React.Dispatch<React.SetStateAction<number[]>>;
  weeklyTotals: number[];
  monthlyTotals: number[];
  setMonthlyTotals: React.Dispatch<React.SetStateAction<number[]>>;
  selectedMonth: number;
  handleMonthChange: (event: SelectChangeEvent<number>) => void;
  setDailyData: React.Dispatch<React.SetStateAction<number[]>>;
  setDailyPnLValue: React.Dispatch<React.SetStateAction<number | null>>;
}) => {
  const [rows, setRows] = useState<RowData[]>([]);
  const { liquidity, updateLiquidity } = useAccountContext();
  const [disabledMonths, setDisabledMonths] = useState<boolean[]>(Array(12).fill(false));
  const { weeklyInputValues, setWeeklyInputValues } = useInputValuesContext();
  // const [dailyPnL, setDailyPnL] = useState<number | null>(null); 

  useEffect(() => {
    const updateRows = () => {
      const newRows: RowData[] = [
        createData('WEEK 1', '', '', '', '', '', 0, 0),
        createData('WEEK 2', '', '', '', '', '', 0, null),
        createData('WEEK 3', '', '', '', '', '', 0, null),
        createData('WEEK 4', '', '', '', '', '', 0, null),
        createData('WEEK 5', '', '', '', '', '', 0, null),
      ];
      setRows(newRows);
    };
    updateRows();
  }, []);

  useEffect(() => {
    const newWeeklyTotals = rows.map(row =>
      (parseFloat(row.week1) || 0) +
      (parseFloat(row.week2) || 0) +
      (parseFloat(row.week3) || 0) +
      (parseFloat(row.week4) || 0) +
      (parseFloat(row.week5) || 0)
    );
    
    updateLiquidity(newWeeklyTotals.reduce((acc, total) => acc + total, 0));
    setWeeklyTotals(newWeeklyTotals);
  }, [rows, setWeeklyTotals]);

  const handleDailyPnLChange = (value: string | number, rowIndex: number, weekIndex: number) => {
    const newValue = value === '' ? '' : parseFloat(String(value)) || '';
    const newRows = [...rows];
    const weekKey = `week${weekIndex + 1}` as keyof RowData;
    (newRows[rowIndex][weekKey] as string) = newValue.toString();
    setRows(newRows);
  
    const newData = newRows.map(row =>
      (parseFloat(row.week1) || 0) +
      (parseFloat(row.week2) || 0) +
      (parseFloat(row.week3) || 0) +
      (parseFloat(row.week4) || 0) +
      (parseFloat(row.week5) || 0)
    );
    setDailyData(newData);

    if (weekIndex >= 0 && weekIndex < 5) {
      setDailyPnLValue(parseFloat(newValue.toString()));
    }
  };

  const handleClearAll = () => {
    const newRows = rows.map(row => ({
      ...row,
      week1: '',
      week2: '',
      week3: '',
      week4: '',
      week5: '',
    }));
    setRows(newRows);
    setWeeklyTotals([0, 0, 0, 0, 0]);
    setDisabledMonths(Array(12).fill(false));
    setDailyPnLValue(null);
  };

  const handleAddToMonth = () => {
    if (!disabledMonths[selectedMonth]) {
      const newMonthlyTotals = [...monthlyTotals];
      const newDisabledMonths = [...disabledMonths];
      
      newMonthlyTotals[selectedMonth] += weeklyTotals.reduce((acc, total) => acc + total, 0);
      setMonthlyTotals(newMonthlyTotals);
      newDisabledMonths[selectedMonth] = true;
      setDisabledMonths(newDisabledMonths);
    }
  };

  function calculateWeeklyTotal(row: RowData): number {
    return (
      (parseFloat(row.week1) || 0) +
      (parseFloat(row.week2) || 0) +
      (parseFloat(row.week3) || 0) +
      (parseFloat(row.week4) || 0) +
      (parseFloat(row.week5) || 0)
    );
  }

  return (
    <Container maxWidth={false}>
      <TableContainer sx={{ width: '100%' }}>
        <Table size='small' aria-label="simple table">
          <TableHead sx={{ '& td, & th': { border: 0 } }}>
            <TableRow>
              <TableCell sx={{ fontSize: 'small', color: 'white' }}>Weeks</TableCell>
              <TableCell align="center" sx={{ fontSize: 'small', color: 'white' }}>Monday</TableCell>
              <TableCell align="center" sx={{ fontSize: 'small', color: 'white' }}>Tuesday</TableCell>
              <TableCell align="center" sx={{ fontSize: 'small', color: 'white' }}>Wednesday</TableCell>
              <TableCell align="center" sx={{ fontSize: 'small', color: 'white' }}>Thursday</TableCell>
              <TableCell align="center" sx={{ fontSize: 'small', color: 'white' }}>Friday</TableCell>
              <TableCell align="center" sx={{ fontSize: 'small', color: 'white' }}>Total</TableCell>
              <TableCell align="center" sx={{ fontSize: 'small', color: 'white' }}>Month</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={row.weeks} sx={{ '& td, & th': { border: 0 }, mb: 5, backgroundColor: index % 2 === 0 ? '#272727' : '#1F1F1F' }}>
                <TableCell component="th" scope="row" sx={{ fontSize: 'x-small', color: 'white' }}>{row.weeks}</TableCell>
                {[1, 2, 3, 4, 5].map((weekIndex) => {
                  const weekKey = `week${weekIndex}` as keyof RowData;
                  const cellValue = row[weekKey];
                  const numericValue = typeof cellValue === 'number' ? cellValue : parseFloat(cellValue as string);
                  function calculateWeeklyTotal(arg0: RowData): React.ReactNode {
                    throw new Error('Function not implemented.');
                  }

                  return (
                    <TableCell key={`week${weekIndex}`} align="center">
                      {index < 5 ? (
                        <TextField
                          variant="standard"
                          type="number"
                          value={row[weekKey]}
                          onChange={(e) => handleDailyPnLChange(parseFloat(e.target.value), index, weekIndex - 1)}
                          InputProps={{
                            disableUnderline: true,
                            sx: { borderBottom: 'none', fontSize: 'small', color: numericValue < 0 ? '#FF4040' : '#0093FF'  },
                          }}
                          sx={{
                            width: '50%',
                            '& .MuiInputBase-input': {
                              textAlign: 'center',
                            },
                          }}
                        />
                      ) : (
                        calculateWeeklyTotal(rows[index])
                      )}
                    </TableCell>
                  );
                })}
                <TableCell align="center" sx={{ fontSize: 'small', color: 'white', backgroundColor: '#34423375' }}>{calculateWeeklyTotal(row)}</TableCell>
                <TableCell align="center" sx={{ fontSize: 'small', color: 'white', backgroundColor: '#3D5B8975' }}>{index === 0 ? weeklyTotals.reduce((acc, total) => acc + total, 0) : ''}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  
      <Box sx={{ display: 'flex', flexDirection: 'row-reverse', mt: 2 }}>
	      <Button variant="outlined" onClick={handleClearAll} color="error" sx={{ height: 25, width: 80, fontSize: 8, border: '0.5px solid red', textWrap: 'nowrap' }}>Clear Weeks</Button>
        <Button variant="outlined" onClick={handleAddToMonth} sx={{ mr: 2, height: 25, width: 100, fontSize: 8, color: 'white', border: '0.5px solid white', textWrap: 'nowrap' }}  disabled={disabledMonths[selectedMonth]}>Add To Months</Button>
        <FormControl variant="outlined" size="small" sx={{ mr: 2 }}>
          <Select
            value={selectedMonth}
            onChange={handleMonthChange}
            label="Select Month"
            sx={{ backgroundColor: '#2F2F2F', color: 'white', border: '1px solid white', height: 25, width: 100, fontSize: 10 }}
            inputProps={{
              classes: {
                icon: 'white-icon',
              },
            }}
          >
            {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month, index) => (
              <MenuItem key={month} value={index}>{month}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

    </Container>
  );
  
};

export default WeeklyDataGrid;
