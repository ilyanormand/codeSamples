import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import styled from 'styled-components';
import { ReactComponent as TemperatureIcon } from '../../assets/images/main/temperature.svg';
import { ReactComponent as UpIcon } from '../../assets/images/main/up.svg';
import { ReactComponent as DownIcon } from '../../assets/images/main/down.svg';
import { Fraction } from '../../components/UI/Fraction';
import { GradientBox } from '../../components/UI/GradientBox';
import { useTranslation } from 'react-i18next';

interface Props {
  title: string;
  active: boolean;
  numerator: number;
  denominator: number;
  onClick?: () => void;
}

export const Device = (props: Props) => {
  const [temperatureColor, setTemperatureColor] = useState('#f1f1f1');
  const [arrowIcon, setArrowIcon] = useState<React.ReactNode | null>(null);
  const [numerator, setNumerator] = useState(0);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (props.numerator > numerator) {
      setTemperatureColor('#CE1833');
      setArrowIcon(<UpIcon />);
    } else if (props.numerator < numerator) {
      setTemperatureColor('#0075FF');
      setArrowIcon(<DownIcon />);
    } else {
      setTemperatureColor('#f1f1f1');
      setArrowIcon(null);
    }

    setNumerator(props.numerator);
  }, [props.numerator]);

  return (
    <GradientBox width='278px' height='166px' active={props.active}>
      <StyledBox color={props.active ? '#F1F1F1' : '#666667'} onClick={props.onClick}>
        <StyledTitleBox>
          <Typography fontWeight={800} fontSize={18} ml={0} mt={1} color='#666667'>
            {props.title}
          </Typography>

          <Typography variant='h6' m='auto' mt={2} textTransform='uppercase' fontWeight='bold'>
            {props.active ? 'on' : 'off'}
          </Typography>
        </StyledTitleBox>

        <StyledBoxTemperature>
          <Fraction
            toptext={`${t('main.temperature.current')} \u00B0С`}
            bottomtext={`${t('main.temperature.active')}  \u00B0С`}
            width='80px'
            numerator={
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-evenly'
                }}>
                {numerator}
                {arrowIcon && props.active && arrowIcon}
              </Box>
            }
            denominator={props.denominator}
            lineweight='2px'
            linecolor={props.active ? temperatureColor : '#666667'}
          />
        </StyledBoxTemperature>
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
  justify-content: space-around;
  color: ${props => props.color};

  & svg {
    fill: ${props => props.color};
  }
`;

const StyledTitleBox = styled(Box)`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin-top: 0px;
  flex-direction: column;
`;
const StyledBoxTemperature = styled(Box)`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  font-weight: bold;
  font-size: 30px;
  line-height: 32px;
  margin-top: 4px;
`;
