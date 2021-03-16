import { script } from './lit-script';

const capitalize = (s) => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const eventHandles = (eventNames) => {
  return eventNames.map(eventName => `on${capitalize(eventName)}`);
};

export function logEvents(compName, eventNames) {
  return script(`
    (function(){
      const comp = document.querySelector('${compName}');
      ${eventNames.map((eventName) => `
        comp.addEventListener('${eventName}', event => {
          var evt = new CustomEvent('on${capitalize(eventName)}', {
            bubbles: true,
            cancelable: true,
            view: window
          });
          console.log('Triggered: %c${eventName}', 'background: #0078cd; color: #fff; padding: 3px; border-radius: 2px', event);
          // comp.dispatchEvent(evt);
        });
      `).join('')}
    })()
  `);
}