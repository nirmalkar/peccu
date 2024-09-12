'use client';
import { ThemeProvider } from '@mui/material';
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

import { lightTheme, darkTheme } from '../../styles/theme';

function Practice() {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
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
      <Header />
      <TextPaper>
        Once upon a time, in a cozy little village, there lived a small, curious
        kitten named Whiskers. Whiskers loved to explore everything around him.
        One sunny morning, he wandered into the tall grass near the river. The
        grass tickled his nose, and he could hear the sound of birds chirping in
        the distance. As he followed a butterfly, Whiskers suddenly heard a
        rustling sound. It was a tiny, brown mouse scurrying through the leaves.
        The mouse noticed Whiskers and froze for a moment, but instead of
        running away, it smiled. &quot;Hello,&quot; said the mouse. &quot;I’m
        Milo. Do you want to play?&quot; Whiskers was surprised but delighted.
        Together, they chased butterflies and splashed in the shallow water by
        the riverbank. By the time the sun began to set, they were both tired,
        but happy to have made a new friend. Whiskers realized that adventures
        were even better when shared, and he knew he would have many more
        exciting days with Milo by his side.
      </TextPaper>
      <AudioRecorder getAudioURL={sendAudio} />
    </ThemeProvider>
  );
}
export default withRedux(Practice);
