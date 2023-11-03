import { createTheme } from '@mui/material/styles';
import Montserrat from './assets/fonts/Montserrat-Regular.ttf';

export default createTheme({
  typography: {
    fontFamily: ['Montserrat', 'sans-serif'].join(',')
  },
  palette: {
    mode: 'dark',
    background: {
      default: '#16181A',
      paper: '#16181A'
    },
    text: {
      primary: '#666667'
    },
    action: {
      active: 'transparent',
      hover: 'transparent'
    },
    divider: '#414141'
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Montserrat';
          font-weight: 1 1000;
          font-style: normal;
          fontDisplay: "swap",
          src: url(${Montserrat}) format('truetype');
        }
      `
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          color: '#666667',
          borderRadius: '0',
          '& .MuiSlider-valueLabel': {
            backgroundColor: 'transparent'
          },
          '& .MuiSlider-track': {
            border: '1px solid #0075FF',
            background: '#0075ff'
          },
          '& .MuiSlider-thumb::after': {
            backgroundColor: '#0075FF',
            border: '5px solid #fff',
            width: '24px',
            height: '24px'
          },
          '& .MuiSlider-mark': {
            marginTop: '2px',
            height: '12px',
            width: '1px',
            backgroundColor: '#fff'
          }
        }
      }
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            '&:hover': {
              backgroundColor: 'transparent'
            }
          }
        }
      }
    }
  }
});
