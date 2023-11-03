import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State extends Record<string, any> {
  leftEctruderStatus: boolean;
  rightEctruderStatus: boolean;
  cameraEctruderStatus: boolean;
  tableEctruderStatus: boolean;
  convectionStatus: boolean;
  leftEctruderCurrentT: number;
  leftEctruderActiveT: number;
  leftEctruderBlowing: number;
  leftEctruderExtrusion: number;
  rightEctruderCurrentT: number;
  rightEctruderActiveT: number;
  rightEctruderBlowing: number;
  rightEctruderExtrusion: number;
  cameraEctruderCurrentT: number;
  cameraEctruderActiveT: number;
  tableEctruderCurrentT: number;
  tableEctruderActiveT: number;
  speed: number;
  babystep: number;
  estimatedTime: string ;
  currentLayer: number;
  targetLayer: number;
  progress: number;
  printerStatus: 'run' | 'stop' | 'pause';
}

const initialState: State = {
  leftEctruderStatus: true,
  rightEctruderStatus: true,
  cameraEctruderStatus: false,
  tableEctruderStatus: true,
  convectionStatus: true,
  leftEctruderCurrentT: 0,
  leftEctruderActiveT: 100,
  leftEctruderBlowing: 120,
  leftEctruderExtrusion: 100,
  rightEctruderCurrentT: 0,
  rightEctruderActiveT: 100,
  rightEctruderBlowing: 120,
  rightEctruderExtrusion: 100,
  cameraEctruderCurrentT: 0,
  cameraEctruderActiveT: 100,
  tableEctruderCurrentT: 0,
  tableEctruderActiveT: 95,
  speed: 30,
  babystep: 0.05,
  estimatedTime: '0',
  currentLayer: 0,
  targetLayer: 0,
  progress: 0,
  printerStatus: 'stop',
};

const slice = createSlice({
  name: 'printer',
  initialState,
  reducers: {
    changeStatusByName: (state, action: PayloadAction<{ key: keyof State; value: boolean }>) => {
      state[action.payload?.key] = action.payload?.value;
    },
    changeValueByName: (state, action: PayloadAction<{ key: keyof State; value: number | string }>) => {
      state[action.payload?.key] = action.payload?.value;
    },
    reset: () => initialState
  }
});

export default slice.reducer;
export const Actions = slice.actions;
