import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import styled from 'styled-components';

interface Props {
  children: React.ReactElement;
  width: string;
  height: string;
  borderRadius?: string;
  active: boolean;
}

export const GradientBox = (props: Props) => {
  const { width, height, borderRadius, active } = props;
  return (
    <StyledBox
      className={active ? 'on' : 'off'}
      width={width}
      height={height}
      borderRadius={borderRadius || '25px'}>
      {props.children}
    </StyledBox>
  );
};

const StyledBox = styled(Box)<{
  width: Props['width'];
  height: Props['height'];
  borderRadius: Props['borderRadius'];
}>`
  &.MuiBox-root {
    width: ${props => props.width};
    height: ${props => props.height};
    border-radius: ${props => props.borderRadius};
    &.on {
      background: linear-gradient(
            196.63deg,
            rgba(0, 71, 255, 0.172) -0.11%,
            rgba(41, 41, 41, 0) 21.88%
          )
          padding-box,
        radial-gradient(circle at 100% 100%, #16181a 0, #16181a 24px, transparent 24px) 0% 0%/25px
          25px no-repeat,
        radial-gradient(circle at 0 100%, #16181a 0, #16181a 24px, transparent 24px) 100% 0%/25px
          25px no-repeat,
        radial-gradient(circle at 100% 0, #16181a 0, #16181a 24px, transparent 24px) 0% 100%/25px
          25px no-repeat,
        radial-gradient(circle at 0 0, #16181a 0, #16181a 24px, transparent 24px) 100% 100%/25px
          25px no-repeat,
        linear-gradient(#16181a, #16181a) 50% 50% / calc(100% - 2px) calc(100% - 50px) no-repeat,
        linear-gradient(#16181a, #16181a) 50% 50% / calc(100% - 50px) calc(100% - 2px) no-repeat,
        linear-gradient(216deg, #54ac46 15%, #0047ff 26%, #2c2c2c 38%) 74% 64%/137% 141%;
    }
    &.off {
      border: 1px solid #2d2c2c;
    }
  }
`;
