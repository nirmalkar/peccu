'use client';
import { Box, ThemeProvider, Typography } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Header from '@/components/Common/Header';
import withRedux from '@/hoc/withRedux';
import { uploadAudio } from '@/services/apiService';
import {
  fetchFeedBackFailure,
  fetchFeedbackStart,
  fetchFeedbackSuccess,
} from '@/store/slices/pronunciationSlice';
import { RootState } from '@/store/store';

import { lightTheme, darkTheme } from '../styles/theme';

function Home() {
  const dispatch = useDispatch();
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
            justifyContent: 'center',
            alignItems: 'center',
            height: '60vh',
            color: 'text.primary',
          }}
        >
          Home Page
        </Typography>
      </Box>
    </ThemeProvider>
  );
}
export default withRedux(Home);
