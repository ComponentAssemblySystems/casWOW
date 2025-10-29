import { addons } from 'storybook/manager-api';
import yourTheme from './YourTheme';

addons.setConfig({
  navSize: 250,
  bottomPanelHeight: 300,
  rightPanelWidth: 300,
  panelPosition: 'right',
  enableShortcuts: true,
  showToolbar: true,
  // theme: undefined,
  theme: yourTheme,
  selectedPanel: 'storybook/controls/panel',
  initialActive: 'canvas',
  layoutCustomisations: {
    showSidebar(state, defaultValue) {
      return state.storyId === 'landing' ? false : defaultValue;
    },
    showToolbar(state, defaultValue) {
      return state.viewMode === 'docs' ? false : defaultValue;
    },
  },
  sidebar: {
    showRoots: true,
    collapsedRoots: ['Example'],
  },
  toolbar: {
    title: { hidden: false },
    zoom: { hidden: false },
    eject: { hidden: false },
    copy: { hidden: false },
    fullscreen: { hidden: false },
  },
});
