import { Component, Host, h, Prop, Element, Listen, State, Watch } from '@stencil/core';
import { indent, unindent } from './helpers';

declare global {
  interface Window {
    /**
     * Disabling since the playground is meant as a POC for now.
     * Vue typings should later be added if we decide to improve it further.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Vue: any;
  }
}

interface SourceCodes {
  js: string;
  vue: string;
}

const DEFAULTS_SOURCES = (): SourceCodes => ({
  js: /*html*/ `
    <script>
      function buttonClicked(event) {
        event.target.variant = 'secondary';
        console.log('Button clicked', event);
      }
    </script>
    <sb-zen-button
      label="Click"
      onClick="buttonClicked(event)"
    />`,
  vue: /*js*/ `{
    template: \`<sb-zen-button
      :label="buttonTitle"
      :variant="buttonVariant"
      @click="onClick($event)"
    />\`,
    data: () => ({
      buttonTitle: 'Click',
      buttonVariant: 'primary',
    }),
    methods: {
      onClick(event) {
        this.buttonVariant = 'secondary';
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

  vueApp;

  @Element() host: HTMLHtmlPlaygroundElement;

  @State() textValue = '';

  /** Save current value to local storage and restore it on load */
  @Prop() readonly saveValue = true;

  /** What framework is initally selected */
  @Prop({ mutable: true }) selectedFramework: string = this.frameworks[0].value;

  /** What framework is initally selected */
  @Prop({ mutable: true }) sourceCodes: SourceCodes = DEFAULTS_SOURCES();

  @Watch('selectedFramework')
  async frameworkChanged(framework: string): Promise<void> {
    this.textValue = this.sourceCodes[framework];
    if (this.saveValue) {
      window.localStorage.setItem('html-playground-framework', framework);
    }
  }

  localStorageKey(): string {
    return `html-playground${this.host.id ? '-' + this.host.id : ''}-value`;
  }

  onTextareaChange(e: Event): void {
    const value = (e.target as HTMLTextAreaElement).value;
    this.textValue = value;
    this.sourceCodes[this.selectedFramework] = value;
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
    const tabs = this.host.shadowRoot.querySelector('#framework-tabs') as HTMLZenTabsElement;
    this.selectedFramework = tabs.value.toString();
  }

  @Listen('keydown')
  handleKeyDown(ev: KeyboardEvent): void {
    if (ev.key === 'Tab') {
      ev.preventDefault();
      const textarea = this.host.shadowRoot.querySelector('textarea');
      if (ev.shiftKey) {
        unindent(textarea);
      } else {
        indent(textarea);
      }
    }

    const ctrl = ev.metaKey || ev.shiftKey || ev.ctrlKey;
    const apply = (ev.key === 'Enter' && ctrl) || ev.key === 'Escape' || (ev.key === 's' && ctrl);
    if (apply) {
      // Apply changes:
      const textarea = this.host.shadowRoot.querySelector('textarea');
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
    this.host.shadowRoot.querySelector('#vue-preview').appendChild(target);
    this.vueApp = new window.Vue(config).$mount(target);
  }

  updateVanillaJS(): void {
    function evalScripts(element: Element): void {
      // Appended script tags are not evaluated/ran automatically.
      const scripts = element.querySelectorAll('script');
      scripts.forEach(script => window.eval(script.innerHTML));
    }

    const target = this.host.shadowRoot.querySelector('#vanilla-preview');
    target.innerHTML = this.sourceCodes['js'];
    evalScripts(target);
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
    this.textValue = this.sourceCodes[this.selectedFramework];

    this.updateVanillaJS();
    if (window.Vue) this.updateVue();
  }

  render(): HTMLElement {
    return (
      <Host class="html-playground">
        <script src="https://cdn.jsdelivr.net/npm/vue@2.6.12" onLoad={() => this.vueLoaded()}></script>
        <sb-zen-tabs
          id="framework-tabs"
          onChange={() => {
            this.onTabClicked();
          }}
          tabs={this.frameworks}
          value={this.selectedFramework}
        />
        <textarea value={this.textValue} onChange={e => this.onTextareaChange(e)} />
        <p class="preview-title">Preview</p>

        <div id="vanilla-preview" class={{ preview: true, hidden: this.selectedFramework !== 'js' }} />

        <div id="vue-preview" class={{ preview: true, hidden: this.selectedFramework !== 'vue' }} />
      </Host>
    );
  }
}
