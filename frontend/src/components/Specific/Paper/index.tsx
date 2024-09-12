import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import * as React from 'react';

const StyledPaper = styled(Paper)(({ theme }) => ({
  minHeight: 400,
  minWidth: 600,
  maxHeight: 600,
  maxWidth: 600,
  overflow: 'auto',
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: 'center',
  fontSize: 18,
}));
type TextPaperPropsType = {
  children?: React.ReactNode;
};

export default function TextPaper({ children }: TextPaperPropsType) {
  return (
    <Stack direction="row" spacing={2}>
      <StyledPaper square={false}>{children}</StyledPaper>
    </Stack>
  );
}
