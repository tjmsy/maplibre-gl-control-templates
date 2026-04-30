import ButtonControlTemplate from '../src/BasicButtonControl.js';
import ToggleTextareaControl from '../src/ToggleTextareaControl.js';
import TogglePanelControl from '../src/TogglePanelControl.js';

const map = new maplibregl.Map({
  container: 'map',
  style: 'https://tiles.openfreemap.org/styles/liberty',
  center: [0, 0],
  zoom: 1,
  hash: true,
});
map.addControl(new ButtonControlTemplate(), 'top-left');
map.addControl(new ToggleTextareaControl(), 'top-left');
map.addControl(new TogglePanelControl(), 'top-left');
