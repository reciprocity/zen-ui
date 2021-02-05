import { newSpecPage } from '@stencil/core/testing';
import { ZenBreadcrumbs } from '../zen-breadcrumbs';

describe('zen-breadcrumbs', () => {
  it('should render', async () => {
    const page = await newSpecPage({
      components: [ZenBreadcrumbs],
      html: `<zen-breadcrumbs></zen-breadcrumbs>`,
    });

    expect(page.root.shadowRoot).toBeTruthy();
  });

  it('should render children with separator between each', async () => {
    const page = await newSpecPage({
      components: [ZenBreadcrumbs],
      html: `
        <zen-breadcrumbs>
          <div>A</div>
          <div>B</div>
          <div>C</div>
        </zen-breadcrumbs>
      `,
    });

    const separators = page.root.shadowRoot.querySelectorAll('.separator');
    const children = page.root.shadowRoot.children;

    expect(separators).toHaveLength(2);
    expect(children).toHaveLength(5);
  });

  describe('insertBetween', () => {
    it.each([
      [[], []],
      [[1], [1]],
    ])('should not insert element into array if array has less than 2 elements (array: %s)', (arr, expected) => {
      const insertBetween = ZenBreadcrumbs.prototype.insertBetween;
      const res = insertBetween(arr, '!');
      expect(res).toEqual(expected);
    });

    it.each([
      [[1, 2], '&', [1, '&', 2]],
      [[1, 2, 3], '&', [1, '&', 2, '&', 3]],
    ])('should insert element between array of elements (element: %j, array: %s)', (arr, el, expected) => {
      const insertBetween = ZenBreadcrumbs.prototype.insertBetween;
      const res = insertBetween(arr, el);
      expect(res).toEqual(expected);
    });
  });
});
