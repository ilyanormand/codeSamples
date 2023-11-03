import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Box, CircularProgress } from '@mui/material';
import { Navigate, Routes, Route } from 'react-router-dom';
import { privateRoutes, publicRoutes, RouteNames } from '../router';
import { useAppDispatch, useAppSelector } from '../hooks/redux';

export const AppRouter = () => {
  const dispatch = useAppDispatch();
  const syncRef = useRef(false);
  const auth = true;

  useEffect(() => {
    if (syncRef.current === true) {
      return;
    }

    syncRef.current = true;
  }, []);

  //if (isLoading) {
  //  return (
  //    <StyledBox>
  //      <CircularProgress />
  //    </StyledBox>
  //  );
  //}

  //if (auth === false) {
  //  return (
  //    <Routes>
  //      {publicRoutes.map(route => (
  //        <Route key={route.path} element={<route.component />} path={route.path} />
  //      ))}
  //      <Route path='*' element={<Navigate to={RouteNames.AUTH} />} />
  //    </Routes>
  //  );
  //}

  return (
    <Routes>
      {privateRoutes.map(route => (
        <Route key={route.path} element={<route.component />} path={route.path} />
      ))}
      <Route path='*' element={<Navigate to={RouteNames.MAIN} />} />
    </Routes>
  );
};

const StyledBox = styled(Box)`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
