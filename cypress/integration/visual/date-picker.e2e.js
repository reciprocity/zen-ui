/// <reference types="cypress" />
import { createVisualTests } from '../../support/utils/visualTesting';

describe('Date-picker visual tests', { scrollBehavior: 'center' }, () => {
  const pageId = 'forms-date-picker--default-story';
  const stories = [
    'story--forms-date-picker--default-story',
    'story--forms-date-picker--story-sizes',
    'story--forms-date-picker--initial',
    'story--forms-date-picker--disable-before-after-dates',
  ];

  before(() => {
    cy.visitStorybookIframe(pageId);
    cy.verifyAllStoriesHaveVRT(stories);

    const fixateToday = selector => {
      cy.get(selector).then(picker => {
        picker[0].value = new Date(1972, 1, 18);
      });
    };
    fixateToday(`#story--forms-date-picker--initial [data-test='initial-today']`);
    fixateToday(`#story--forms-date-picker--default-story sb-zen-date-picker`);
  });

  const skippedStories = [];
  createVisualTests(stories, skippedStories, 'sb-zen-date-picker');

  it('Verifies opened datepicker in ' + `${stories[0]}`, () => {
    const datepicker = `#${stories[0]} sb-zen-date-picker`;
    cy.get(datepicker).click();
    cy.wait(300);
    cy.matchImageSnapshot(`field-${stories[0]}`, {
      capture: 'viewport',
      clip: { x: 0, y: 250, width: 1000, height: 500 },
    });
  });
});
