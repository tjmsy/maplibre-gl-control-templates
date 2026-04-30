import ButtonControlTemplate from './controls/BasicButtonControl.js';
import TogglePanelControl from './controls/TogglePanelControl.js';

const map = new maplibregl.Map({
  container: 'map',
  style: 'https://tiles.openfreemap.org/styles/liberty',
  center: [0, 0],
  zoom: 1,
  hash: true,
});
map.addControl(new ButtonControlTemplate(), 'top-left');
map.addControl(new TogglePanelControl(), 'top-left');
