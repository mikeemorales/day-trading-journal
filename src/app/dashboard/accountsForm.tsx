import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, Box, Typography } from '@mui/material';

const accountCapitalOptions = [25000, 50000, 75000, 100000, 150000, 250000, 300000];

const AccountForm = ({ onAddAccount }: { onAddAccount: (name: string, accountType: number, monthlyGoal: number) => void }) => {
  const [name, setName] = useState('');
  const [accountType, setAccountType] = useState<number>(accountCapitalOptions[0]);
  const [monthlyGoal, setMonthlyGoal] = useState<number>(0);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onAddAccount(name, accountType, monthlyGoal);
    setName('');
    setAccountType(accountCapitalOptions[0]);
    setMonthlyGoal(0);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: 250 }}>
        <Typography>Account Name</Typography>
        <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ backgroundColor: '#2F2F2F', color: '#FFFFFF', border: '1px solid', mb: 1 }}            
            InputProps={{
            sx: { color: '#FFFFFF', height: 30 },
            }}
        />
        <Typography>Starting Capital</Typography>
        <Select
            value={accountType}
            onChange={(e) => setAccountType(e.target.value as number)}
            sx={{ height: 30, backgroundColor: '#2F2F2F', color: 'white', border: '1px solid white', mb: 1 }}
            inputProps={{
                classes: {
                icon: 'white-icon',
                },
            }}
        >
            {accountCapitalOptions.map((option) => (
            <MenuItem key={option} value={option}>{option}</MenuItem>
            ))}
        </Select>
        <Typography>Monthly Target Goal</Typography>
        <TextField
            type="number"
            value={monthlyGoal}
            onChange={(e) => setMonthlyGoal(Number(e.target.value))}
            sx={{ backgroundColor: '#2F2F2F', color: 'white', border: '1px solid', mb: 2 }}
            InputProps={{
            sx: { color: '#FFFFFF', height: 30 },
            }}
        />
        <Button type="submit" variant="outlined" color="primary">
            Add Account
        </Button>
    </Box>

  );
};

export default AccountForm;
