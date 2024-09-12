import { styled, Tooltip } from '@mui/material';
import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { feedBackReset } from '@/store/slices/pronunciationSlice';

import CircularMicButton from './CircularMicButton';

interface AudioRecorderPropsType {
  getAudioURL: (audioBlob: Blob) => void;
}

const MicButtonWrapper = styled('div')(() => ({
  width: '90px',
}));
const AudioRecorder = ({ getAudioURL }: AudioRecorderPropsType) => {
  const dispatch = useDispatch();
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = () => {
    const audio = new Audio('../../../public/audio/start.mp3');
    audio.play();
    dispatch(feedBackReset());
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          const mediaRecorder = new MediaRecorder(stream);
          mediaRecorderRef.current = mediaRecorder;
          setIsRecording(true);

          mediaRecorder.ondataavailable = (event) => {
            audioChunksRef.current.push(event.data);
          };

          mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunksRef.current, {
              type: 'audio/wav',
            });
            setAudioBlob(audioBlob);
            getAudioURL(audioBlob);
            setAudioURL(URL.createObjectURL(audioBlob));
            audioChunksRef.current = [];
          };

          mediaRecorder.start();
        })
        .catch((err) => {
          console.log('Error accessing the microphone', err);
        });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      const audio = new Audio('../../../public/audio/stop.mp3');
      audio.play();
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <Tooltip
      sx={{ margin: '10px' }}
      title={isRecording ? 'Recording' : 'Start Recording'}
    >
      <MicButtonWrapper
        typeof="button"
        onClick={isRecording ? stopRecording : startRecording}
      >
        <CircularMicButton isRecording={isRecording} />
      </MicButtonWrapper>
    </Tooltip>
  );
};

export default AudioRecorder;
