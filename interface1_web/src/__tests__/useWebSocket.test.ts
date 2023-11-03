import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Actions as PrinterActions } from '../store/reducers/PrinterSlice';
import { useAppDispatch, useAppSelector } from '../hooks/redux';

// printerState.leftEctruderStatus
// printerState.leftEctruderCurrentT
// printerState.leftEctruderActiveT
// printerState.leftEctruderBlowing
// printerState.leftEctruderExtrusion
// printerState.rightEctruderStatus
// printerState.rightEctruderCurrentT
// printerState.rightEctruderActiveT
// printerState.rightEctruderBlowing
// printerState.rightEctruderExtrusion


// printerState.cameraEctruderStatus
// printerState.cameraEctruderCurrentT
// printerState.cameraEctruderActiveT

// printerState.tableEctruderStatus
// printerState.tableEctruderCurrentT
// printerState.tableEctruderActiveT

// printerState.convectionStatus
// printerState.convectionStatus

// printerState.speed
// printerState.estimatedTime

export function getTemperature(data: any, dispatch: any){
 const jsonData = JSON.parse(data);
 console.log('jsonData: ', jsonData)
 
 dispatch(PrinterActions.changeValueByName({ key: 'leftEctruderCurrentT', value: jsonData.sensors.extruder[0].actual }));
 dispatch(PrinterActions.changeValueByName({ key: 'leftEctruderActiveT', value: jsonData.sensors.extruder[0].target }));
 dispatch(PrinterActions.changeValueByName({ key: 'rightEctruderCurrentT', value: jsonData.sensors.extruder[1].actual }));
 dispatch(PrinterActions.changeValueByName({ key: 'rightEctruderActiveT', value: jsonData.sensors.extruder[1].target }));

}

export function getStatus(data: any, dispatch: any){
  //const jsonData = JSON.parse(data)
  // dispatch(PrinterActions.changeStatusByName({ key: 'leftEctruderStatus', value: status.status }));
  switch (status.status.convection.state){
    case 'on':
      dispatch(PrinterActions.changeStatusByName({
        key: 'convectionStatus',
        value: true
      }));
      break;
    case 'off':
      dispatch(PrinterActions.changeStatusByName({
        key: 'convectionStatus',
        value: false
      }));
  }

  switch (status.status['extruder-left'].state){
    case 'on':
      dispatch(PrinterActions.changeStatusByName({
        key: 'leftEctruderStatus',
        value: true
      }));
      break;
    case 'off':
      dispatch(PrinterActions.changeStatusByName({
        key: 'leftEctruderStatus',
        value: false
      }));
  }

  switch (status.status['extruder-right'].state){
    case 'on':
      dispatch(PrinterActions.changeStatusByName({
        key: 'rightEctruderStatus',
        value: true
      }));
      break;
    case 'off':
      dispatch(PrinterActions.changeStatusByName({
        key: 'rightEctruderStatus',
        value: false
      }));
  }

  dispatch(PrinterActions.changeValueByName({ key: 'babystep', value:  status.status.babystep.z}));
  dispatch(PrinterActions.changeValueByName({ key: 'leftEctruderBlowing', value:  status.status['extruder-left'].blowing}));
  dispatch(PrinterActions.changeValueByName({ key: 'leftEctruderExtrusion', value:  status.status['extruder-left'].blowing}));
  dispatch(PrinterActions.changeValueByName({ key: 'rightEctruderBlowing', value:  status.status['extruder-right'].blowing}));
  dispatch(PrinterActions.changeValueByName({ key: 'rightEctruderExtrusion', value:  status.status['extruder-right'].extrusion}));
}
export function getPrinterProfiles(data: any, dispatch: any){
  //const jsonData = JSON.parse(data)
  
}
export function getPrintStats(data: any, dispatch: any){
  //const jsonData = JSON.parse(data)
  dispatch(PrinterActions.changeValueByName({ key: 'estimatedTime', value:  print_stats.progress.printTimeLeftFormatted}));
  dispatch(PrinterActions.changeValueByName({ key: 'currentLayer', value:  print_stats.print_stats.complete_layer_count}));
  dispatch(PrinterActions.changeValueByName({ key: 'targetLayer', value:  print_stats.print_stats.total_layer_count}));
  dispatch(PrinterActions.changeValueByName({ key: 'progress', value:  print_stats.progress.completion * 100}));
}

export function getCamera(data: any, dispatch: any){
  //const jsonData = JSON.parse(data)
  dispatch(PrinterActions.changeValueByName({ key: 'cameraEctruderCurrentT', value:  webcam.webcam.temperature.actual}));
  dispatch(PrinterActions.changeValueByName({ key: 'cameraEctruderActiveT', value:  webcam.webcam.temperature.target}));
}

export function getStrips(data: any, dispatch: any){
  //const jsonData = JSON.parse(data)
  dispatch(PrinterActions.changeValueByName({ key: 'speed', value:  strips.result.strips.lights.speed}));
  dispatch(PrinterActions.changeValueByName({ key: 'tableEctruderCurrentT', value:  strips.result.strips.desk.temperature.actual}));
  dispatch(PrinterActions.changeValueByName({ key: 'tableEctruderActiveT', value:  strips.result.strips.desk.temperature.target}));
}


///////////// dummy data ///////////////

const print_stats = {
  "state": "printing",
  "filename": "test.gcode",
  "progress": {
    "completion": 0.25,
    "printTimeLeft": 5400,
    "filepos": 20480,
    "printTime": 7200,
    "printTimeLeftFormatted": "1h 30m",
    "printTimeFormatted": "2h"
  },
  "print_stats": {
    "layer_height": 0.2,
    "filament_used": 26.7,
    "filament_length": 8900,
    "print_duration": 7200,
    "first_layer_duration": 300,
    "times_left": 2,
    "times_left_string": "2 times",
    "estimated_time_left": 18000,
    "estimated_completion": "2023-04-21T09:00:00.000Z",
    "total_layer_count": 50,
    "complete_layer_count": 10,
    "print_duration_formatted": "2h",
    "first_layer_duration_formatted": "5m",
    "estimated_time_left_formatted": "5h",
    "estimated_completion_formatted": "2023-04-21 09:00"
  }
}

const status = {
  "status": {
    "status": "paused",
    "convection": {
      "state": "off"
    },
    "extruder-right": {
      "state": "off",
      "temp": 210.1,
      "target": 210,
      "offset": 0,
      "heater": 0,
      "blowing": 50,
      "extrusion": 50,
    },
    "extruder-left": {
      "state": "off",
      "temp": 210.1,
      "target": 210,
      "offset": 0,
      "heater": 0,
      "blowing": 50,
      "extrusion": 50,
    },
    "bed": {
      "temp": 60.4,
      "target": 60,
      "offset": 0,
      "heater": 1
    },
    "print_stats": {
      "filename": "test.gcode",
      "state": "paused",
      "progress": {
        "completion": 0.25,
        "printTimeLeft": 5400,
        "filepos": 20480,
        "printTime": 7200,
        "printTimeLeftFormatted": "1h 30m",
        "printTimeFormatted": "2h"
      },
      "print_duration": 7200,
      "filament_used": 26.7,
      "layer_height": 0.2,
      "total_layer_count": 50,
      "complete_layer_count": 10,
      "times_left": 2,
      "times_left_string": "2 times",
      "first_layer_duration": 300,
      "estimated_time_left": 18000,
      "estimated_completion": "2023-04-21T09:00:00.000Z",
      "print_duration_formatted": "2h",
      "first_layer_duration_formatted": "5m",
      "estimated_time_left_formatted": "5h",
      "estimated_completion_formatted": "2023-04-21 09:00"
    },
    "fans": [
      {
        "index": 0,
        "name": "Part cooling fan",
        "speed": 0,
        "blip_time": 0
      },
      {
        "index": 1,
        "name": "Hotend cooling fan",
        "speed": 0,
        "blip_time": 0
      }
    ],
    "babystep": {
      "z": 0
    },
    "capabilities": {
      "muted": true,
      "paused": true,
      "printing": true,
      "sd_ready": true,
      "error": false,
      "ready": true,
      "sensors": {
        "filament_runout": true
      },
      "pausable": true,
      "frozen": false,
      "tool_locked": false,
      "message_box": false,
      "enclosure": false,
      "locked": false
    }
  }
}

const temperature ={
  "sensors": {
    "extruder": [
      {
        "actual": 210.1,
        "target": 210,
        "name": "hotend",
        "heater": 0
      },
      {
        "actual": 210.1,
        "target": 210,
        "name": "hotend",
        "heater": 0
      }
    ],
    "bed": [
      {
        "actual": 60.4,
        "target": 60,
        "name": "bed",
        "heater": 1
      }
    ]
  }
}

const printerProfiles = {
  "printer_profiles": {
    "default": {
      "name": "Default",
      "model": "Any",
      "vendor": "Any",
      "custom_settings": {},
      "axes": {
        "x": {},
        "y": {},
        "z": {},
        "e": {}
      },
      "bed": {},
      "extruder": {},
      "heater": {},
      "cooling_fan": {},
      "temperature_sensor": {},
      "display": {},
      "sdcard": {},
      "tool_changer": {},
      "switch": {},
      "light": {},
      "power": {},
      "sensor": {},
      "probe": {}
    }
  }
}

const webcam = {
  "webcam": {
      "name": "TestCam",
      "location": "printer",
      "service": "mjpegstreamer",
      "target_fps": 15,
      "stream_url": "/webcam/?action=stream",
      "snapshot_url": "/webcam/?action=snapshot",
      "flip_horizontal": false,
      "flip_vertical": false,
      "rotation": 0,
      "source": "database",
      "temperature": {
        "actual": 210.1,
        "target": 210,
      }
  }
}

const strips = {
  "result": {
      "strips": {
          "lights": {
              "strip": "lights",
              "status": "on",
              "chain_count": 79,
              "preset": -1,
              "brightness": 255,
              "intensity": -1,
              "speed": 50,
              "error": null
          },
          "desk": {
              "strip": "desk",
              "status": "on",
              "chain_count": 60,
              "preset": 8,
              "brightness": -1,
              "intensity": -1,
              "speed": -1,
              "error": null,
              "temperature": {
                "actual": 210.1,
                "target": 210,
              }
          }
      }
  }
}