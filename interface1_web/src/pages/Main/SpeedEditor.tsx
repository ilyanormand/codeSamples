import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Actions as PrinterActions } from '../../store/reducers/PrinterSlice';
import { useTranslation } from 'react-i18next';
import { CustomSlider } from '../../components/UI/CustomSlider';
import { EditorBox } from '../../components/UI/EditorBox';
import { Speed } from './Speed';

interface Props {
  exit: () => void;
}

export const SpeedEditor = (props: Props) => {
  const { t, i18n } = useTranslation();
  const printerState = useAppSelector(state => state.printerReducer);
  const dispatch = useAppDispatch();

  return (
    <EditorBox exit={props.exit}>
      <Speed title={t('main.speed')} active={true} speed={printerState.speed} />
      <CustomSlider
        min={0}
        max={120}
        step={1}
        title={t('main.speed')}
        value={printerState.speed}
        onChange={(value: number) =>
          dispatch(PrinterActions.changeValueByName({ key: 'speed', value: value }))
        }></CustomSlider>
    </EditorBox>
  );
};
