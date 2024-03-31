import './index.css'

export default {
  template: `<p class="lstText"></p>`,
  props: {
    proxies: {
      value: {},
      disabled: {},
      error: {}
    },
    params: {
      text: {},
      options: { default: {}}
    }
  },
  nodes() {
    return {
      lstText: {
        style: () => {
          return {
            columns: this.param.options.columns || ''
          }
        },
        _html: () => this.param.text ?? this.proxy.value
      }
    }
  }
}
