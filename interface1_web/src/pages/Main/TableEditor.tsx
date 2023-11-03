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

export const TableEditor = (props: Props) => {
  const { t, i18n } = useTranslation();
  const printerState = useAppSelector(state => state.printerReducer);
  const dispatch = useAppDispatch();

  return (
    <EditorBox exit={props.exit}>
      <Device
        title={t('main.table')}
        active={printerState.tableEctruderStatus}
        numerator={printerState.tableEctruderCurrentT}
        denominator={printerState.tableEctruderActiveT}
        onClick={() =>{
          dispatch(
            PrinterActions.changeStatusByName({
              key: 'tableEctruderStatus',
              value: !printerState.tableEctruderStatus
            })
          )
        }}
      />
      <CustomSlider
        min={0}
        max={120}
        step={5}
        title={t('main.sliderTemperature')}
        value={printerState.tableEctruderActiveT}
        onChange={(value: number) =>
          dispatch(PrinterActions.changeValueByName({ key: 'tableEctruderActiveT', value: value }))
        }></CustomSlider>
    </EditorBox>
  );
};
