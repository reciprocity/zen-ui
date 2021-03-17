import { newSpecPage } from '@stencil/core/testing';

// TODO: this should be improved, to be able to test mutation observers:
global.MutationObserver = class {
  constructor() {
    return this;
  }
  observe = jest.fn();
  disconnect = jest.fn();
};

import { ZenTableHeader } from '../zen-table-header';

describe('zen-table-header', () => {
  it('should render', async () => {
    const page = await newSpecPage({
      components: [ZenTableHeader],
      html: `<zen-table-header>Content</zen-header-header>`,
    });

    expect(page.root.innerHTML).toEqual('Content');
  });

  it('should apply `sticky` attribute to child elements if `sticky` prop is set', async () => {
    const page = await newSpecPage({
      components: [ZenTableHeader],
      html: `
        <zen-table-header sticky>
          <div></div>
          <div></div>
          <div></div>
        </zen-header-header>
      `,
    });

    const isPropSetOnEveryChildElement = page.root
      .querySelectorAll('div')
      .map(div => div.hasAttribute('sticky'))
      .every(value => value === true);

    expect(isPropSetOnEveryChildElement).toEqual(true);
  });

  it('should render checkbox', async () => {
    const page = await newSpecPage({
      components: [ZenTableHeader],
      html: `<zen-table-header selectable>
                <zen-table-header-cell>Header 1</zen-table-header-cell>
                <zen-table-header-cell>Header 2</zen-table-header-cell>
            </zen-table-header>`,
    });

    expect(page.root.shadowRoot.querySelector('zen-checkbox')).toBeTruthy();
  });
});
