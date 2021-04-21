import { newSpecPage } from '@stencil/core/testing';
import { ZenStatusTracker } from '../zen-status-tracker';
import { ZenLozenge } from '../../zen-lozenge/zen-lozenge';

describe('zen-status-tracker', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ZenStatusTracker],
      html: `<zen-status-tracker></zen-status-tracker>`,
    });

    expect(page.root.shadowRoot).toBeTruthy();
  });

  it('should select the second lozenge', async () => {
    const page = await newSpecPage({
      components: [ZenStatusTracker, ZenLozenge],
      html: `<zen-status-tracker selected="2">
              <zen-lozenge>Setup</zen-lozenge>
              <zen-lozenge>Evidence Assigment</zen-lozenge>
              <zen-lozenge>Execution</zen-lozenge>
              <zen-lozenge>Remediation</zen-lozenge>
              <zen-lozenge>Completed</zen-lozenge>
            </zen-status-tracker>`,
    });

    const lozenges = page.root.querySelectorAll('zen-lozenge');
    expect(lozenges[2].getAttribute('variant')).toEqual('dark-blue-ghost');
  });

  it('should select the second lozenge', async () => {
    const page = await newSpecPage({
      components: [ZenStatusTracker, ZenLozenge],
      html: `<zen-status-tracker archived>
              <zen-lozenge>Setup</zen-lozenge>
              <zen-lozenge>Evidence Assigment</zen-lozenge>
              <zen-lozenge>Execution</zen-lozenge>
              <zen-lozenge>Remediation</zen-lozenge>
              <zen-lozenge>Completed</zen-lozenge>
            </zen-status-tracker>`,
    });
    const archived = page.root.shadowRoot.querySelector('[data-test="archived"]');
    expect(archived).toBeTruthy();
  });

  it('should select the second lozenge', async () => {
    const page = await newSpecPage({
      components: [ZenStatusTracker, ZenLozenge],
      html: `<zen-status-tracker selected="4">
              <zen-lozenge>Setup</zen-lozenge>
              <zen-lozenge>Evidence Assigment</zen-lozenge>
              <zen-lozenge>Execution</zen-lozenge>
              <zen-lozenge>Remediation</zen-lozenge>
              <zen-lozenge>Completed</zen-lozenge>
            </zen-status-tracker>`,
    });
    const lozenges = page.root.querySelectorAll('zen-lozenge');
    expect(lozenges[4].getAttribute('variant')).toEqual('green');
  });
});
