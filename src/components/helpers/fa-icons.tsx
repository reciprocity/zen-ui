import { h } from '@stencil/core';

export function renderIcon(icon) {
  const [width, height, , , svg] = icon.icon;
  const classes = {
    'svg-inline--fa': true,
    'fa-w-20': true,
    'mr-3': true,
    [`fa-${icon.iconName}`]: true
  };
  return <svg class={classes} aria-hidden="true" focusable="false" data-prefix="fal" data-icon={icon.iconName} role="img" xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${width} ${height}`} data-fa-i2svg=""><path fill="currentColor" d={svg}></path></svg>
}
