"use client";
import * as React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { useAccountContext } from '../components/accountsContext';

const BalanceAndProjections: React.FC = () => {
  const { liquidity } = useAccountContext();

  return (
    <Container>
      <Grid container sx={{ mt: 8 }}>
        <Grid item xs={6} sx={{ mb: 5, fontSize: 'small' }}>
          Total Profits
        </Grid>
        <Grid item xs={6} sx={{ fontSize: 'small' }}>
          {liquidity}
        </Grid>
        <Grid item xs={6} sx={{ mb: 5, fontSize: 'small' }}>
          Liquidity
        </Grid>
        <Grid item xs={6} sx={{ fontSize: 'small' }}>
          {liquidity}
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={6} sx={{ mb: 5, fontSize: 'small' }}>
          Profit Goal
        </Grid>
        <Grid item xs={6} sx={{ fontSize: 'small' }}>
          based on account input
        </Grid>
        <Grid item xs={6} sx={{ mb: 5, fontSize: 'small' }}>
          30% Profit Rule
        </Grid>
        <Grid item xs={6} sx={{ fontSize: 'small' }}>
          based on starting capital input
        </Grid>
      </Grid>
    </Container>
  );
};

export default BalanceAndProjections;
