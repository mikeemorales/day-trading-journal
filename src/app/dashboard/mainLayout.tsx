"use client";
import { AppBar, Box, Button, Container, Grid, Toolbar, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import WeeklyDataGrid from './weeklyDataGrid';
import AccountNames from './accounts';
import { AccountProvider } from '../components/accountsContext';
import { InputValuesProvider } from '../components/weeklyDataGridInputContext'
import MonthlyPnLChart from './monthlyPnLChart';
import BalanceAndProjections from './balanceAndProjections';
import MonthlyDataGrid from './monthlyDataGrid';
import AccountsTimeline from './accountsTimeline';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import { SelectChangeEvent } from '@mui/material/Select';
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import TradePercentage from './tradePercentage';
import BoxLiquidity from './boxLiquidity';
import BoxDailyPnL from './boxDailyPnL';
import BoxWinLossRatio from './boxWinLossRatio';

const MainLayout: React.FC = () => {
  const [weeklyTotals, setWeeklyTotals] = useState<number[]>([0, 0, 0, 0, 0]);
  const [monthlyTotals, setMonthlyTotals] = useState<number[]>(Array(12).fill(0));
  const [selectedMonth, setSelectedMonth] = useState<number>(0);
  const [dailyData, setDailyData] = useState<number[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [dailyPnL, setDailyPnL] = useState<number | null>(null);

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


  return (
    <InputValuesProvider>
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
      <Container maxWidth={false} sx={{ height: '100%', padding: 0, margin: 0, mt: 8, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Grid container>
          <Grid xs={3} sx={{  mt: 5 }}>
            <BoxLiquidity/>
          </Grid>
          <Grid xs={3} sx={{ mt: 5 }}>
          <BoxDailyPnL dailyPnL={dailyPnL} />
          </Grid>
          <Grid xs={3} sx={{ mt: 5, mb: 5 }}>
          <BoxLiquidity/>
          </Grid>
          <Grid xs={3} sx={{ mt: 5, mb: 5 }}>
          <BoxLiquidity/>
          </Grid>

          <Grid xs={4} sx={{ backgroundColor: '#2F2F2F' }}>
            <AccountNames />
          </Grid>
          <Grid xs={8} sx={{ backgroundColor: '#2F2F2F' }}>
            <WeeklyDataGrid
                setWeeklyTotals={setWeeklyTotals}
                weeklyTotals={weeklyTotals}
                monthlyTotals={monthlyTotals}
                setMonthlyTotals={setMonthlyTotals}
                selectedMonth={selectedMonth}
                handleMonthChange={handleMonthChange}
                setDailyData={setDailyData}
                setDailyPnLValue={setDailyPnL}
            />            
          </Grid>
          <Grid xs={4} sx={{ backgroundColor: '#2F2F2F', mt: -5 }}>
            <BalanceAndProjections />
          </Grid>
          <Grid xs={8} sx={{ backgroundColor: '#2F2F2F', mb: 8, mt: 2 }}>
            <MonthlyDataGrid monthlyTotals={monthlyTotals} setMonthlyTotals={setMonthlyTotals} />
          </Grid>

          <Box sx={{ width: '100%', boxShadow: '0px 0px 10px #1e1e1e', borderRadius: 3, mt: -7, pb: 5, mb: 3 }}>
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
    </InputValuesProvider>
  );
};

export default MainLayout;
