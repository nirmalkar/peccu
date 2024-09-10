'use client';
import React from 'react';
import { useDispatch } from 'react-redux';

import AudioRecorder from '@/components/Specific/Recorder';
import withRedux from '@/hoc/withRedux';
import { uploadAudio } from '@/services/apiService';
import {
  fetchFeedBackFailure,
  fetchFeedbackStart,
  fetchFeedbackSuccess,
} from '@/store/slices/pronunciationSlice';

function Home() {
  const dispatch = useDispatch();
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
    <div>
      Peccu app!
      <section>
        <AudioRecorder getAudioURL={sendAudio} />
      </section>
    </div>
  );
}
export default withRedux(Home);
