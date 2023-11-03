import React from 'react';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

interface Props {
  numerator: number | React.ReactElement;
  denominator: number;
  linecolor?: string;
  lineweight?: string;
  width?: string;
  toptext?: string;
  bottomtext?: string;
  icon?: React.ReactElement;
}

export const Fraction = (props: Props) => {
  const { toptext, bottomtext, numerator, denominator, icon } = props;
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
      {icon && icon}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
        {toptext && <Typography variant='caption'>{toptext}</Typography>}
        <FracBox {...props}>
          <span>{numerator}</span>
          <span>{denominator}</span>
        </FracBox>
        {bottomtext && <Typography variant='caption'>{bottomtext}</Typography>}
      </Box>
    </Box>
  );
};

const FracBox = styled(Box)<Props>`
  &.MuiBox-root {
    width: ${props => props.width || '60px'};
    display: inline-block;
    position: relative;
    vertical-align: middle;
    letter-spacing: 0.001em;
    text-align: center;
    & > span {
      display: block;
      padding: 0.1em;
    }
    & span:nth-child(2) {
      border-top: ${props => props.lineweight || '1px'} solid
        ${props => props.linecolor || '#666667'};
    }
  }
`;
