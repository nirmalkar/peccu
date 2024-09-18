'use client';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Skeleton,
  ThemeProvider,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Header from '@/components/Common/Header';
import TextPaper from '@/components/Specific/Paper';
import ReadContent from '@/components/Specific/ReadContent';
import AudioRecorder from '@/components/Specific/Recorder';
import withRedux from '@/hoc/withRedux';
import { uploadAudio } from '@/services/apiService';
import { getPassages } from '@/store/slices/passageSlice';
import {
  fetchFeedBackFailure,
  fetchFeedbackStart,
  fetchFeedbackSuccess,
} from '@/store/slices/pronunciationSlice';
import { AppDispatch, RootState } from '@/store/store';
import { lightTheme, darkTheme } from '@/styles/theme';

function Passage() {
  const dispatch: AppDispatch = useDispatch();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const { passages, loading, error } = useSelector(
    (state: RootState) => state.passages
  );
  const passage = passages?.find((passage) => passage.id === 1);
  const sendAudio = async (file: Blob) => {
    dispatch(fetchFeedbackStart());
    try {
      const feedback = await uploadAudio(1, file);
      dispatch(fetchFeedbackSuccess(feedback));
    } catch (error: any) {
      dispatch(fetchFeedBackFailure(error.message));
    }
  };
  useEffect(() => {
    if (!passage?.length) {
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
        {passage && (
          <Container sx={{ color: 'text.primary' }} maxWidth="md">
            <ReadContent
              {...{ title: passage.title, content: passage.content }}
            />
            <Grid
              sx={{ margin: 'auto', display: 'flex', justifyContent: 'center' }}
              size={8}
            >
              <AudioRecorder getAudioURL={sendAudio} />
            </Grid>
          </Container>
        )}
      </Box>
    </ThemeProvider>
  );
}
export default withRedux(Passage);
