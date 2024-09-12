import {
  AppBar,
  Box,
  Button,
  IconButton,
  Switch,
  Toolbar,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Link from 'next/link';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { toggleTheme } from '@/store/slices/themeSlice';
import { RootState } from '@/store/store';

const pages = [
  { name: 'Home', route: '/' },
  { name: 'Practice', route: '/practice' },
  { name: 'Conversations', route: 'conversations' },
  { name: 'Voice', route: '/voice' },
];

const Header = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  const mode = isDarkMode ? 'dark' : 'light';
  const backgroundColor = isDarkMode
    ? theme.palette.background.paper
    : theme.palette.background.paper;
  const color = isDarkMode
    ? theme.palette.text.primary
    : theme.palette.text.secondary;
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: backgroundColor,
        fontFamily: 'Roboto, sans-serif',
        fontWeight: 500,
      }}
      elevation={2}
    >
      <Toolbar>
        <IconButton size="large" edge="start" aria-label="menu" sx={{ mr: 2 }}>
          Peccu
        </IconButton>
        <Box
          sx={{
            flexGrow: 1,
            justifyContent: 'center',
            display: { xs: 'none', md: 'flex' },
          }}
        >
          {pages.map((page) => (
            <Link key={page.name} href={page.route}>
              <Button sx={{ color: color, mx: 2 }}>{page.name}</Button>
            </Link>
          ))}
        </Box>
        <Box>
          <Switch
            sx={{
              '& .MuiSwitch-switchBase': {
                color: isDarkMode
                  ? theme.palette.secondary.main
                  : theme.palette.primary.main,
              },
              '& .MuiSwitch-switchBase.Mui-checked': {
                color: isDarkMode
                  ? theme.palette.secondary.main
                  : theme.palette.secondary.main,
              },
              '& .MuiSwitch-track': {
                backgroundColor: isDarkMode
                  ? theme.palette.secondary.light
                  : theme.palette.secondary.light,
              },
            }}
            onChange={() => dispatch(toggleTheme())}
            checked={isDarkMode}
            defaultChecked
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
