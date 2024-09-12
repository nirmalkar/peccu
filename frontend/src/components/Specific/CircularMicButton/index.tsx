import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import { Button, styled } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React from 'react';

type CircularMicButtonPropsType = {
  size?: number;
  isRecording?: boolean;
};

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

const WaveDiv = styled('div')(() => ({
  height: '50px',
  width: '50px',
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
    backgroundColor: '#fafafa',
    animation: 'ripple 1.5s ease-out infinite',
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(0.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.5)',
      opacity: 0,
    },
  },
}));

const CircularMicButton = ({ isRecording }: CircularMicButtonPropsType) => {
  const theme = useTheme();
  return (
    <CircularButton backgroundColor={theme.palette.secondary.light}>
      {isRecording ? (
        <WaveDiv>
          <MicOffIcon sx={{ zIndex: 1 }} />
        </WaveDiv>
      ) : (
        <MicIcon />
      )}
    </CircularButton>
  );
};
export default CircularMicButton;
