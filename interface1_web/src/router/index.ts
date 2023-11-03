import React from 'react';
import { Auth } from '../pages/Auth';
import { Main } from '../pages/Main';
import { Files } from '../pages/Files';
import { ToolsControl } from '../pages/ToolsControl';
import { ToolsService } from '../pages/ToolsService';
import { ToolsConsole } from '../pages/ToolsConsole';
import { ToolsMonitor } from '../pages/ToolsMonitor';
import { SettingsBrightness } from '../pages/SettingsBrightness';
import { SettingsBlocking } from '../pages/SettingsBlocking';
import { SettingsLanguage } from '../pages/SettingsLanguage';
import { SettingsNetwork } from '../pages/SettingsNetwork';
import { SettingsAbout } from '../pages/SettingsAbout';

export interface IRoute {
  path: string;
  component: React.ComponentType;
}

export enum RouteNames {
  AUTH = '/auth',
  MAIN = '/main',
  FILES = '/files',
  TOOLS_CONTROL = '/tools-control',
  TOOLS_SERVICE = '/tools-service',
  TOOLS_CONSOLE = '/tools-console',
  TOOLS_MONITOR = '/tools-monitor',
  SETTINGS_BRIGHTNESS = '/settings-brightness',
  SETTINGS_BLOCKING = '/settings-blocking',
  SETTINGS_LANGUAGE = '/settings-language',
  SETTINGS_NETWORK = '/settings-network',
  SETTINGS_ABOUT = '/settings-about'
}

export const publicRoutes: IRoute[] = [
  {
    path: RouteNames.AUTH,
    component: Auth
  }
];

export const privateRoutes: IRoute[] = [
  { path: RouteNames.MAIN, component: Main },
  { path: RouteNames.FILES, component: Files },
  { path: RouteNames.TOOLS_CONTROL, component: ToolsControl },
  { path: RouteNames.TOOLS_SERVICE, component: ToolsService },
  { path: RouteNames.TOOLS_CONSOLE, component: ToolsConsole },
  { path: RouteNames.TOOLS_MONITOR, component: ToolsMonitor },
  { path: RouteNames.SETTINGS_BRIGHTNESS, component: SettingsBrightness },
  { path: RouteNames.SETTINGS_BLOCKING, component: SettingsBlocking },
  { path: RouteNames.SETTINGS_LANGUAGE, component: SettingsLanguage },
  { path: RouteNames.SETTINGS_NETWORK, component: SettingsNetwork },
  { path: RouteNames.SETTINGS_ABOUT, component: SettingsAbout }
];
