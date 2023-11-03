import * as React from 'react';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import Box from '@mui/material/Box';

export const LinearProgressWithLabel = (props: LinearProgressProps & { value: number }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
      <Box sx={{ width: '120px', textAlign: 'right', marginRight: '20px' }}>
        <StyledTypography variant='h2'>{`${Math.round(props.value)}`}</StyledTypography>
      </Box>
      <Box sx={{ mr: 1, marginBottom: '16px' }}>
        <StyledLinearProgress variant='determinate' {...props} />
      </Box>
    </Box>
  );
};

const StyledTypography = styled(Typography)`
  &.MuiTypography-root {
    font-weight: 800;
    font-size: 58px;
    line-height: 71px;
    color: #f1f1f1;
    position: relative;
    &:after {
      content: '%';
      position: absolute;
      font-size: 20px;
      line-height: 22px;
      right: 0;
      top: 0;
      margin-right: -20px;
      font-weight: 500;
      margin-top: 7px;
    }
  }
`;

const StyledLinearProgress = styled(LinearProgress)`
  &.MuiLinearProgress-root {
    width: 556px;
    height: 12px;
    border-radius: 6px;
    background-color: #414141;
    border-left: 3px solid #414141;
    border-right: 3px solid #414141;
    & .MuiLinearProgress-bar {
      height: 4px;
      background: #eaf8ff;
      box-shadow: 0px 0px 21.8736px #0062ff, 0px 0px 12.4992px #0062ff, 0px 0px 7.2912px #0062ff,
        0px 0px 3.6456px #eaf8ff, 0px 0px 1.0416px #eaf8ff, 0px 0px 0.5208px #eaf8ff;
      border-radius: 6px;
      margin: auto;
    }
  }
`;
