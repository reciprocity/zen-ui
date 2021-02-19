import { newSpecPage } from '@stencil/core/testing';
import { ZenPopover } from '../zen-popover';

const options: NodeListOf<HTMLZenPopoverElement> | undefined[] = [];
jest.unmock('../../helpers/helpers');
import * as helpers from '../../helpers/helpers';
helpers.getSlotElement = jest.fn(() => options);
helpers.getDefaultSlotContent = jest.fn(() => options);

describe('zen-popover', () => {
  it.skip.each(['top-right', 'top-left'])(
    'should correctly apply position (position: %s)',
    async (position: string, done: DoneFn) => {
      const page = await newSpecPage({
        components: [ZenPopover],
        html: `<zen-popover position="${position}" always-visible="true"><div slot="target">Trigger</div><zen-text>Test</zen-text></zen-popover>`,
      });

      console.log('---------------', options);
      // We have to wait that tooltip is displayed because of always visible param
      setTimeout(async () => {
        expect(page.root.classList.contains(position)).toBe(true);
        done();
      }, 101);
    },
  );

  // Interactive
  it('should hide with delay if interactive and trigger is hover', () => {});
  it('shouldn`t hide with delay if interactive and trigger is click', () => {});
  it('should hide if click on non-interactive tooltip', () => {});

  // Hover trigger
  it('should show on hover if trigger is hover', () => {});
  it('shouldn`t show on hover if trigger isn`t hover', () => {});
  it('should hide on click if trigger is hover', () => {});

  // Click trigger
  it('should show on click if trigger is click', () => {});
  it('should hide on second click if trigger is click', () => {});

  // Prop `closeOnClickOut`
  it('should hide on click out', () => {});
  it('shouldn`t hide on click out if closeOnClickOut is false', () => {});

  // Prop `delay`
  it('should hide with delay if interactive and trigger is hover even if delay is 0', () => {});
  it('should show with delay if delay is set', () => {});
  it('should show and hide with different delays if delay shorthand is passed', () => {});
  it('should always show and hide without delay on click', () => {});
});
