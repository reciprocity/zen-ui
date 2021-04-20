import { newSpecPage } from '@stencil/core/testing';
import { ZenLozenge } from '../zen-lozenge';

describe('zen-lozenge', () => {
  const lozengeVariants = [
    'light-grey',
    'dark-grey',
    'light-yellow',
    'dark-yellow',
    'light-purple',
    'dark-purple',
    'light-blue',
    'dark-blue',
    'green',
    'red',
    'dark-blue-ghost',
  ];

  it('should render with shadow dom', async () => {
    const page = await newSpecPage({
      components: [ZenLozenge],
      html: `<zen-lozenge></zen-lozenge>`,
    });
    expect(page.root.shadowRoot).toBeTruthy();
  });

  it.each(lozengeVariants)('should render lozenge (variant: %s)', async variant => {
    const page = await newSpecPage({
      components: [ZenLozenge],
      html: `<zen-lozenge variant="${variant}"></zen-lozenge>`,
    });
    expect(page.root).toHaveProperty('variant', variant);
    expect(page.root).toHaveProperty('size', 'default');
    expect(page.root).toHaveProperty('textVariant', 'uppercase');
  });

  it('should render large lozenge', async () => {
    const page = await newSpecPage({
      components: [ZenLozenge],
      html: `<zen-lozenge size="lg"></zen-lozenge>`,
    });
    expect(page.root).toHaveProperty('variant', 'light-grey');
    expect(page.root).toHaveProperty('size', 'lg');
    expect(page.root).toHaveProperty('textVariant', 'uppercase');
  });

  it('should render capitalize text in lozenge', async () => {
    const page = await newSpecPage({
      components: [ZenLozenge],
      html: `<zen-lozenge text-variant="capitalize"></zen-lozenge>`,
    });
    expect(page.root).toHaveProperty('variant', 'light-grey');
    expect(page.root).toHaveProperty('size', 'default');
    expect(page.root).toHaveProperty('textVariant', 'capitalize');
  });
});
