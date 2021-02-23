import { newSpecPage, SpecPage } from '@stencil/core/testing';

const popperMock = {
  destroy: jest.fn(),
  state: {
    placement: 'bottom',
  },
};

import * as popper from '@popperjs/core';
popper.createPopper = jest.fn(() => popperMock);

import * as helpers from '../../helpers/helpers';
helpers.waitNextFrame = jest.fn(() => new Promise(resolve => setTimeout(() => resolve(), 50)));
helpers.getComposedPath = jest.fn(() => []);

import { ZenPopover } from '../zen-popover';
import { ZenButton } from '../../zen-button/zen-button';
import { simulateMouse } from '../../helpers/jest';

async function simulateNextFrame(page) {
  jest.advanceTimersByTime(50);
  await page.waitForChanges();
}

function isVisible(popup) {
  return popup.getAttribute('animate') === 'in-end';
}

function isHidden(popup) {
  return popup.getAttribute('animate') === 'out-finished';
}

// -----------------------------------------------------------------------------
describe('zen-popover', () => {
  let page: SpecPage;
  let popover: HTMLZenPopoverElement;
  let popup: HTMLElement;
  let trigger: HTMLButtonElement;

  const render = async (params?: string) => {
    jest.useFakeTimers();
    page = await newSpecPage({
      components: [ZenPopover, ZenButton],
      html: /*html*/ `
        <zen-button>Open popover</zen-button>
        <zen-popover ${params}>
          <zen-space>
            <zen-text>Some text for a content</zen-text>
          </zen-space>
        </zen-popover>
      `,
    });
    await page.waitForChanges();
    popover = page.doc.querySelector('zen-popover') as HTMLZenPopoverElement;
    trigger = page.doc.querySelector('zen-button');
    popup = popover.shadowRoot.querySelector('.popup');
  };

  it('should initially render as hidden', async () => {
    await render();
    expect(isHidden(popup)).toEqual(true);
  });

  it('should initially render as visible', async () => {
    await render('visible="true"');
    await simulateNextFrame(page);
    expect(isVisible(popup)).toEqual(true);
  });

  // Interactive
  it('should hide with delay if interactive and trigger is hover even if delay is 0', async () => {
    await render('visible="true" trigger-event="hover" interactive');
    expect(popover.visible).toBeTruthy();
    simulateMouse('mouseout', trigger);
    await page.waitForChanges();

    // should be still visible due to delay:
    expect(popover.visible).toBeTruthy();
    jest.runAllTimers();
    await page.waitForChanges();

    // should close after delay:
    expect(popover.visible).toBeFalsy();
  });
  it('should hide instantly if interactive and trigger not hover', async () => {
    await render('visible="true" interactive');
    expect(popover.visible).toBeTruthy();

    simulateMouse('mousedown', trigger);
    await page.waitForChanges();
    expect(popover.visible).toBeFalsy();
  });

  // Hover trigger
  it('should show on hover if trigger is hover', async () => {
    await render('trigger-event="hover"');
    expect(popover.visible).toBeFalsy();
    simulateMouse('mouseover', trigger);
    await page.waitForChanges();
    expect(popover.visible).toBeTruthy();
  });

  it('shouldn`t show on hover if trigger isn`t hover', async () => {
    await render();
    expect(popover.visible).toBeFalsy();
    simulateMouse('mouseover', trigger);
    await page.waitForChanges();
    expect(popover.visible).toBeFalsy();
  });

  it('should hide on trigger click if trigger is hover', async () => {
    await render('trigger-event="hover" visible="true"');
    expect(popover.visible).toBeTruthy();
    await simulateNextFrame(page); // wait to create popper
    jest.runAllTimers(); // mouse down listener is added in timeout

    simulateMouse('mousedown', global.document);
    await simulateNextFrame(page); // clickOut has waitNextFrame

    expect(popover.visible).toBeFalsy();
  });

  // Click trigger
  it('should show on click if trigger is click', async () => {
    await render('trigger-event="click"');

    simulateMouse('mousedown', trigger);
    await simulateNextFrame(page); // clickOut has waitNextFrame

    expect(popover.visible).toBeTruthy();
  });

  it('should hide on second click if trigger is click', async () => {
    await render('trigger-event="click"');

    simulateMouse('mousedown', trigger);
    await simulateNextFrame(page); // clickOut has waitNextFrame

    expect(popover.visible).toBeTruthy();
    await simulateNextFrame(page); // wait to create popper
    jest.runAllTimers(); // mouse down listener is added in timeout

    simulateMouse('mousedown', global.document);
    await simulateNextFrame(page); // clickOut has waitNextFrame

    expect(popover.visible).toBeFalsy();
  });

  it('shouldn`t hide on click out if closeOnClickOut is false', async () => {
    await render('trigger-event="click" close-on-click-out="false"');

    simulateMouse('mousedown', trigger);
    await simulateNextFrame(page); // clickOut has waitNextFrame

    expect(popover.visible).toBeTruthy();
    await simulateNextFrame(page); // wait to create popper
    jest.runAllTimers(); // mouse down listener is added in timeout

    simulateMouse('mousedown', global.document);
    await simulateNextFrame(page); // clickOut has waitNextFrame

    expect(popover.visible).toBeTruthy();
  });

  // Prop `delay`
  it('should show with delay if delay set and trigger is hover', async () => {
    await render('trigger-event="hover" delay="500"');

    simulateMouse('mouseover', trigger);
    await simulateNextFrame(page); // clickOut has waitNextFrame

    expect(popover.visible).toBeFalsy(); // should still be hidden, because of delay
    jest.advanceTimersByTime(600);
    await page.waitForChanges();
    expect(popover.visible).toBeTruthy();
  });

  it('should show and hide with different delays if delay shorthand is passed', async () => {
    await render('trigger-event="hover" delay="300 500" visible="true"');

    expect(popover.visible).toBeTruthy(); // jes
    simulateMouse('mouseout', trigger);
    await page.waitForChanges();

    expect(popover.visible).toBeTruthy(); // should still be visible, because of delay
    jest.advanceTimersByTime(300);
    await page.waitForChanges();

    expect(popover.visible).toBeTruthy(); // still visible, due insufficient timer advance
    jest.advanceTimersByTime(200);
    await page.waitForChanges();

    expect(popover.visible).toBeFalsy();
  });

  it('should always show and hide without delay on click', async () => {
    await render('trigger-event="click" delay="300 500"');

    simulateMouse('mousedown', trigger);
    await simulateNextFrame(page); // clickOut has waitNextFrame

    expect(popover.visible).toBeTruthy();
    await simulateNextFrame(page); // wait to create popper
    jest.runAllTimers(); // mouse down listener is added in timeout

    simulateMouse('mousedown', global.document);
    await simulateNextFrame(page); // clickOut has waitNextFrame

    expect(popover.visible).toBeFalsy();
  });

  it('should hide with toggle', async () => {
    await render('trigger-event="click" visible="true"');
    popover.toggle();
    await page.waitForChanges();
    expect(popover.visible).toBeFalsy();
  });

  it('should stay opened if toggle(true)', async () => {
    await render('trigger-event="click" visible="true"');
    popover.toggle(true);
    await page.waitForChanges();
    expect(popover.visible).toBeTruthy();
  });
});
