import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import styled from 'styled-components';
import { ReactComponent as TemperatureIcon } from '../../assets/images/main/temperature.svg';
import { ReactComponent as BlowingIcon } from '../../assets/images/main/blowing.svg';
import { ReactComponent as ExtrusionIcon } from '../../assets/images/main/extrusion.svg';
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
  blow: number;
  extrusion: number;
  onClick?: () => void;
}

export const Extruder = (props: Props) => {
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
    <GradientBox width='300px' height='566px' active={props.active}>
      <StyledBox color={props.active ? '#F1F1F1' : '#666667'} onClick={props.onClick}>
        <StyledTitleBox>
          <Typography fontWeight={800} fontSize={18} ml={3} mt={2}>
            {props.title}
          </Typography>
          <Typography variant='caption' mr={2} mt={1} textTransform='uppercase' fontWeight='bold'>
            {props.active ? 'on' : 'off'}
          </Typography>
        </StyledTitleBox>
        <StyledBoxTemperature>
          <Fraction
            icon={<TemperatureIcon />}
            toptext={`${t('main.temperature.current')} \u00B0С`}
            bottomtext={`${t('main.temperature.active')}  \u00B0С`}
            width='97px'
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
            lineweight='4px'
            linecolor={props.active ? temperatureColor : '#666667'}
          />
        </StyledBoxTemperature>
        <StyledBoxParams>
          <BlowingIcon />
          <Box>
            <Typography sx={{ fontSize: '36px', lineHeight: '38px', fontWeight: 'bold' }}>
              {props.blow}%
            </Typography>
            <Typography variant='caption'>{t('main.blowing')}</Typography>
          </Box>
        </StyledBoxParams>
        <StyledBoxParams>
          <ExtrusionIcon />
          <Box>
            <Typography sx={{ fontSize: '36px', lineHeight: '38px', fontWeight: 'bold' }}>
              {props.extrusion}%
            </Typography>
            <Typography variant='caption'>{t('main.extrusion')}</Typography>
          </Box>
        </StyledBoxParams>
      </StyledBox>
    </GradientBox>
  );
};

const StyledBox = styled(Box)<{ color: string }>`
  cursor: pointer;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  color: ${props => props.color};

  & svg {
    fill: ${props => props.color};
  }
`;

const StyledTitleBox = styled(Box)`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: 0px;
`;
const StyledBoxTemperature = styled(Box)`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  font-weight: bold;
  font-size: 36px;
  line-height: 44px;
  margin-top: 27px;
  margin-bottom: 46px;
  margin-left: -25px;
`;
const StyledBoxParams = styled(Box)`
  margin-top: 10px;
  display: flex;
  align-items: center;
  width: 146px;
  justify-content: flex-start;
  margin: 0 auto 20px;
  & > .MuiBox-root {
    margin-left: 10px;
  }
  & > svg {
    margin-right: 11px;
  }
`;
