import { newSpecPage } from '@stencil/core/testing';
import { ZenIcon } from '../zen-icon';
import { faUser } from '@fortawesome/pro-light-svg-icons';

describe('zen-icon', () => {
  it('should render with shadow dom', async () => {
    const page = await newSpecPage({
      components: [ZenIcon],
      html: `<zen-icon></zen-icon>`,
    });
    expect(page.root.shadowRoot).toBeTruthy();
  });

  it('should render empty box', async () => {
    const page = await newSpecPage({
      components: [ZenIcon],
      html: `<zen-icon></zen-icon>`,
    });
    expect(page.root.innerHTML).toBe('');
  });

  it('should render a boxed icon', async () => {
    const page = await newSpecPage({
      components: [ZenIcon],
      html: `<zen-icon></zen-icon>`,
    });
    page.rootInstance.icon = faUser;
    page.waitForChanges();
    expect(page.rootInstance.icon.prefix).toBe('fal');
    expect(page.rootInstance.icon.iconName).toBe('user');
  });
});
