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
  it('should render avatar details variant correctly', async () => {
    const page = await newSpecPage({
      components: [ZenAvatarDetails, ZenAvatarIcon, ZenText],
      html: `<zen-avatar-details />`,
    });
    page.root.users = user;
    expect(page.root.shadowRoot.querySelector('zen-avatar-icon')).toBeTruthy();
    expect(page.root.shadowRoot.querySelector('[data-test="email"]')).toBeTruthy();

    const textElements = page.root.shadowRoot.querySelectorAll('zen-text');
    expect(textElements.length).toEqual(2);
  });

  it('should render avatar variant basic, without email text', async () => {
    const page = await newSpecPage({
      components: [ZenAvatarDetails, ZenAvatarIcon, ZenText],
      html: `<zen-avatar-details variant="basic" />`,
    });
    page.root.users = user;
    expect(page.root.shadowRoot.querySelector('[data-test="email"]')).not.toBeTruthy();
  });

  it('should render avatar variant basic, default size', async () => {
    const page = await newSpecPage({
      components: [ZenAvatarDetails, ZenAvatarIcon, ZenText],
      html: `<zen-avatar-details variant="basic" />`,
    });
    page.root.users = user;
    const iconElement = page.root.shadowRoot.querySelector('zen-avatar-icon') as HTMLZenAvatarIconElement;
    expect(iconElement.size).toEqual('md');

    const textElement = page.root.shadowRoot.querySelector('zen-text') as HTMLZenTextElement;
    expect(textElement.size).toEqual('lg');
  });

  it('should render avatar variant basic, large size', async () => {
    const page = await newSpecPage({
      components: [ZenAvatarDetails, ZenAvatarIcon, ZenText],
      html: `<zen-avatar-details variant="basic" size="lg" />`,
    });
    page.root.users = user;
    const iconElement = page.root.shadowRoot.querySelector('zen-avatar-icon') as HTMLZenAvatarIconElement;
    expect(iconElement.size).toEqual('lg');

    const textElement = page.root.shadowRoot.querySelector('zen-text') as HTMLZenTextElement;
    expect(textElement.size).toEqual('xl');
  });
});
