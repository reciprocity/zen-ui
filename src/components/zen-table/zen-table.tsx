import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'zen-table',
  styleUrl: 'zen-table.css',
  shadow: true,
})
export class ZenTable {
  render() {
    return (
      <Host>
        <table class="table">
          <thead>
            <slot name="header"></slot>
          </thead>
          <tbody>
            <slot></slot>
          </tbody>
        </table>
      </Host>
    );
  }
}
