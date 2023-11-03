import { useEffect, useState } from 'react';
import { useAppDispatch } from '../hooks/redux';
import { getTemperature, getStatus, getPrinterProfiles, getPrintStats } from '../__tests__/useWebSocket.test'

export const useWebSocket = (url: any) => {
  const dispatch = useAppDispatch();
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [receivedMessages, setReceivedMessages] = useState<string[]>([]);
  const [temperature, setTemperature] = useState({})
  const [status, setStatus] = useState({})
  const [printerProfiles, setPrinterProfiles] = useState({})
  const [printStats, setPrintStats] = useState({})

  useEffect(() => {
    const socket = new WebSocket(url);

    socket.addEventListener('open', () => {
      console.log('--------> WebSocket connection established.');
    });

    socket.addEventListener('message', (event) => {
      const message = event.data;
      console.log('message: ', message)
      const filteredData = getTemperature(message, dispatch)
      console.log('filteredData')
      //setTemperature(filteredData)
      setReceivedMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.addEventListener('temperature', (data) =>{
      const filteredData = getTemperature(data, dispatch)
      // setTemperature(filteredData)
    })

    socket.addEventListener('status', (data) => {
      // const filteredData = getStatus(data);
      // setStatus(filteredData)
    });

    socket.addEventListener('print_stats', (data) =>{
      // const filteredData = getPrintStats(data);
      // setPrintStats(filteredData)
    })

    socket.addEventListener('printer_profiles', (data) =>{
      // const filteredData = getPrinterProfiles(data);
      // setPrinterProfiles(filteredData)
    })

    socket.addEventListener('close', (event) => {
      console.log('close event: ', event)
      console.log(`WebSocket connection closed with code ${event.code}.`);
    });

    socket.addEventListener('error', (error) => {
      console.log('error: ', error)
      console.error(`WebSocket error: ${error}`);
    });

    setWs(socket);

    return () => {
      socket.close();
    };
  }, [url]);

  const send = (message: any) => {
    console.log(`Sending message: ${JSON.stringify(message)}`);
    if (ws !== null && ws.readyState === WebSocket.OPEN) {
        ws.send(message);
    } else {
        console.error('WebSocket not connected.');
    }
  };

  return {
    ws,
    send,
    receivedMessages,
    temperature,
    status,
    printerProfiles,
    printStats,
  };
};


