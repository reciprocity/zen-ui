import { newSpecPage } from '@stencil/core/testing';
import { ZenAvatarDetails } from '../zen-avatar-details';
import { ZenAvatarIcon } from '../../zen-avatar-icon/zen-avatar-icon';
import { ZenText } from '../../zen-text/zen-text';

export const user = {
  userName: 'Mike Anderson',
  email: 'mike.anderson@reciprocitylabs.com',
};

describe('zen-avatar-details', () => {
  it('should render avatar details variant correctly', async () => {
    const page = await newSpecPage({
      components: [ZenAvatarDetails, ZenAvatarIcon, ZenText],
      html: `<zen-avatar-details user-name={user.userName} email={user.email}/>`,
    });
    expect(page.root.shadowRoot.querySelector('zen-avatar-icon')).toBeTruthy();
    expect(page.root.shadowRoot.querySelector('[data-test="email"]')).toBeTruthy();

    const textElements = page.root.shadowRoot.querySelectorAll('zen-text');
    expect(textElements.length).toEqual(2);
  });

  it('should render avatar variant basic, without email text', async () => {
    const page = await newSpecPage({
      components: [ZenAvatarDetails, ZenAvatarIcon, ZenText],
      html: `<zen-avatar-details variant="basic" user-name={user.userName} email={user.email} />`,
    });
    expect(page.root.shadowRoot.querySelector('[data-test="email"]')).not.toBeTruthy();
  });

  it('should render avatar variant basic, default size', async () => {
    const page = await newSpecPage({
      components: [ZenAvatarDetails, ZenAvatarIcon, ZenText],
      html: `<zen-avatar-details variant="basic" user-name={user.userName} email={user.email} />`,
    });
    const iconElement = page.root.shadowRoot.querySelector('zen-avatar-icon') as HTMLZenAvatarIconElement;
    expect(iconElement.size).toEqual('sm');

    const textElement = page.root.shadowRoot.querySelector('zen-text') as HTMLZenTextElement;
    expect(textElement.size).toEqual('md');
  });

  it('should render avatar variant basic, large size', async () => {
    const page = await newSpecPage({
      components: [ZenAvatarDetails, ZenAvatarIcon, ZenText],
      html: `<zen-avatar-details variant="basic-lg" user-name={user.userName} email={user.email} />`,
    });
    const iconElement = page.root.shadowRoot.querySelector('zen-avatar-icon') as HTMLZenAvatarIconElement;
    expect(iconElement.size).toEqual('md');

    const textElement = page.root.shadowRoot.querySelector('zen-text') as HTMLZenTextElement;
    expect(textElement.size).toEqual('lg');
  });

  it('should show tooltip', async () => {
    const page = await newSpecPage({
      components: [ZenAvatarDetails, ZenAvatarIcon, ZenText],
      html: `<zen-avatar-details user-name={user.userName} email={user.email} show-tooltip="true" />`,
    });
    expect(page.root.shadowRoot.querySelector('[data-test="avatar-details-tooltip"]')).toBeTruthy();
  });
});
