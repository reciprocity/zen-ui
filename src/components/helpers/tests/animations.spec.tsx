import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { ZenButton } from '../../zen-button/zen-button';

import * as helpers from '../../helpers/helpers';
helpers.waitNextFrame = jest.fn(() => new Promise(resolve => setTimeout(() => resolve(), 50)));
helpers.getCssTransitionDuration = jest.fn(() => 300);

import * as helpers from '../../helpers/helpers';
import { showWithAnimation, hideWithAnimation, showInstantly, hideInstantly } from '../animations';

async function simulateNextFrame(page) {
  jest.advanceTimersByTime(50);
  await page.waitForChanges();
}

describe('showWithAnimation()', () => {
  let page: SpecPage;
  let button: HTMLElement;

  beforeEach(async () => {
    jest.useFakeTimers();
    page = await newSpecPage({
      components: [ZenButton],
      html: `<zen-button>Press</zen-button>`,
    });
    await page.waitForChanges();
    button = page.root;
  });

  it('should set attr animate to in-start', async () => {
    showWithAnimation(button);
    await page.waitForChanges();
    expect(button.getAttribute('animate')).toEqual('in-start');
  });

  it('should set attr animate to in-end with delay', async () => {
    showWithAnimation(button);
    await page.waitForChanges();
    expect(button.getAttribute('animate')).toEqual('in-start');
    jest.runAllTimers();
    await page.waitForChanges();
    expect(button.getAttribute('animate')).toEqual('in-start');
    jest.runAllTimers();
    await page.waitForChanges();
    expect(button.getAttribute('animate')).toEqual('in-end');
  });
});

describe('hideWithAnimation()', () => {
  let page: SpecPage;
  let button: HTMLElement;

  beforeEach(async () => {
    jest.useFakeTimers();
    page = await newSpecPage({
      components: [ZenButton],
      html: `<zen-button>Press</zen-button>`,
    });
    await page.waitForChanges();
    button = page.root;
  });

  it('should set attr animate to out-start', async () => {
    hideWithAnimation(button);
    await page.waitForChanges();
    expect(button.getAttribute('animate')).toEqual('out-start');
  });

  it('should set attr animate to out-end with delay', async () => {
    hideWithAnimation(button);
    await page.waitForChanges();
    expect(button.getAttribute('animate')).toEqual('out-start');
    await simulateNextFrame(page);
    expect(button.getAttribute('animate')).toEqual('out-start');
    await simulateNextFrame(page);
    expect(button.getAttribute('animate')).toEqual('out-end');
  });

  it('should set attr animate to out-finished at the end', async () => {
    hideWithAnimation(button);
    await page.waitForChanges();
    expect(button.getAttribute('animate')).toEqual('out-start');
    await simulateNextFrame(page);
    await simulateNextFrame(page);
    expect(button.getAttribute('animate')).toEqual('out-end');

    jest.runAllTimers();
    await page.waitForChanges();
    expect(button.getAttribute('animate')).toEqual('out-finished');
  });

  it('should call calback', async () => {
    const spy = jest.fn();
    hideWithAnimation(button, spy);
    await page.waitForChanges();
    await simulateNextFrame(page);
    await simulateNextFrame(page);
    jest.runAllTimers();
    await page.waitForChanges();
    expect(spy).toHaveBeenCalledTimes(1);
  });
});

describe('instant functions', () => {
  let page: SpecPage;
  let button: HTMLElement;

  beforeEach(async () => {
    jest.useFakeTimers();
    page = await newSpecPage({
      components: [ZenButton],
      html: `<zen-button>Press</zen-button>`,
    });
    await page.waitForChanges();
    button = page.root;
  });

  it('should set attr animate to in-end instantly', async () => {
    showInstantly(button);
    await page.waitForChanges();
    expect(button.getAttribute('animate')).toEqual('in-end');
  });

  it('should set attr animate to out-finished instantly', async () => {
    hideInstantly(button);
    await page.waitForChanges();
    expect(button.getAttribute('animate')).toEqual('out-finished');
  });
});
