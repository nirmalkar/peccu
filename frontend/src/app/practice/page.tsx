'use client';
import { Box, Skeleton, ThemeProvider } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import OutlinedCard from '@/components/Common/Card';
import Header from '@/components/Common/Header';
import withRedux from '@/hoc/withRedux';
import { getPassages } from '@/store/slices/passageSlice';
import { AppDispatch, RootState } from '@/store/store';

import { lightTheme, darkTheme } from '../../styles/theme';

const customCardStyles = {
  cardContainer: {
    borderRadius: '4px',
    cursor: 'pointer',
  },
  title: {
    color: 'palette.text.primary',
  },
};

function Practice() {
  const dispatch: AppDispatch = useDispatch();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const { passages, loading, error } = useSelector(
    (state: RootState) => state.passages
  );
  useEffect(() => {
    if (!passages?.length) {
      dispatch(getPassages());
    }

    return () => {};
  }, [dispatch]);
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
        <Grid
          size={{ xs: 12, sm: 12, md: 10, lg: 8 }}
          p={2}
          margin={'auto'}
          container
          spacing={2}
        >
          {loading &&
            Array.from({ length: 4 }).map((_, index) => (
              <Grid
                key={index}
                container
                size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
              >
                <Box>
                  <Skeleton variant="rectangular" width={210} height={118} />
                  <Skeleton />
                  <Skeleton width="60%" />
                </Box>
              </Grid>
            ))}

          {passages?.map((passage) => {
            const {
              id,
              title,
              content,
              length,
              difficulty,
              feedback_required,
            } = passage;
            return (
              <Grid key={passage.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <OutlinedCard
                  linkHref={`/practice/passage/${id}`}
                  title={title}
                  customStyles={customCardStyles}
                  loading={loading}
                  content={content}
                />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default withRedux(Practice);
