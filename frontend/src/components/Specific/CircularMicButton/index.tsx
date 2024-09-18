import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import { Button, styled } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React from 'react';

type CircularMicButtonPropsType = {
  size?: number;
  isRecording?: boolean;
};

const WaveDiv = styled('div')<{
  size: number;
  backgroundColor: string;
  animationDuration: string;
}>(({ size, backgroundColor, animationDuration }) => ({
  height: `${size}px`,
  width: `${size}px`,
  position: 'relative',
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '50%',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    backgroundColor: backgroundColor,
    animation: `waveAnimation ${animationDuration} ease-in-out infinite`,
  },
  '@keyframes waveAnimation': {
    '0%': {
      transform: 'scale(0.8)',
      opacity: 0.8,
    },
    '50%': {
      transform: 'scale(1.5)',
      opacity: 0.5,
    },
    '100%': {
      transform: 'scale(0.8)',
      opacity: 0.8,
    },
  },
}));

const CircularButton = styled(Button)<{
  backgroundColor?: string;
  size?: number;
}>(({ backgroundColor }) => ({
  borderRadius: '50%',
  minWidth: 70,
  minHeight: 70,
  padding: 0,
  backgroundColor: backgroundColor,
}));

const CircularMicButton = ({ isRecording }: CircularMicButtonPropsType) => {
  const theme = useTheme();

  return (
    <CircularButton backgroundColor={theme.palette.secondary.light}>
      {isRecording ? (
        <WaveDiv size={60} backgroundColor="#fafafa" animationDuration="2s">
          <WaveDiv size={50} backgroundColor="#eaeaea" animationDuration="2.2s">
            <WaveDiv
              size={40}
              backgroundColor="#eaeaea"
              animationDuration="2.4s"
            >
              <MicOffIcon sx={{ zIndex: 1 }} />
            </WaveDiv>
          </WaveDiv>
        </WaveDiv>
      ) : (
        <MicIcon />
      )}
    </CircularButton>
  );
};

export default CircularMicButton;
