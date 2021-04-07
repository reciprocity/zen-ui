let cells: NodeListOf<HTMLZenTableCellElement> = [];

import * as helpers from '../../helpers/helpers';
helpers.getDefaultSlotContent = jest.fn(() => cells);

import { newSpecPage } from '@stencil/core/testing';
import { ZenTableRow } from '../zen-table-row';
import { ZenTable } from '../../zen-table/zen-table';
import { ZenTableCell } from '../../zen-table-cell/zen-table-cell';
import { simulateMouse } from '../../helpers/jest';

describe('zen-table-row', () => {
  it('should render', async () => {
    const page = await newSpecPage({
      components: [ZenTableRow],
      html: `<zen-table-row>Content</zen-table-row>`,
    });

    expect(page.root.innerHTML).toEqual('Content');
  });

  it('should render checkbox', async () => {
    const page = await newSpecPage({
      components: [ZenTableCell],
      html: `<zen-table-cell selectable>Row 1, Cell 1</zen-table-cell>`,
    });

    expect(page.root.shadowRoot.querySelector('zen-checkbox')).toBeTruthy();
  });

  it('should render expendable icon and on click expand full span row', async () => {
    const page = await newSpecPage({
      components: [ZenTable, ZenTableRow, ZenTableCell],
      html: /*html*/ `
        <zen-table columns="1fr 1fr">
          <zen-table-row depth="0">
            <zen-table-cell class="first-cell">Row 1, Cell 1</zen-table-cell>
            <zen-table-cell>Row 1, Cell 2</zen-table-cell>
          </zen-table-row>
          <zen-table-row full-span depth="1">
            <zen-table-cell>Test</zen-table-cell>
            <zen-table-cell></zen-table-cell>
          </zen-table-row>
        </zen-table>`,
    });
    const mainRow = page.root.querySelector('zen-table-row') as HTMLZenTableRowElement;
    cells = mainRow.querySelectorAll('zen-table-cell');
    mainRow.selectable = true;
    await page.waitForChanges();

    expect(mainRow.visible).toBeTruthy();

    const firstCell = page.root.querySelector('.first-cell') as HTMLZenTableRowElement;

    const expandRow = page.root.querySelector('[full-span]') as HTMLZenTableRowElement;
    expect(expandRow.visible).toBeFalsy();

    const expandableIcon = firstCell.shadowRoot.querySelector('.expand-icon');
    expect(expandableIcon).toBeTruthy();

    simulateMouse('click', expandableIcon);
    page.waitForChanges;
    expect(mainRow.expanded).toBeTruthy();
    expect(expandRow.visible).toBeTruthy();
  });
});

describe('zen-table-row tree functionality', () => {
  let page: SpecPage;
  let parentRow: HTMLZenTableRowElement;
  let secondDepthParentRow: HTMLZenTableRowElement;
  let firstCell: HTMLZenTableCellElement;
  let secondDepthCell: HTMLZenTableCellElement;

  beforeEach(async () => {
    page = await newSpecPage({
      components: [ZenTable, ZenTableRow, ZenTableCell],
      html: /*html*/ `
        <zen-table columns="1fr 1fr">
          <zen-table-row>
            <zen-table-cell class="first-cell">Row 1, Cell 1</zen-table-cell>
          </zen-table-row>
          <zen-table-row selectable depth="1">
            <zen-table-cell>Child Row 1, Cell 1 </zen-table-cell>
          </zen-table-row>
            <zen-table-row selectable depth="1">
            <zen-table-cell>Child Row 2, Cell 1 </zen-table-cell>
          </zen-table-row>
          <zen-table-row selectable depth="1" second-level-parent>
            <zen-table-cell>Child Row 3, Cell 1 </zen-table-cell>
          </zen-table-row>
          <zen-table-row selectable depth="2">
            <zen-table-cell>Child Row 4, Cell 1 </zen-table-cell>
          </zen-table-row>
            <zen-table-row selectable depth="2">
            <zen-table-cell class="second-depth-cell">Child Row 5, Cell 1 </zen-table-cell>
          </zen-table-row>
        </zen-table>`,
    });
    parentRow = page.root.querySelector('zen-table-row') as HTMLZenTableRowElement;
    secondDepthParentRow = page.root.querySelector('[second-level-parent]') as HTMLZenTableRowElement;

    // mock slots:
    cells = parentRow.querySelectorAll('zen-table-cell');
    parentRow.selectable = true;
    parentRow.expandable = true;
    parentRow.expanded = true;

    firstCell = page.root.querySelector('.first-cell') as HTMLZenTableCellElement;
    secondDepthCell = page.root.querySelector('.second-depth-cell') as HTMLZenTableCellElement;
    secondDepthCell.$selectable = true;

    await page.waitForChanges();
  });

  it.skip('should set all descendants to not visible on expand false', async () => {
    expect(parentRow.visible).toBeTruthy();
    expect(secondDepthParentRow.visible).toBeTruthy();

    const expandableIcon = firstCell.shadowRoot.querySelector('.expand-icon');

    simulateMouse('click', expandableIcon);
    page.waitForChanges;

    const descendents = [];
    descendents.concat(page.root.querySelectorAll('zen-table-row[depth="1"]'));
    descendents.concat(page.root.querySelectorAll('zen-table-row[depth="2"]'));

    for (const row of descendents.values()) {
      expect((row as HTMLZenTableRowElement).visible).not.toBeTruthy();
    }
  });

  it.skip('should select all row descendents on parent row click and property set', async () => {
    simulateMouse('click', firstCell.shadowRoot.querySelector('.checkbox'));
    await page.waitForChanges();

    const descendents = [];
    descendents.concat(page.root.querySelectorAll('zen-table-row[depth="1"]'));
    descendents.concat(page.root.querySelectorAll('zen-table-row[depth="2"]'));

    for (const row of descendents.values()) {
      expect((row as HTMLZenTableRowElement).selected).toBeTruthy();
    }

    parentRow.selected = false;
    await page.waitForChanges();
    for (const row of descendents.values()) {
      expect((row as HTMLZenTableRowElement).selected).not.toBeTruthy();
    }
  });

  it.skip('should select only second depth children when setting second depth parent to selected', async () => {
    // First depth children without the first depth parent row
    const firstDepthChildren = page.root.querySelectorAll(
      'zen-table-row[depth="1"] :not(zen-table-row[depth="1"]:first-child)',
    );
    const secondDepthChildren = page.root.querySelectorAll('zen-table-row[depth="2"]');

    secondDepthParentRow.selected = true;
    await page.waitForChanges();
    for (const row of firstDepthChildren.values()) {
      expect((row as HTMLZenTableRowElement).selected).not.toBeTruthy();
    }
    for (const row of secondDepthChildren.values()) {
      expect((row as HTMLZenTableRowElement).selected).toBeTruthy();
    }
  });

  it.skip('should set indeterminate state to all parent rows', async () => {
    const checkbox = secondDepthCell.shadowRoot.querySelector('.checkbox') as HTMLZenCheckboxElement;
    checkbox.checked = true;
    const event = new Event('change', { bubbles: true, composed: true });
    checkbox.dispatchEvent(event);
    await page.waitForChanges();

    expect(parentRow.$indeterminate).toBeTruthy();
    expect(secondDepthParentRow.$indeterminate).toBeTruthy();
  });
});
