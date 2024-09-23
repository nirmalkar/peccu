'use client';
import { Box, ThemeProvider } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

import Header from '@/components/Common/Header';
// import TreeView from '@/components/Common/TreeView';
import withRedux from '@/hoc/withRedux';
import { RootState } from '@/store/store';

import { lightTheme, darkTheme } from '../../styles/theme';

function Learn() {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <Box
        sx={{ bgcolor: 'background.paper', width: '100vw', height: '100vh' }}
      >
        <Header />
        <Box width="100%" maxWidth={800}>
          {/* <TreeView /> */}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default withRedux(Learn);
