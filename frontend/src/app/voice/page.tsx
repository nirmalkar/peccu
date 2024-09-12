'use client';
import { ThemeProvider } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

import Header from '@/components/Common/Header';
import withRedux from '@/hoc/withRedux';
import { RootState } from '@/store/store';
import { darkTheme, lightTheme } from '@/styles/theme';

const Voice = () => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <Header />
      Voice
    </ThemeProvider>
  );
};

export default withRedux(Voice);
