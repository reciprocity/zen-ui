type Rows = HTMLZenTableRowElement[];

export const cleanupTableStructure = function (table: HTMLZenTableElement): void {
  const parentRows = (rows, index: number): Rows => {
    let curDepth = rows[index].depth;
    const parents = [];
    for (let i = index - 1; i >= 0; i--) {
      if (rows[i].depth >= curDepth) continue;
      curDepth = rows[i].depth;
      parents.push(rows[i]);
    }
    return parents;
  };

  const descendentRows = (rows, index: number): Rows => {
    const children = [];
    const myDepth = rows[index].depth;
    for (let i = index + 1; i < rows.length; i++) {
      if (rows[i].depth <= myDepth) break;
      children.push(rows[i]);
    }
    return children;
  };

  const removeOrphans = (rows: Rows): void => {
    // orphans: rows whose depth is more than 1 greater from prevSibling.depth
    // rows like this could never become visible.
    // Apprently their parent got deleted so we'd expect they'd get too.
    for (let i = rows.length - 1; i >= 0; i--) {
      if (rows[i - 1] && rows[i].depth - rows[i - 1].depth > 1) {
        rows[i].remove();
        delete rows[i];
      }
    }
  };

  const updateExapndableProps = (rows: Rows): void => {
    for (let i = 0; i < rows.length; i++) {
      rows[i].expandable = rows[i + 1] && rows[i + 1].depth > rows[i].depth;
      if (!rows[i].expandable && rows[i].expanded) {
        rows[i].expanded = false;
      }
    }
  };

  const updateVisibleProps = (rows: Rows): void => {
    for (let i = 0; i < rows.length; i++) {
      const parents = parentRows(rows, i);
      rows[i].visible = !parents.length || parents.every(n => n.expanded);
    }
  };

  const updateParentCheckboxes = (rows: Rows): void => {
    for (let i = 0; i < rows.length; i++) {
      const descendents = descendentRows(rows, i);
      if (!descendents.length) continue;
      const allSelected = descendents.length && descendents.every(n => n.selected);
      const someSelected = descendents.some(n => n.selected);

      rows[i].$indeterminate = !allSelected && someSelected;
      rows[i].selected = allSelected;
    }
  };

  // -------------------------------------------------------------------------
  table.$updating = true;

  const rows = allRows(table);

  // NOTE: Order of below function calls is important!!!
  removeOrphans(rows);
  updateExapndableProps(rows);
  updateVisibleProps(rows);
  updateParentCheckboxes(rows);

  table.$updating = false;
};

export const allRows = function (table: HTMLZenTableElement): Rows {
  const isNormalRow = (element: HTMLZenTableRowElement) => element.tagName.endsWith('-ROW') && !element.header;

  return Array.from(table.children).filter(n => isNormalRow(n as HTMLZenTableRowElement)) as Rows;
};
