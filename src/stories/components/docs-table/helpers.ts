import { JsonDocsComponent, JsonDocsEvent, JsonDocsTag } from '@stencil/core/internal/stencil-public-docs';

function docTagToCustomEvent(docTag: JsonDocsTag): JsonDocsEvent {
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

export const getDocumentedEvents = (componentData: JsonDocsComponent): JsonDocsEvent[] => {
  // We allow adding extra events to documentation by adding docs-json @event tags.
  // Here we concat those events with the list of native Stencil @Events.
  const customEvents = componentData.docsTags
    ? componentData.docsTags.filter(n => n.name === 'event').map(n => docTagToCustomEvent(n))
    : [];
  return componentData.events.concat(customEvents);
};
