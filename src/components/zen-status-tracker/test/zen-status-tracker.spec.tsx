import { createMutationObserverMock, MutationObserverMock } from '../../helpers/jest';
const originalMutationObserver = global.MutationObserver;

import { newSpecPage } from '@stencil/core/testing';
import { ZenStatusTracker } from '../zen-status-tracker';
import { ZenLozenge } from '../../zen-lozenge/zen-lozenge';

describe('zen-status-tracker', () => {
  let mutationObserverMock: jest.Mock<MutationObserverMock>;

  beforeEach(() => {
    mutationObserverMock = createMutationObserverMock();
    global.MutationObserver = mutationObserverMock;
  });

  afterEach(() => {
    global.MutationObserver = originalMutationObserver;
    mutationObserverMock.mockClear();
  });

  it('renders', async () => {
    const page = await newSpecPage({
      components: [ZenStatusTracker],
      html: `<zen-status-tracker>
                <zen-lozenge id="setup">Setup</zen-lozenge>
             </zen-status-tracker>`,
    });

    expect(page.root.shadowRoot).toBeTruthy();
  });

  it('should throw error if no children are not defined', async () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation();
    await newSpecPage({
      components: [ZenStatusTracker],
      html: `<zen-status-tracker></zen-status-tracker>`,
    });
    expect(consoleError).toHaveBeenCalledTimes(1);
  });

  it('should throw error if a zen-lozenge has no id defined', async () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation();
    await newSpecPage({
      components: [ZenStatusTracker, ZenLozenge],
      html: `<zen-status-tracker>
                <zen-lozenge>Setup</zen-lozenge>
             </zen-status-tracker>`,
    });
    expect(consoleError).toHaveBeenCalledTimes(2);
  });

  it('should select the second lozenge', async () => {
    const page = await newSpecPage({
      components: [ZenStatusTracker, ZenLozenge],
      html: `<zen-status-tracker selected-id="execution">
              <zen-lozenge id="setup">Setup</zen-lozenge>
              <zen-lozenge id="evidence">Evidence Assigment</zen-lozenge>
              <zen-lozenge id="execution">Execution</zen-lozenge>
              <zen-lozenge id="remediation">Remediation</zen-lozenge>
              <zen-lozenge id="completed">Completed</zen-lozenge>
            </zen-status-tracker>`,
    });

    const lozenges = page.root.querySelectorAll('zen-lozenge');
    expect(lozenges[2].getAttribute('variant')).toEqual('dark-blue-ghost');
  });

  it('should select the second lozenge', async () => {
    const page = await newSpecPage({
      components: [ZenStatusTracker, ZenLozenge],
      html: `<zen-status-tracker archived>
              <zen-lozenge id="setup">Setup</zen-lozenge>
              <zen-lozenge id="evidence">Evidence Assigment</zen-lozenge>
              <zen-lozenge id="execution">Execution</zen-lozenge>
              <zen-lozenge id="remediation">Remediation</zen-lozenge>
              <zen-lozenge id="completed">Completed</zen-lozenge>
            </zen-status-tracker>`,
    });
    const archived = page.root.shadowRoot.querySelector('[data-test="archived"]');
    expect(archived).toBeTruthy();
  });

  it('should select the setup lozenge and archived when setting the parameter', async () => {
    const page = await newSpecPage({
      components: [ZenStatusTracker, ZenLozenge],
      html: `<zen-status-tracker selected-id="evidence">
              <zen-lozenge id="setup">Setup</zen-lozenge>
              <zen-lozenge id="evidence">Evidence Assigment</zen-lozenge>
              <zen-lozenge id="execution">Execution</zen-lozenge>
              <zen-lozenge id="remediation">Remediation</zen-lozenge>
              <zen-lozenge id="completed">Completed</zen-lozenge>
            </zen-status-tracker>`,
    });
    const statusTracker = page.root as HTMLZenStatusTrackerElement;
    statusTracker.selectedId = 'setup';
    await page.waitForChanges();
    expect(statusTracker.getAttribute('selected-id')).toEqual('setup');

    statusTracker.archived = true;
    await page.waitForChanges();
    expect(statusTracker.hasAttribute('archived')).toEqual(true);
  });

  it('should select and set green lozenge on the last item', async () => {
    const page = await newSpecPage({
      components: [ZenStatusTracker, ZenLozenge],
      html: `<zen-status-tracker selected-id="completed">
              <zen-lozenge id="setup">Setup</zen-lozenge>
              <zen-lozenge id="evidence">Evidence Assigment</zen-lozenge>
              <zen-lozenge id="execution">Execution</zen-lozenge>
              <zen-lozenge id="remediation">Remediation</zen-lozenge>
              <zen-lozenge id="completed">Completed</zen-lozenge>
            </zen-status-tracker>`,
    });
    const lozenges = page.root.querySelectorAll('zen-lozenge');
    expect(lozenges[4].getAttribute('variant')).toEqual('green');
  });
});
