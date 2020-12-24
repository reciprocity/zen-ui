import { Component, Host, h, Prop } from '@stencil/core';
import { getComponentData } from '../../../../.storybook/helpers/argTypes';
import { JsonDocsComponent } from '@stencil/core/internal/stencil-public-docs';

@Component({
  tag: 'docs-table',
  styleUrl: 'docs-table.scss',
  shadow: false,
})
export class DocsTable {
  data: JsonDocsComponent;

  /** Component name (kebab-case) */
  @Prop() readonly component: string = '';

  componentWillLoad(): void {
    this.data = {
      ...this.data,
      ...getComponentData(this.component),
    };
  }

  render(): HTMLElement {
    return (
      <Host class="docs-table">
        {this.data.events.length ? (
          <div>
            <h2 class="css-d83bdw">Events</h2>
            <table class="sbdocs sbdocs-table css-thhe2u">
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Description</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {this.data.events.map(event => (
                  <tr>
                    <td>
                      <code class="sbdocs sbdocs-code css-kw9izp">{event.event}</code>
                    </td>
                    <td>{event.docs}</td>
                    <td>
                      <code class="sbdocs sbdocs-code css-kw9izp">CustomEvent&lt;{event.detail}&gt;</code>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          ''
        )}

        {this.data.methods.length ? (
          <div>
            <h2 class="css-d83bdw">Methods</h2>
            {this.data.methods.map(method => (
              <table class="methods">
                <thead>
                  <tr>
                    <th colSpan={2}>
                      <h3 class="css-1cnn4xm">{method.name}</h3>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Description</th>
                    <td>
                      <p>{method.docs}</p>
                    </td>
                  </tr>
                  <tr>
                    <th>Returns</th>
                    <td>
                      <code>{method.returns.type}</code>
                    </td>
                  </tr>
                  <tr>
                    <th>Signature</th>
                    <td>
                      <code>dismiss(data?: any, role?: string | undefined) =&gt; Promise&lt;boolean&gt;</code>
                    </td>
                  </tr>
                </tbody>
              </table>
            ))}
          </div>
        ) : (
          ''
        )}

        {this.data.slots.length ? (
          <div>
            <h2 class="css-d83bdw">Slots</h2>
            <table class="sbdocs sbdocs-table css-thhe2u">
              <thead>
                <tr>
                  <th>Slot name</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {this.data.slots.map(slot => (
                  <tr>
                    <td>
                      <code class="sbdocs sbdocs-code css-kw9izp">{slot.name}</code>
                    </td>
                    <td>{slot.docs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          ''
        )}

        {this.data.dependencies.length ? (
          <div>
            <h2 class="css-d83bdw">Dependencies</h2>
            <ul>
              {this.data.dependencies.map(dependencyName => (
                <li>{dependencyName}</li>
              ))}
            </ul>
          </div>
        ) : (
          ''
        )}
      </Host>
    );
  }
}
