import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import styled from 'styled-components';
import { ReactComponent as SpeedIcon } from '../../assets/images/main/speed.svg';
import { Fraction } from '../../components/UI/Fraction';
import { GradientBox } from '../../components/UI/GradientBox';

interface Props {
  title: string;
  active: boolean;
  text: string;
  onClick: () => void;
}

export const State = (props: Props) => {
  return (
    <GradientBox width='115px' height='165px' active={props.active}>
      <StyledBox color={props.active ? '#F1F1F1' : '#666667'} onClick={props.onClick}>
        <StyledTitleBox>
          <Typography fontWeight={800} fontSize={13} color='#666667' mt={1}>
            {props.title}
          </Typography>
        </StyledTitleBox>

        <Box sx={{ margin: '25px auto 0', fontWeight: 'bold' }}>{props.text}</Box>
      </StyledBox>
    </GradientBox>
  );
};

const StyledBox = styled(Box)<{ color: string }>`
  cursor: pointer;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: ${props => props.color};

  & svg {
    fill: ${props => props.color};
  }
`;

const StyledTitleBox = styled(Box)`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
`;
