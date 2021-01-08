import { Component, Host, h, Prop, Element, Listen, State, Watch } from '@stencil/core';
import { Key } from 'ts-key-enum';
import { indent, unindent } from './helpers';

declare global {
  interface Window {
    Vue: any;
  }
}

@Component({
  tag: 'html-playground',
  styleUrl: 'html-playground.scss',
  shadow: true,
})
export class HtmlPlayground {
  frameworks = [
    { label: 'Vanilla JS', value: 'js' },
    { label: 'Vue', value: 'vue' },
  ];

  sourceCodes = {
    js: '',
    vue: '',
  };

  vueApp;

  @Element() hostElement: HTMLHtmlPlaygroundElement;

  @State() selectedFramework: string = this.frameworks[0].value;

  /** html source code to preview */
  @Prop({ mutable: true }) html = '<zen-button label="My button" variant="primary"></zen-button>';

  /** Save current value to local storage and restore it on load */
  @Prop() readonly saveValue = true;

  @Watch('selectedFramework')
  async frameworkChanged(framework: string): Promise<void> {
    this.html = this.sourceCodes[framework];
    if (this.saveValue) {
      window.localStorage.setItem('html-playground-framework', framework);
    }
  }

  localStorageKey(): string {
    return `html-playground${this.hostElement.id ? '-' + this.hostElement.id : ''}-value`;
  }

  onTextareaChange(e: Event): void {
    this.html = (e.target as HTMLTextAreaElement).value;
    this.sourceCodes[this.selectedFramework] = this.html;
    if (this.saveValue) {
      window.localStorage.setItem(this.localStorageKey(), JSON.stringify(this.sourceCodes));
    }
    if (this.selectedFramework === 'vue') {
      this.updateVue();
    }
  }

  onTabClicked(): void {
    const tabs = this.hostElement.shadowRoot.querySelector('#framework-tabs') as HTMLZenTabsElement;
    this.selectedFramework = tabs.value.toString();
  }

  @Listen('keydown')
  handleKeyDown(ev: KeyboardEvent): void {
    if (ev.key === Key.Tab) {
      ev.preventDefault();
      const textarea = this.hostElement.shadowRoot.querySelector('textarea');
      if (ev.shiftKey) {
        unindent(textarea);
      } else {
        indent(textarea);
      }
    }

    const ctrl = ev.metaKey || ev.shiftKey || ev.ctrlKey;
    const apply = (ev.key === Key.Enter && ctrl) || ev.key === Key.Escape || (ev.key === 's' && ctrl);
    if (apply) {
      // Apply changes:
      const textarea = this.hostElement.shadowRoot.querySelector('textarea');
      textarea.dispatchEvent(new Event('change'));
      ev.preventDefault();
    }
  }

  componentWillLoad(): void {
    const restoreSelectedFramework = (): void => {
      const savedFramework = window.localStorage.getItem('html-playground-framework');
      if (savedFramework) {
        this.selectedFramework = savedFramework;
      }
    };

    const restoreSourceCodes = (): void => {
      let savedCodes;
      try {
        savedCodes = JSON.parse(window.localStorage.getItem(this.localStorageKey()));
      } catch (err) {
        // skip
      }
      if (savedCodes) {
        this.sourceCodes = savedCodes;
      }
      this.html = this.sourceCodes[this.selectedFramework];
    };

    restoreSourceCodes();
    restoreSelectedFramework();
  }

  vueLoaded(): void {
    this.updateVue();
  }

  updateVue(): void {
    if (this.vueApp) {
      const appRoot = this.vueApp.$el;
      this.vueApp.$destroy();
      appRoot.remove();
    }

    const config = eval(`config=${this.sourceCodes['vue']}`);

    const target = document.createElement('div');
    this.hostElement.shadowRoot.querySelector('#vue-preview').appendChild(target);
    this.vueApp = new window.Vue(config).$mount(target);
  }

  render(): HTMLElement {
    return (
      <Host class="html-playground">
        <script src="https://cdn.jsdelivr.net/npm/vue@2.6.12" onLoad={() => this.vueLoaded()}></script>
        <zen-tabs
          id="framework-tabs"
          onChange={() => {
            this.onTabClicked();
          }}
          tabs={this.frameworks}
          value={this.selectedFramework}
        />
        <textarea value={this.html} onChange={e => this.onTextareaChange(e)} />
        <p class="preview-title">Preview</p>

        <div class="preview" innerHTML={this.sourceCodes['js']}></div>

        <div id="vue-preview" class="preview vue"></div>
      </Host>
    );
  }
}
