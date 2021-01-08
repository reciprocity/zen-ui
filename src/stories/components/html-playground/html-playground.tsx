import { Component, Host, h, Prop, Element, Listen, State, Watch } from '@stencil/core';
import { Key } from 'ts-key-enum';
import { indent, unindent } from './helpers';

declare global {
  interface Window {
    Vue: any;
  }
}

const DEFAULTS_SOURCES = () => ({
  js: /*html*/ `
    <script>
      function buttonClicked(event) { console.log('Button clicked', event); }
    </script>
    <zen-button
      label="Click"
      onClick="buttonClicked()"
    />`,
  vue: /*js*/ `{
    template: \`<zen-button
      :label="buttonTitle"
      @click="onClick($event)"
    />\`,
    data: () => ({
      buttonTitle: 'Click',
    }),
    methods: {
      onClick(event) {
        console.log('Button clicked', event);
      }
    }
  }`,
});

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

  sourceCodes = DEFAULTS_SOURCES();

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
    switch (this.selectedFramework) {
      case 'js':
        this.updateVanillaJS();
        break;
      case 'vue':
        this.updateVue();
        break;
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

  vueLoaded(): void {
    this.updateVue();
  }

  updateVue(): void {
    if (this.vueApp) {
      const appRoot = this.vueApp.$el;
      this.vueApp.$destroy();
      appRoot.remove();
    }

    const errorHtml = /*html*/ `
      <div
        :style="{
          'background-color': '#fcdadd',
          padding: '1rem',
          'border-radius': '3px',
          'font-size': '0.75rem',
        }"
      >
        {{errorDetails}}
      </div>
    `;

    let config;
    try {
      config = eval(`config=${this.sourceCodes['vue']}`);
    } catch (error) {
      console.log(error);
      config = {
        template: errorHtml,
        data: () => ({
          errorDetails: error,
        }),
      };
    }

    const target = document.createElement('div');
    this.hostElement.shadowRoot.querySelector('#vue-preview').appendChild(target);
    this.vueApp = new window.Vue(config).$mount(target);
  }

  updateVanillaJS(): void {
    const target = this.hostElement.shadowRoot.querySelector('#vanilla-preview');
    target.innerHTML = this.sourceCodes['js'];
  }

  componentDidLoad(): void {
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
    };

    restoreSourceCodes();
    restoreSelectedFramework();
    this.html = this.sourceCodes[this.selectedFramework];

    this.updateVanillaJS();
    if (window.Vue) this.updateVue();
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

        <div id="vanilla-preview" class={{ preview: true, hidden: this.selectedFramework !== 'js' }} />

        <div id="vue-preview" class={{ preview: true, hidden: this.selectedFramework !== 'vue' }} />
      </Host>
    );
  }
}
