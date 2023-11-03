import React, { FC } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SvgIcon from '@mui/material/SvgIcon';
import { ReactComponent as MainIcon } from '../assets/images/menu/main.svg';
import { ReactComponent as FilesIcon } from '../assets/images/menu/files.svg';
import { ReactComponent as ToolsIcon } from '../assets/images/menu/tools.svg';
import { ReactComponent as SettingsIcon } from '../assets/images/menu/settings.svg';
import { RouteNames } from '../router';
import { useTranslation } from 'react-i18next';

export const LeftBar: FC<{}> = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const leftBar = [
    {
      text: t('menu.main'),
      selected: location.pathname === RouteNames.MAIN ? true : false,
      icon: <MainIcon />,
      onClick: () => {
        navigate(RouteNames.MAIN);
      }
    },
    {
      text: t('menu.files'),
      selected: location.pathname === RouteNames.FILES ? true : false,
      icon: <FilesIcon />,
      onClick: () => {
        navigate(RouteNames.FILES);
      }
    },
    {
      text: t('menu.tools'),
      selected: location.pathname.search('/tools') === 0 ? true : false,
      icon: <ToolsIcon />,
      onClick: () => {
        navigate(RouteNames.TOOLS_CONTROL);
      }
    },
    {
      text: '',
      selected: location.pathname.search('/settings') === 0 ? true : false,
      icon: <SettingsIcon />,
      onClick: () => {
        navigate(RouteNames.SETTINGS_BRIGHTNESS);
      }
    }
  ];

  return (
    <StyledList>
      {leftBar.map((props, index) => (
        <StyledListItem key={props.text}>
          <ListItemButton onClick={props.onClick} selected={props.selected}>
            <ListItemIcon>{props.icon}</ListItemIcon>
            <ListItemText primary={props.text} />
          </ListItemButton>
        </StyledListItem>
      ))}
    </StyledList>
  );
};

const StyledList = styled(List)`
  &.MuiList-root {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    height: 100%;
    padding-top: 60px;
    border-right: 1px solid #414141;
    margin-right: 2px;
    padding-bottom: 0;
  }
`;

const StyledListItem = styled(ListItem)`
  &.MuiListItem-root {
    padding: 0;
    &:last-child {
      display: flex;
      align-items: flex-end;
      & .MuiButtonBase-root {
        height: 60px;
      }
    }
  }

  & .MuiButtonBase-root {
    flex-direction: column;
    text-transform: lowercase;
    padding: 10px 0 0;
    height: 93px;
    align-items: center;
    justify-content: space-evenly;

    &.Mui-selected {
      background-color: transparent;
      border-right: 3px solid #ffffff;
      margin-right: -2px;
      & .MuiTypography-root {
        color: #f1f1f1;
      }

      & svg {
        fill: #f1f1f1;
      }
    }
  }

  & .MuiListItemText-root {
    flex: none;
    margin-top: 0;
  }

  & .MuiTypography-root {
    font-weight: 500;
    font-size: 12px;
  }

  & .MuiListItemIcon-root {
    min-width: 28px;
  }
`;
