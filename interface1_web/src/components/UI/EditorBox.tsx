import React from 'react';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { Icon } from '@iconify/react';
import Stack from '@mui/material/Stack';

interface Props {
  children: React.ReactNode;
  exit: () => void;
}

export const EditorBox = (props: Props) => {
  return (
    <>
      <Stack direction='row' justifyContent='flex-end' spacing={2}>
        <Button onClick={props.exit}>
          <Icon icon='fluent-mdl2:chrome-close' width='30px' color='#414141' />
        </Button>
      </Stack>
      <StyledBox>{props.children}</StyledBox>
    </>
  );
};

const StyledBox = styled(Box)`
  &.MuiBox-root {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }
`;
