"use client";
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Container, Button } from '@mui/material';
import { useAccountContext } from '../components/accountsContext';
import AccountForm from './accountsForm';

interface RowData {
  name: string;
  accountType: number;
  monthlyGoal: number;
  liquidity: number;
}

function createData(name: string = '', accountType: number = 0, monthlyGoal: number = 0): RowData {
  return { name, accountType, monthlyGoal, liquidity: accountType };
}

const AccountNames = () => {
  const { liquidity, updateLiquidity } = useAccountContext();
  const [rows, setRows] = useState<RowData[]>(Array(5).fill(createData()));
  const [accountCreated, setAccountCreated] = useState(false);

  const handleAddAccount = (name: string, accountType: number, monthlyGoal: number) => {
    const newAccount = createData(name, accountType, monthlyGoal);
    setRows([newAccount, ...Array(4).fill(createData())]);
    setAccountCreated(true);
    updateLiquidity(accountType);
  };

  const handleClearAccount = () => {
    setRows(Array(5).fill(createData()));
    setAccountCreated(false);
    updateLiquidity(-liquidity);
  };

  return (
    <Container>
      {!accountCreated && <AccountForm onAddAccount={handleAddAccount} />}
      {accountCreated && (
        <TableContainer sx={{ maxHeight: 355, overflowY: 'auto' }}>
          <Table size='small'>
            <TableHead sx={{ '& td, & th': { border: 0, backgroundColor: '#2F2F2F' } }}>
              <TableRow>
                <TableCell sx={{ fontSize: 'small', color: 'white' }}>Account</TableCell>
                <TableCell align="center" sx={{ fontSize: 'small', color: 'white' }}>Capital</TableCell>
                <TableCell align="center" sx={{ fontSize: 'small', color: 'white' }}>Liquidity</TableCell>
                <TableCell align="center" sx={{ fontSize: 'small', color: 'white' }}>Goal</TableCell>
                <TableCell align="center" sx={{ fontSize: 'small', color: 'white' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index} sx={{ '& td, & th': { border: 0 }, mb: 5, height: '2.5rem', backgroundColor: index % 2 === 0 ? '#272727' : '#1F1F1F' }}>
                  <TableCell component="th" scope="row" sx={{ fontSize: 'x-small', color: 'white' }}>{row.name || ''}</TableCell>
                  <TableCell align="center" sx={{ fontSize: 'x-small', color: 'white' }}>{row.accountType || ''}</TableCell>
                  <TableCell align="center" sx={{ fontSize: 'x-small', color: 'white' }}>{row.name ? liquidity : ''}</TableCell>
                  <TableCell align="center" sx={{ fontSize: 'x-small', color: 'white' }}>{row.monthlyGoal || ''}</TableCell>
                  <TableCell align="center">
                    {index === 0 && row.name && (
                      <Button onClick={handleClearAccount} variant='outlined' color='error' sx={{ height: 25, width: 20, fontSize: 8, border: '0.5px solid red', textWrap: 'nowrap' }}>remove</Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default AccountNames;