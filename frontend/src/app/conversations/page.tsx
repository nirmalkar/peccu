'use client';
import { Box, ThemeProvider, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

import Header from '@/components/Common/Header';
import withRedux from '@/hoc/withRedux';
import { RootState } from '@/store/store';
import { darkTheme, lightTheme } from '@/styles/theme';

const Conversations = () => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          bgcolor: 'background.paper',
        }}
      >
        <Header />
        <Typography
          variant="h1"
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: '60vh',
            justifyContent: 'center',
            color: 'text.primary',
          }}
        >
          Conversations Page
        </Typography>
      </Box>
    </ThemeProvider>
  );
};

export default withRedux(Conversations);
