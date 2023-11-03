import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PageFrame from '../../components/PageFrame';
import { LinearProgressWithLabel } from '../../components/UI/LinearProgressWithLabel';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { ReactComponent as PlayIcon } from '../../assets/images/main/play.svg';
import { ReactComponent as PauseIcon } from '../../assets/images/main/pause.svg';
import { ReactComponent as StopIcon } from '../../assets/images/main/stop.svg';
import { ReactComponent as TimeIcon } from '../../assets/images/main/time.svg';
import { ReactComponent as LayerIcon } from '../../assets/images/main/layer.svg';
import { Fraction } from '../../components/UI/Fraction';
import { useTranslation } from 'react-i18next';
import { Extruder } from './Extruder';
import { Device } from './Device';
import Grid from '@mui/material/Grid';
import { Speed } from './Speed';
import { State } from './State';
import { CustomSlider } from '../../components/UI/CustomSlider';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { ExtruderEditor } from './ExtruderEditor';
import { TableEditor } from './TableEditor';
import { CameraEditor } from './CameraEditor';
import { SpeedEditor } from './SpeedEditor';
import { BabystepEditor } from './BabystepEditor';
import { Actions as PrinterActions } from '../../store/reducers/PrinterSlice';
import { useWebSocket } from '../../hooks/useWebSocket';
import { Modal } from '../../components/Modal';
import { getTemperature, getPrintStats, getStatus, getPrinterProfiles, getCamera, getStrips } from '../../__tests__/useWebSocket.test'
import axios from 'axios';

export const Main = () => {
  const printerState = useAppSelector(state => state.printerReducer);
  const dispatch = useAppDispatch();
  const [progress, setProgress] = React.useState(20);
  const [isStop, setIsStop] = useState(false)
  const [runButton, setRunButton] = useState(true)
  const [resetButton, setResetButton] = useState(true)
  const [pauseButton, setPauseButton] = useState(false)
  const { t, i18n } = useTranslation();
  const [numerator, setNumerator] = useState(0);
  const [editor, setEditor] = useState<string | null>(null);

  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);

  const [data, setData] = useState([]);
  const [temperature, setTemperature] = useState([]);
  const [printStats, setPrintStats] = useState([])

  const handleShowModal1 = () => {
    setShowModal1(true);
  };

  const handleCloseModal1 = () => {
    setShowModal1(false);
  };

  const handleShowModal2 = () => {
    setShowModal2(true);
  };

  const handleCloseModal2 = () => {
    setShowModal2(false);
  };

  const handleShowModal3 = () => {
    setShowModal3(true);
  };

  const handleCloseModal3 = () => {
    setShowModal3(false);
  };

  const { ws, send, receivedMessages } = useWebSocket('wss://socketsbay.com/wss/v2/1/demo/');
  //const { ws, send, receivedMessages } = useWebSocket('ws://fdm2.at.pstu.ru:30080/websocket/user/123456/');
  // console.log('main page ws: ', ws)
  // console.log('main page send: ', send)
  // console.log('main page receivedMessages: ', receivedMessages)
  const handleRunClick = () => {
    // getTemperature('', dispatch)
    // getCamera('', dispatch)
    // getPrinterProfiles('', dispatch)
    // getStatus('', dispatch)
    // getPrintStats('', dispatch)
    // getStrips('', dispatch)
    // request to an api to run printer
    // check if error, if not setIsRunning to true
    console.log('---- Run ----')
    setRunButton(false)
    setResetButton(false)
    setPauseButton(true)
    setIsStop(false);
    dispatch(
      PrinterActions.changeValueByName({
        key: 'printerStatus',
        value: 'run'
      })
    )

    // if (send && ws) {
    //   // Отправляем запрос на получение статуса принтера
    //   send('{"jsonrpc": "2.0", "method": "printer.info", "id": 1}');
    //   // Отправляем запрос на получение статистики печати
    //   //send('{"jsonrpc": "2.0", "method": "server.print_stats", "id": 1}');
    // }
    //run procces from current progress
  };

  const handleStopClick = () => {
     // request to an api to run printer
     // check if error, if not setIsRunning to false
     setIsStop(true);
     dispatch(
      PrinterActions.changeValueByName({
        key: 'printerStatus',
        value: 'stop'
      })
    )
    //reset process
  };

  const handlePauseClick = () =>{
    setResetButton(true)
    setPauseButton(false)
    setRunButton(true)
    dispatch(
      PrinterActions.changeValueByName({
        key: 'printerStatus',
        value: 'pause'
      })
    )
    //pause process
  }
  
  useEffect(() => {
    send(printerState);
  }, [printerState, send]);
  
  useEffect(() => {
    // console.log('----> ws: ', ws)
    // if (send && ws) {
    //   // Отправляем запрос на получение статуса принтера
    //   send('{"jsonrpc": "2.0", "method": "printer.info.status", "id": 1}');
    //   // Отправляем запрос на получение статистики печати
    //   send('{"jsonrpc": "2.0", "method": "server.print_stats", "id": 1}');
    // }
    function randomIntFromInterval(min: number, max: number) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    const timer = setInterval(() => {
      setProgress(prevProgress => (prevProgress >= 100 ? 0 : prevProgress + 5));
      const newTemperature = randomIntFromInterval(10, printerState.leftEctruderActiveT);
      setNumerator(randomIntFromInterval(10, 300));
      // const temperature = getTemperature();
      // const status = getStatus();
      // dispatch(
      //   PrinterActions.changeValueByName({
      //     key: 'leftEctruderCurrentT',
      //     value: newTemperature,
      //   })
      // )
      // dispatch(
      //   PrinterActions.changeValueByName({
      //     key: 'rightEctruderCurrentT',
      //     value: newTemperature,
      //   })
      // )
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, [send]);
  useEffect(() => {
    if (receivedMessages.length > 0) {
      try {
        const message = JSON.parse(receivedMessages[receivedMessages.length - 1]);
        if (message.method === 'notify_temperature_update') {
          setTemperature(message.params[0]);
        } else if (message.method === 'server.print_stats') {
          setPrintStats(message.params[0]);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }, [receivedMessages]);

  return (
    <PageFrame>
      {editor === null && (

        <Grid container spacing={0} mt={1} px={1} justifyContent='center'>
          <Grid item xs={7}>
            <Grid container>
              <Grid item xs={6}>
                <Extruder
                  onClick={() => setEditor('leftEctruder')}
                  title={t('main.extruder.left')}
                  active={printerState.leftEctruderStatus}
                  numerator={numerator}
                  denominator={printerState.leftEctruderActiveT}
                  blow={printerState.leftEctruderBlowing}
                  extrusion={printerState.leftEctruderExtrusion}
                />
              </Grid>
              <Grid item xs={6} pl={1}>
                <Extruder
                  onClick={() => setEditor('rightEctruder')}
                  title={t('main.extruder.right')}
                  active={printerState.rightEctruderStatus}
                  numerator={printerState.rightEctruderCurrentT}
                  denominator={printerState.rightEctruderActiveT}
                  blow={printerState.rightEctruderBlowing}
                  extrusion={printerState.rightEctruderExtrusion}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={5}>
            <Grid container justifyContent='space-between'>
              <Grid item xs={8}>
                <Grid container direction='column' alignItems='flex-end'>
                  <Grid item xs={6}>
                    <Device
                      onClick={() => setEditor('camera')}
                      title={t('main.camera')}
                      active={printerState.cameraEctruderStatus}
                      numerator={printerState.cameraEctruderCurrentT}
                      denominator={printerState.cameraEctruderActiveT}
                    />
                  </Grid>
                  <Grid item xs={6} paddingTop='30px'>
                    <Device
                      onClick={() => setEditor('table')}
                      title={t('main.table')}
                      active={printerState.tableEctruderStatus}
                      numerator={printerState.tableEctruderCurrentT}
                      denominator={printerState.tableEctruderActiveT}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Grid container direction='column' alignItems='flex-end'>
                  <Grid item xs={6}>
                    <State
                      onClick={() =>
                        dispatch(
                          PrinterActions.changeStatusByName({
                            key: 'convectionStatus',
                            value: !printerState.convectionStatus
                          })
                        )
                      }
                      title={t('main.convection')}
                      text={printerState.convectionStatus ? 'ON' : 'OFF'}
                      active={printerState.convectionStatus}
                    />
                  </Grid>
                  <Grid item xs={6} paddingTop='30px' alignItems='stretch' justifyContent='stretch'>
                    <State
                      onClick={() => setEditor('babystep')}
                      title={t('main.babystep')}
                      text={t('main.change')}
                      active={true}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container direction='column' mt='30px' alignItems='flex-end'>
                  <Speed
                    onClick={() => setEditor('speed')}
                    title={t('main.speed')}
                    active={true}
                    speed={printerState.speed}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}

      {(editor === 'leftEctruder' || editor === 'rightEctruder') && (
        <ExtruderEditor title={editor} exit={() => setEditor(null)} />
      )}

      {editor === 'table' && <TableEditor exit={() => setEditor(null)} />}

      {editor === 'camera' && <CameraEditor exit={() => setEditor(null)} />}

      {editor === 'speed' && <SpeedEditor exit={() => setEditor(null)} />}

      {editor === 'babystep' && <BabystepEditor exit={() => setEditor(null)} />}

      <BottomBox>
        <IconBox>
          <Box>
            <TimeIcon /> {printerState.estimatedTime}
          </Box>
          <Box>
            <LayerIcon />
            <Fraction numerator={printerState.currentLayer} denominator={printerState.targetLayer} lineweight='2px' width='40px' />
          </Box>
        </IconBox>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
          <LinearProgressWithLabel value={progress} />
          <Box>
            <CustomButton 
              variant='outlined' 
              startIcon={<StopIcon />} 
              onClick={handleShowModal1}
              disabled={isStop && resetButton}
              className={isStop && resetButton ? 'disabled' : (resetButton ? '' : 'showNone')}
            />
            <CustomButton 
              variant='outlined' 
              startIcon={<PauseIcon />} 
              onClick={handleShowModal2}
              className={pauseButton ? '' : 'showNone'}
            />
            <CustomButton 
              variant='outlined' 
              startIcon={<PlayIcon />} 
              onClick={handleShowModal3}
              className={runButton ? '' : 'showNone'}
            />
          </Box>
        </Box>
      </BottomBox>
      <Modal show={showModal1} onClose={handleCloseModal1} title="Остановить Печать" onOk={handleStopClick}>
              <p>Вы уверены, что хотите остановить печать? Весь процесс будет потерян</p>
      </Modal>
      <Modal show={showModal2} onClose={handleCloseModal2} title="Пауза" onOk={handlePauseClick}>
              <p>После паузы вы сможете продолжить печать. Поставить печать на паузу?</p>
      </Modal>
      <Modal show={showModal3} onClose={handleCloseModal3} title="Продолжить печать" onOk={handleRunClick}>
              <p>Вы уверены, что хотите продолжить печать?</p>
      </Modal>
    </PageFrame>
  );
};


const CustomButton = styled(Button)`
  &.MuiButton-root {
    width: 70px;
    height: 62px;
    margin: -5px 8px;
    background: #16181a;
    border: 1px solid #2d2c2c;
    border-radius: 11px;
  }
  & .MuiButton-startIcon {
    margin: 0;
  }
  &.disabled {
    opacity: 0.5;
  }
  &.showNone{
    display: none;
  }
`;

const BottomBox = styled(Box)`
  position: absolute;
  top: 680px;
  left: 123px;
  width: 1157px;
`;

const IconBox = styled(Box)`
  &.MuiBox-root {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 36px;
    width: 240px;
    margin: auto;
    & > .MuiBox-root {
      display: flex;
      align-items: center;
      justify-content: center;
      & svg {
        margin-right: 10px;
      }
    }
  }
`;
