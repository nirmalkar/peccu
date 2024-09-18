import { Box, Typography, ThemeProvider } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '@/store/store';

import { lightTheme, darkTheme } from '../../../styles/theme';

type ReadContentPropsType = {
  title: string;
  content: string;
};

function ReadContent({ title, content }: ReadContentPropsType) {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <Box p={4}>
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1">{content}</Typography>

        <Grid container spacing={2} alignItems="center">
          <Grid size={6}></Grid>
          <Grid size={6}>{/* Controls */}</Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default ReadContent;
