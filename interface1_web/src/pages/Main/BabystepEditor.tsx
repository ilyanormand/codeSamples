import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import styled from 'styled-components';
import { Actions as PrinterActions } from '../../store/reducers/PrinterSlice';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import { CustomSlider } from '../../components/UI/CustomSlider';
import { EditorBox } from '../../components/UI/EditorBox';
import { Icon } from '@iconify/react';
import { Button } from '@mui/material';
import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';

interface Props {
  exit: () => void;
}

export const BabystepEditor = (props: Props) => {
  const { t, i18n } = useTranslation();
  const printerState = useAppSelector(state => state.printerReducer);
  const dispatch = useAppDispatch();
  const step = 0.05;

  return (
    <EditorBox exit={props.exit}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '80%',
          margin: '0 auto'
        }}>
        <Typography variant='h5' component='h2'>
          {t('main.babystep')}
        </Typography>
        <Stack direction='column' justifyContent='center' spacing={2} alignItems='center'>
          <Typography variant='h1' color='#f1f1f1' component='h2'>
            Z
          </Typography>
          <Typography variant='h1' component='h2' color='#f1f1f1'>
            {printerState.babystep} мм
          </Typography>
        </Stack>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column'
          }}>
          <StyledButton
            variant='outlined'
            onClick={() => {
              dispatch(
                PrinterActions.changeValueByName({
                  key: 'babystep',
                  value: parseFloat((printerState.babystep + step).toFixed(10))
                })
              );
            }}>
            <Icon icon='lucide:chevrons-up' color='#f1f1f1' width='80' />
          </StyledButton>
          <StyledButton
            variant='outlined'
            onClick={() => {
              dispatch(
                PrinterActions.changeValueByName({
                  key: 'babystep',
                  value: parseFloat((printerState.babystep - step).toFixed(10))
                })
              );
            }}>
            <Icon icon='lucide:chevrons-down' color='#f1f1f1' width='80' />
          </StyledButton>
        </Box>
      </Box>
    </EditorBox>
  );
};

const StyledButton = styled(Button)`
  &.MuiButton-root {
    border: 2px solid #2d2c2c;
    border-radius: 20px;
    width: 200px;
    height: 250px;
    margin: 10px;
  }
`;
