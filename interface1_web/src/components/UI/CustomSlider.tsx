import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import Slider from '@mui/material/Slider';
import { Typography } from '@mui/material';

interface Props {
  width?: number;
  title: string;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  value?: number;
  step?: number;
}

export const CustomSlider = (props: Props) => {
  const { width = 600, max = 100, min = 0, step = 10, title, onChange, value = 0 } = props;
  return (
    <Box sx={{ width: width }} my={2}>
      <Typography mb={3} gutterBottom>
        {title}
      </Typography>
      <Slider
        onChange={(e: Event, value: number | number[]) => {
          if (typeof value === 'number') {
            onChange(value);
          }
        }}
        min={min}
        max={max}
        value={value}
        step={step}
        marks={true}
        valueLabelDisplay='on'
      />
    </Box>
  );
};
