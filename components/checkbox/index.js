import './index.css'
import { _attr } from '../directives'

export default {
  template: `
  <label class="lstCheckbox">
    <input type="checkbox" class="lstCheckboxInp">
    <span class="lstCheckmark"></span>
    <span class="lstCheckboxText"></span>
  </label>`,
  directives: { _attr },
  props: {
    proxies: {
      value: 'boolean',
      disabled: 'boolean',
      error: 'boolean'
    },
    params: {
      name: 'string',
      size: { default: 'medium' },
      text: {
        required: true
      }
    },
    methods: {
      action: {}
    }
  },
  nodes() {
    return {
      lstCheckbox: {
        _attr: {
          size: this.param.size
        },
        _class: {
          lstError: () => this.proxy.error
        }
      },
      lstCheckboxInp: {
        name: this.param.name,
        checked: () => this.proxy.value,
        disabled: () => this.proxy.disabled,
        onchange: (event) => this.method.set(event.target.checked)
      },
      lstCheckboxText: {
        _text: () => this.param.text ?? ''
      }
    }
  },
  methods: {
    set(v) {
      this.proxy.value = v
      this.method.action?.(this.param.name, v)
    }
  }
}
