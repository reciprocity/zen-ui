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
import { simulateMouse } from '../../helpers/jest';
import { ZenTableRow } from '../../zen-table-row/zen-table-row';
import { ZenTable } from '../../zen-table/zen-table';
import { ZenTableHeaderCell } from '../../zen-table-header-cell/zen-table-header-cell';

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
        <zen-table-header>
          <zen-table-header-cell>Header 1</zen-table-header-cell>
          <zen-table-header-cell>Header 2</zen-table-header-cell>
        </zen-header-header>
      `,
    });

    const header = page.root as HTMLZenTableHeaderElement;
    header.sticky = true;
    await page.waitForChanges();

    expect(
      page.root
        .querySelectorAll('zen-table-header-cell')
        .map(cell => cell.sticky)
        .every(value => value === true),
    ).toBeTruthy();

    header.sticky = false;
    await page.waitForChanges();

    expect(
      page.root
        .querySelectorAll('zen-table-header-cell')
        .map(cell => cell.sticky)
        .every(value => value === true),
    ).not.toBeTruthy();
  });

  it('should render checkbox', async () => {
    const page = await newSpecPage({
      components: [ZenTableHeader, ZenTableHeaderCell],
      html: `<zen-table-header selectable>
                <zen-table-header-cell>Header 1</zen-table-header-cell>
                <zen-table-header-cell>Header 2</zen-table-header-cell>
            </zen-table-header>`,
    });

    expect(page.root.shadowRoot.querySelector('zen-checkbox')).toBeTruthy();
  });

  it('should select header on mouse click or property set', async () => {
    const page = await newSpecPage({
      components: [ZenTableHeader, ZenTableHeaderCell],
      html: `<zen-table-header selectable>
                <zen-table-header-cell>Header 1</zen-table-header-cell>
                <zen-table-header-cell>Header 2</zen-table-header-cell>
            </zen-table-header>`,
    });

    const checkbox = page.root.shadowRoot.querySelector('.checkbox');
    simulateMouse('click', checkbox);
    await page.waitForChanges();
    expect(page.root.hasAttribute('selected')).toBeTruthy();

    const header = page.root as HTMLZenTableHeaderElement;
    header.selected = false;
    await page.waitForChanges();

    expect(page.root.hasAttribute('selected')).not.toBeTruthy();
  });

  it('should select all rows if header checkbox is selected or property set', async () => {
    const page = await newSpecPage({
      components: [ZenTable, ZenTableHeader, ZenTableRow],
      html: `<zen-table>
                <zen-table-header selectable>
                    <zen-table-header-cell>Header 1</zen-table-header-cell>
                    <zen-table-header-cell>Header 2</zen-table-header-cell>
                </zen-table-header>
                <zen-table-row selectable>
                    <zen-table-cell>Row 1, Cell 1</zen-table-cell>
                    <zen-table-cell>Row 1, Cell 2</zen-table-cell>
                </zen-table-row>
                <zen-table-row selectable>
                    <zen-table-cell>Row 2, Cell 1</zen-table-cell>
                    <zen-table-cell>Row 2, Cell 2</zen-table-cell>
                </zen-table-row>
            </zen-table>`,
    });
    const header = page.root.querySelector('zen-table-header') as HTMLZenTableHeaderElement;
    const checkbox = header.shadowRoot.querySelector('.checkbox');
    simulateMouse('click', checkbox);
    await page.waitForChanges();

    const rows = page.root.querySelectorAll('zen-table-row');
    for (const row of rows.values()) {
      expect((row as HTMLZenTableRowElement).selected).toBeTruthy();
    }

    header.selected = false;
    await page.waitForChanges();

    for (const row of rows.values()) {
      expect((row as HTMLZenTableRowElement).selected).not.toBeTruthy();
    }
  });

  it('should change header checkbox state to indeterminate on one row selected', async () => {
    const page = await newSpecPage({
      components: [ZenTable, ZenTableHeader, ZenTableRow],
      html: `<zen-table>
                <zen-table-header selectable>
                    <zen-table-header-cell>Header 1</zen-table-header-cell>
                    <zen-table-header-cell>Header 2</zen-table-header-cell>
                </zen-table-header>
                <zen-table-row selectable>
                    <zen-table-cell>Row 1, Cell 1</zen-table-cell>
                    <zen-table-cell>Row 1, Cell 2</zen-table-cell>
                </zen-table-row>
                <zen-table-row selectable>
                    <zen-table-cell>Row 2, Cell 1</zen-table-cell>
                    <zen-table-cell>Row 2, Cell 2</zen-table-cell>
                </zen-table-row>
            </zen-table>`,
    });
    const header = page.root.querySelector('zen-table-header') as HTMLZenTableHeaderElement;
    const row1 = page.root.querySelectorAll('zen-table-row')[0] as HTMLZenTableRowElement;

    row1.selected = true;
    await page.waitForChanges();

    expect(header.$indeterminate).toBeTruthy();
  });

  it('should change header checkbox state to selected if all rows selected', async () => {
    const page = await newSpecPage({
      components: [ZenTable, ZenTableHeader, ZenTableRow],
      html: `<zen-table>
                <zen-table-header selectable>
                    <zen-table-header-cell>Header 1</zen-table-header-cell>
                    <zen-table-header-cell>Header 2</zen-table-header-cell>
                </zen-table-header>
                <zen-table-row selectable>
                    <zen-table-cell>Row 1, Cell 1</zen-table-cell>
                    <zen-table-cell>Row 1, Cell 2</zen-table-cell>
                </zen-table-row>
                <zen-table-row selectable>
                    <zen-table-cell>Row 2, Cell 1</zen-table-cell>
                    <zen-table-cell>Row 2, Cell 2</zen-table-cell>
                </zen-table-row>
            </zen-table>`,
    });
    const header = page.root.querySelector('zen-table-header') as HTMLZenTableHeaderElement;
    const rows = page.root.querySelectorAll('zen-table-row');

    for (const row of rows.values()) {
      (row as HTMLZenTableRowElement).selected = true;
    }
    await page.waitForChanges();

    expect(header.selected).toBeTruthy();
  });
});
