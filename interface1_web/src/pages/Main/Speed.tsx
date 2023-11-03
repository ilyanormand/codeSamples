import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import styled from 'styled-components';
import { ReactComponent as SpeedIcon } from '../../assets/images/main/speed.svg';
import { Fraction } from '../../components/UI/Fraction';
import { GradientBox } from '../../components/UI/GradientBox';
import { useTranslation } from 'react-i18next';

interface Props {
  title: string;
  active: boolean;
  speed: number;
  onClick?: () => void;
}

export const Speed = (props: Props) => {
  const { t, i18n } = useTranslation();
  return (
    <GradientBox width='425px' height='148px' active={props.active}>
      <StyledBox color={props.active ? '#F1F1F1' : '#666667'} onClick={props.onClick}>
        <StyledTitleBox>
          <Typography fontWeight={800} fontSize={18} ml={2} mt={1} color='#666667'>
            {props.title}
          </Typography>
        </StyledTitleBox>

        <StyledSpeedBox>
          <SpeedIcon />
          <Typography fontWeight={800} fontSize={30} ml={3}>
            {props.speed}%
          </Typography>
          <Typography variant='caption' ml={1} color='#666667' lineHeight={'12px'} width={76}>
            {t('main.printSpeed')}
          </Typography>
        </StyledSpeedBox>
      </StyledBox>
    </GradientBox>
  );
};

const StyledBox = styled(Box)<{ color: string }>`
  cursor: pointer;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start;
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
const StyledSpeedBox = styled(Box)`
  display: flex;
  align-items: center;
  margin: 18px auto 0;
  height: 30px;
`;
