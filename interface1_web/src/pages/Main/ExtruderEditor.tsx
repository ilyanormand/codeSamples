import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Actions as PrinterActions } from '../../store/reducers/PrinterSlice';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import { Extruder } from './Extruder';
import { CustomSlider } from '../../components/UI/CustomSlider';
import { EditorBox } from '../../components/UI/EditorBox';

interface Props {
  title: string;
  exit: () => void;
}

export const ExtruderEditor = (props: Props) => {
  const { title, exit } = props;
  const { t, i18n } = useTranslation();
  const printerState = useAppSelector(state => state.printerReducer);
  const dispatch = useAppDispatch();

  if (title === 'leftEctruder') {
    return (
      <EditorBox exit={exit}>
        <Extruder
          title={t('main.extruder.left')}
          active={printerState.leftEctruderStatus}
          numerator={printerState.leftEctruderCurrentT}
          denominator={printerState.leftEctruderActiveT}
          blow={printerState.leftEctruderBlowing}
          extrusion={printerState.leftEctruderExtrusion}
          onClick={() =>{
            dispatch(
              PrinterActions.changeStatusByName({
                key: 'leftEctruderStatus',
                value: !printerState.leftEctruderStatus
              })
            )
          }}
        />
        <SliderBox>
          <CustomSlider
            min={0}
            max={550}
            step={25}
            title={t('main.sliderTemperature')}
            value={printerState.leftEctruderActiveT}
            onChange={(value: number) =>
              dispatch(
                PrinterActions.changeValueByName({ key: 'leftEctruderActiveT', value: value })
              )
            }></CustomSlider>
          <CustomSlider
            min={0}
            max={100}
            step={5}
            title={t('main.blowing')}
            value={printerState.leftEctruderBlowing}
            onChange={(value: number) =>
              dispatch(
                PrinterActions.changeValueByName({ key: 'leftEctruderBlowing', value: value })
              )
            }></CustomSlider>
          <CustomSlider
            min={0}
            max={150}
            step={5}
            title={t('main.extrusion')}
            value={printerState.leftEctruderExtrusion}
            onChange={(value: number) =>
              dispatch(
                PrinterActions.changeValueByName({ key: 'leftEctruderExtrusion', value: value })
              )
            }></CustomSlider>
        </SliderBox>
      </EditorBox>
    );
  }

  if (title === 'rightEctruder') {
    return (
      <EditorBox exit={exit}>
        <Extruder
          title={t('main.extruder.right')}
          active={printerState.rightEctruderStatus}
          numerator={printerState.rightEctruderCurrentT}
          denominator={printerState.rightEctruderActiveT}
          blow={printerState.rightEctruderBlowing}
          extrusion={printerState.rightEctruderExtrusion}
          onClick={() =>{
            dispatch(
              PrinterActions.changeStatusByName({
                key: 'rightEctruderStatus',
                value: !printerState.rightEctruderStatus
              })
            )
          }}
        />
        <SliderBox>
          <CustomSlider
            min={0}
            max={550}
            step={25}
            title={t('main.sliderTemperature')}
            value={printerState.rightEctruderActiveT}
            onChange={(value: number) =>
              dispatch(
                PrinterActions.changeValueByName({ key: 'rightEctruderActiveT', value: value })
              )
            }></CustomSlider>
          <CustomSlider
            min={0}
            max={100}
            step={5}
            title={t('main.blowing')}
            value={printerState.rightEctruderBlowing}
            onChange={(value: number) =>
              dispatch(
                PrinterActions.changeValueByName({ key: 'rightEctruderBlowing', value: value })
              )
            }></CustomSlider>
          <CustomSlider
            min={0}
            max={150}
            step={5}
            title={t('main.extrusion')}
            value={printerState.rightEctruderExtrusion}
            onChange={(value: number) =>
              dispatch(
                PrinterActions.changeValueByName({ key: 'rightEctruderExtrusion', value: value })
              )
            }></CustomSlider>
        </SliderBox>
      </EditorBox>
    );
  }

  return <h1>sadf</h1>;
};

const SliderBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
`;
