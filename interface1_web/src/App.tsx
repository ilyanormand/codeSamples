import React, { Suspense } from 'react';
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import { AppRouter } from './components/AppRouter';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <Suspense fallback='loading'>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </ThemeProvider>
    </Suspense>
  );
}

export default App;
