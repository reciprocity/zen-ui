import { newSpecPage, SpecPage } from '@stencil/core/testing';
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
      components: [ZenTableRow],
      html: `<zen-table-row selectable>
                <zen-table-cell>Row 1, Cell 1</zen-table-cell>
                <zen-table-cell>Row 1, Cell 2</zen-table-cell>
            </zen-table-row>`,
    });

    expect(page.root.shadowRoot.querySelector('zen-checkbox')).toBeTruthy();
  });

  it('should render expendable icon and on click expand full span row', async () => {
    const page = await newSpecPage({
      components: [ZenTable, ZenTableRow, ZenTableCell],
      html: `<zen-table>
              <zen-table-row selectable depth="0">
                <zen-table-cell>Row 1, Cell 1</zen-table-cell>
                <zen-table-cell>Row 1, Cell 2</zen-table-cell>
              </zen-table-row>
              <zen-table-row full-span depth="1">
                <zen-table-cell>Test</zen-table-cell>
                <zen-table-cell></zen-table-cell>
              </zen-table-row>
            </zen-table>`,
    });
    const mainRow = page.root.querySelector('zen-table-row') as HTMLZenTableRowElement;
    expect(mainRow.visible).toBeTruthy();

    const expandRow = page.root.querySelector('[full-span]') as HTMLZenTableRowElement;
    expect(expandRow.visible).not.toBeTruthy();

    const expandableIcon = mainRow.shadowRoot.querySelector('.expand-icon');
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

  beforeEach(async () => {
    page = await newSpecPage({
      components: [ZenTable, ZenTableRow, ZenTableCell],
      html: `<zen-table>
              <zen-table-row selectable expandable visible expanded>
                <zen-table-cell>Row 1, Cell 1</zen-table-cell>
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
                <zen-table-cell>Child Row 5, Cell 1 </zen-table-cell>
              </zen-table-row>
            </zen-table>`,
    });
    parentRow = page.root.querySelector('zen-table-row') as HTMLZenTableRowElement;
    expect(parentRow.visible).toBeTruthy();
  });

  it('should set all descendants to not visible on expand false', async () => {
    const expandableIcon = parentRow.shadowRoot.querySelector('.expand-icon');
    expect(expandableIcon).toBeTruthy();

    simulateMouse('click', expandableIcon);
    page.waitForChanges;

    const descendents = [];
    descendents.concat(page.root.querySelectorAll('zen-table-row[depth="1"]'));
    descendents.concat(page.root.querySelectorAll('zen-table-row[depth="2"]'));

    for (const row of descendents.values()) {
      expect((row as HTMLZenTableRowElement).visible).not.toBeTruthy();
    }
  });

  it('should select all row descendents on parent row click and property set', async () => {
    simulateMouse('click', parentRow.shadowRoot.querySelector('.checkbox'));
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

  it('should select only second depth children when setting second depth parent to selected', async () => {
    const secondDepthPrentRow = page.root.querySelector('[second-level-parent]') as HTMLZenTableRowElement;
    expect(secondDepthPrentRow.visible).toBeTruthy();

    // First depth children without the first depth parent row
    const firstDepthChildren = page.root.querySelectorAll(
      'zen-table-row[depth="1"] :not(zen-table-row[depth="1"]:first-child)',
    );
    const secondDepthChildren = page.root.querySelectorAll('zen-table-row[depth="2"]');

    secondDepthPrentRow.selected = true;
    await page.waitForChanges();
    for (const row of firstDepthChildren.values()) {
      expect((row as HTMLZenTableRowElement).selected).not.toBeTruthy();
    }
    for (const row of secondDepthChildren.values()) {
      expect((row as HTMLZenTableRowElement).selected).toBeTruthy();
    }
  });

  it('should set indeterminate state to all parent rows', async () => {
    const secondDepthChild = page.root.querySelector('zen-table-row[depth="2"]');
    const secondDepthParentRow = page.root.querySelector('[second-level-parent]') as HTMLZenTableRowElement;

    simulateMouse('click', secondDepthChild.shadowRoot.querySelector('.checkbox'));
    await page.waitForChanges();

    expect(parentRow.$indeterminate).toBeTruthy();
    expect(secondDepthParentRow.$indeterminate).toBeTruthy();
  });
});
