"use client";
import { AppBar, Box, Button, Container, Grid, Toolbar, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import WeeklyDataGrid from './weeklyDataGrid';
import AccountNames from './accounts';
import { AccountProvider } from '../components/accountsContext';
import MonthlyPnLChart from './monthlyPnLChart';
import BalanceAndProjections from './balanceAndProjections';
import MonthlyDataGrid from './monthlyDataGrid';
import AccountsTimeline from './accountsTimeline';
import AddchartIcon from '@mui/icons-material/Addchart';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import SummarizeIcon from '@mui/icons-material/Summarize';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import { SelectChangeEvent } from '@mui/material/Select';
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import TradePercentage from './tradePercentage';

const MainLayout: React.FC = () => {
  const [weeklyTotals, setWeeklyTotals] = useState<number[]>([0, 0, 0, 0, 0]);
  const [monthlyTotals, setMonthlyTotals] = useState<number[]>(Array(12).fill(0));
  const [selectedMonth, setSelectedMonth] = useState<number>(0);
  const [dailyData, setDailyData] = useState<number[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const router = useRouter();

  const handleMonthChange = (event: SelectChangeEvent<number>) => {
    setSelectedMonth(event.target.value as number);
  };

  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
    router.push('/');
  };

  const handleAccountMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAccountMenuClose = () => {
    setAnchorEl(null);
  };

  const isDashboardView = () => {
    router.push('/dashboard')
  }

  const isAccountSettingsView = () => {
    router.push('/dashboard/accountSettings')
  }

  const drawerItems = [
    { name: 'Journal', icon: <AddchartIcon /> },
    { name: 'Account Summary', icon: <SummarizeIcon /> },
    { name: 'Trade Logs', icon: <ShowChartIcon /> },
    { name: 'Notes', icon: <TextSnippetIcon /> },
  ];

  return (
    <AccountProvider>
      <AppBar position="fixed" sx={{ backgroundColor: '#2F2F2F' }}>
        <Toolbar>
          <Button>
            <DashboardIcon onClick={isDashboardView} sx={{ color: 'white' }} />
          </Button>
          <Button>
            <ShowChartIcon sx={{ color: 'white' }} />
          </Button>
          <Button>
            <TextSnippetIcon sx={{ color: 'white' }} />
          </Button>

          <Box sx={{ flexGrow: 1 }} />
          <Button onClick={handleAccountMenuClick}>
            <AccountCircleIcon sx={{ color: 'white' }} />
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleAccountMenuClose}
          >
            <MenuItem onClick={isAccountSettingsView}>Account Settings</MenuItem>
            <MenuItem onClick={handleLogout} color='error'>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Container maxWidth={false} sx={{ height: '100vh', padding: 0, margin: 0, mt: 8, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Grid container>
          <Grid xs={4} sx={{ backgroundColor: '#2F2F2F', mt: -9 }}>
            <AccountNames />
          </Grid>
          <Grid xs={8} sx={{ backgroundColor: '#2F2F2F', mt: -9 }}>
            <WeeklyDataGrid
                setWeeklyTotals={setWeeklyTotals}
                weeklyTotals={weeklyTotals}
                monthlyTotals={monthlyTotals}
                setMonthlyTotals={setMonthlyTotals}
                selectedMonth={selectedMonth}
                handleMonthChange={handleMonthChange}
                setDailyData={setDailyData}
            />            
          </Grid>
          <Grid xs={4} sx={{ backgroundColor: '#2F2F2F', mt: -5 }}>
            <BalanceAndProjections />
          </Grid>
          <Grid xs={8} sx={{ backgroundColor: '#2F2F2F', mb: 8, mt: 2 }}>
            <MonthlyDataGrid monthlyTotals={monthlyTotals} setMonthlyTotals={setMonthlyTotals} />
          </Grid>

          <Box sx={{ width: '100%', boxShadow: '0px 0px 20px #1e1e1e', borderRadius: 3, mt: -7, pb: 5 }}>
            <Grid container>
              <Grid xs={4} sx={{ backgroundColor: '#2F2F2F' }}>
                <TradePercentage/>
              </Grid>
              <Grid xs={4} sx={{ backgroundColor: '#2F2F2F' }}>
                <MonthlyPnLChart weeklyTotals={weeklyTotals} />
              </Grid>
              <Grid xs={4} sx={{ backgroundColor: '#2F2F2F' }}>
                <AccountsTimeline dailyData={dailyData} />
              </Grid>
            </Grid>
          </Box>

        </Grid>
      </Container>
    </AccountProvider>
  );
};

export default MainLayout;
