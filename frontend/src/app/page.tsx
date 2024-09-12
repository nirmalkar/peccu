'use client';
import { Box, Grid, Grid2, Skeleton, ThemeProvider } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Header from '@/components/Common/Header';
import TextPaper from '@/components/Specific/Paper';
import AudioRecorder from '@/components/Specific/Recorder';
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
  const { loading, error, feedBack } = useSelector(
    (state: RootState) => state.pronunciation
  );
  const sendAudio = async (file: Blob) => {
    dispatch(fetchFeedbackStart());
    try {
      const feedback = await uploadAudio(1, file);
      dispatch(fetchFeedbackSuccess(feedback));
    } catch (error: any) {
      dispatch(fetchFeedBackFailure(error.message));
    }
  };
  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          borderRadius: 1,
          bgcolor: 'background.paper',
        }}
      >
        <Header />
        <Grid2
          sx={{
            display: 'flex',
            justifyContent: 'center',
            margin: '2rem',
          }}
        >
          <TextPaper>
            {loading && (
              <>
                <Skeleton animation="wave" />
                <Skeleton animation="wave" />
                <Skeleton animation="wave" />
                <Skeleton animation="wave" />
                <Skeleton animation="wave" />
                <Skeleton animation="wave" />
                <Skeleton animation="wave" />
                <Skeleton animation="wave" />
                <Skeleton animation="wave" />
                <Skeleton animation="wave" />
                <Skeleton animation="wave" />
                <Skeleton animation="wave" />
                <Skeleton animation="wave" />
                <Skeleton animation="wave" />
                <Skeleton animation="wave" />
              </>
            )}
            {feedBack?.feedback && <p>{feedBack.feedback}</p>}
          </TextPaper>
        </Grid2>
        <Grid2
          sx={{ margin: 'auto', display: 'flex', justifyContent: 'center' }}
          size={8}
        >
          <AudioRecorder getAudioURL={sendAudio} />
        </Grid2>
      </Box>
    </ThemeProvider>
  );
}
export default withRedux(Home);
