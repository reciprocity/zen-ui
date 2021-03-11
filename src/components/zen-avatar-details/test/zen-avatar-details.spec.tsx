import { newSpecPage } from '@stencil/core/testing';
import { ZenAvatarDetails } from '../zen-avatar-details';
import { ZenAvatarIcon } from '../../zen-avatar-icon/zen-avatar-icon';
import { ZenText } from '../../zen-text/zen-text';

export const user = [
  {
    userName: 'Mike Anderson',
    email: 'mike.anderson@reciprocitylabs.com',
    color: '#00528C',
    background: '#D5E9FA',
  },
];

describe('zen-avatar-details', () => {
  it('should render avatar details correctly', async () => {
    const page = await newSpecPage({
      components: [ZenAvatarDetails, ZenAvatarIcon, ZenText],
      html: `<zen-avatar-details />`,
    });
    page.root.users = user;
    expect(page.root.shadowRoot.querySelector('zen-avatar-icon')).toBeTruthy();

    const textElements = page.root.shadowRoot.querySelectorAll('zen-text');
    expect(textElements.length).toEqual(2);
  });
});
