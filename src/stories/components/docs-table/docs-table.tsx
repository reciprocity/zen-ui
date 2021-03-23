import { Component, Host, h, Prop, Element } from '@stencil/core';
import { JsonDocsComponent, JsonDocsEvent } from '@stencil/core/internal/stencil-public-docs';
import { applyPrefix } from 'src/components/helpers/helpers';
import { getDocumentedEvents } from './helpers';

@Component({
  tag: 'docs-table',
  styleUrl: 'docs-table.scss',
  shadow: false,
})
export class DocsTable {
  data: JsonDocsComponent;
  events: JsonDocsEvent[];

  @Element() host: HTMLDocsTableElement;

  /** Data from stencilDocs.json */
  @Prop() readonly docs: string;

  componentWillLoad(): void {
    this.data = JSON.parse(this.docs);
    this.events = getDocumentedEvents(this.data);
  }

  render(): HTMLElement {
    console.log(this.data.methods);
    const ZenText = applyPrefix('zen-text', this.host);
    const ZenSpace = applyPrefix('zen-space', this.host);
    return (
      <Host class="docs-table">
        {this.events.length ? (
          <div>
            <h2 class="css-d83bdw">Events</h2>
            <ZenSpace vertical p="none none lg" spacing="sm">
              <ZenText>
                All components supports standard events such as
                <code>change</code>, <code>input</code>, <code>click</code>, <code>focus</code>, <code>blur</code>, ...
              </ZenText>
              <ZenText>
                Control in story&nbsp;<b>Properties</b>&nbsp;also logs all events from table below.
              </ZenText>
              <ZenText>So check the console, to see when an event is triggered and what is its payload.</ZenText>
            </ZenSpace>
            <table class="sbdocs sbdocs-table css-thhe2u">
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Description</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {this.events.map(event => (
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
            <table class="sbdocs sbdocs-table css-thhe2u">
              <thead>
                <tr>
                  <th>Method</th>
                  <th>Description</th>
                  <th>Returns</th>
                  <th>Arguments</th>
                </tr>
              </thead>
              <tbody>
                {this.data.methods.map(method => (
                  <tr>
                    <td>
                      <code class="sbdocs sbdocs-code css-kw9izp">{method.name}</code>
                    </td>
                    <td>{method.docs}</td>
                    <td>
                      <code>{method.returns.type}</code>
                    </td>
                    <td>
                      <small>{method.signature}</small>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
                <code>{dependencyName}</code>
              ))}
            </ul>
          </div>
        ) : (
          ''
        )}

        {this.data.dependents.length ? (
          <div>
            <h2 class="css-d83bdw">Used by</h2>
            <p>
              List of components that depend on <i>{this.data.tag}</i>
            </p>
            <ul>
              {this.data.dependents.map(dependentName => (
                <li>
                  <code>{dependentName}</code>
                </li>
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
