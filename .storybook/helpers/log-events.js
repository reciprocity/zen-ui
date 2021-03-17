import { script } from './lit-script';

const capitalize = (s) => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

function docTagToCustomEvent(docTag) {
  const params = docTag.text.split('|');
  return {
    event: (params[0] || '').trim(),
    bubbles: true,
    cancelable: true,
    composed: true,
    docs: (params[1] || '').trim(),
    docsTags: [],
    detail: '',
  };
}

const getDocumentedEvents = (componentData) => {
  // We allow adding extra events to documentation by adding docs-json @event tags.
  // Here we concat those events with the list of native Stencil @Events.
  const customEvents = componentData.docsTags
    ? componentData.docsTags.filter(n => n.name === 'event').map(n => docTagToCustomEvent(n))
    : [];
  return componentData.events.concat(customEvents);
};

export const eventHandles = (eventNames) => {
  return eventNames.map(eventName => `on${capitalize(eventName)}`);
};

export function logEvents(selector, componentData) {
  const eventNames = getDocumentedEvents(componentData).map(n => n.event);
  return script(`
    (function(){
      const comp = document.querySelector('${selector}');
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
