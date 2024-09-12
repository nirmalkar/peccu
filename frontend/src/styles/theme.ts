import { createTheme, ThemeOptions } from '@mui/material/styles';

const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#0052CC', // Bright Blue
    },
    secondary: {
      main: '#FF8C00', // Amber
    },
    background: {
      default: '#F4F5F7', // Light Grey
      paper: '#FFFFFF', // White
    },
    text: {
      primary: '#1E1E1E', // Very Dark Grey
      secondary: '#5E6C84', // Muted Grey
    },
    divider: '#EBECF0',
  },
};

const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#4C9AFF', // Soft Blue
    },
    secondary: {
      main: '#FFA500', // Amber
    },
    background: {
      default: '#1E1E1E', // Dark Grey
      paper: '#2E2E2E', // Slightly lighter grey
    },
    text: {
      primary: '#E5E5E5', // Light Grey
      secondary: '#B0BEC5', // Muted Grey
    },
    divider: '#484848',
  },
};

export const lightTheme = createTheme(lightThemeOptions);
export const darkTheme = createTheme(darkThemeOptions);
