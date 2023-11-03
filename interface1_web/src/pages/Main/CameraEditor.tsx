import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Actions as PrinterActions } from '../../store/reducers/PrinterSlice';
import { useTranslation } from 'react-i18next';
import { CustomSlider } from '../../components/UI/CustomSlider';
import { EditorBox } from '../../components/UI/EditorBox';
import { Device } from './Device';

interface Props {
  exit: () => void;
}

export const CameraEditor = (props: Props) => {
  const { t, i18n } = useTranslation();
  const printerState = useAppSelector(state => state.printerReducer);
  const dispatch = useAppDispatch();

  return (
    <EditorBox exit={props.exit}>
      <Device
        title={t('main.camera')}
        active={printerState.cameraEctruderStatus}
        numerator={printerState.cameraEctruderCurrentT}
        denominator={printerState.cameraEctruderActiveT}
        onClick={() =>{
          dispatch(
            PrinterActions.changeStatusByName({
              key: 'cameraEctruderStatus',
              value: !printerState.cameraEctruderStatus
            })
          )
        }}
      />
      <CustomSlider
        title={t('main.sliderTemperature')}
        value={printerState.cameraEctruderActiveT}
        min={0}
        max={550}
        step={25}
        onChange={(value: number) =>
          dispatch(PrinterActions.changeValueByName({ key: 'cameraEctruderActiveT', value: value }))
        }></CustomSlider>
    </EditorBox>
  );
};
