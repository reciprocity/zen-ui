import { newSpecPage } from '@stencil/core/testing';
import { ZenPopover } from '../zen-popover';

const options: NodeListOf<HTMLZenPopoverElement> | undefined[] = [];
jest.unmock('../../helpers/helpers');
import * as helpers from '../../helpers/helpers';
helpers.getSlotElement = jest.fn(() => options);
helpers.getDefaultSlotContent = jest.fn(() => options);

describe('zen-popover', () => {
  xit.each(['top-right', 'top-left'])(
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
});
