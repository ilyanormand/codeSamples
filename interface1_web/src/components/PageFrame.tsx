import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import { LeftBar } from './LeftBar';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

const drawerWidth = 123;

interface Props {
  children?: React.ReactNode;
}

export default function PageFrame({ children }: Props) {
  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      <Drawer
        hideBackdrop={true}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            borderRight: 'none',
            width: drawerWidth,
            height: '100%',
            position: 'relative',
            boxSizing: 'border-box'
          }
        }}
        variant='permanent'
        anchor='left'>
        <LeftBar />
      </Drawer>
      <Box component='main' sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
        {children}
      </Box>
    </Box>
  );
}
