import './index.css'
import { _attr } from '../directives'

export default {
  template: `
    <div class="l-fx l-ai-c"><label class="lstLbl l-label"></label><div class="lstInputInfo"></div></div>
    <div class="lstInputWr">
      <input type="text" class="lstInput l-field l-br">
      <div class="lstInputAfter"></div>
    </div>`,
  directives: { _attr },
  props: {
    proxies: {
      value: { default: '' },
      disabled: {},
      error: {}
    },
    params: {
      type: { default: 'text' },
      name: { default: '' },
      size: { default: 'medium' },
      text: {},
      options: {
        default: {}
      }
    },
    methods: {
      action: {},
      onfocus: {},
      onblur: {},
      validated: {}
    }
  },
  sources: {
    info: () => import('../info')
  },
  nodes() {
    return {
      lstInputInfo: {
        component: {
          induce: () => this.param.options.info,
          src: this.source.info,
          params: {
            text: this.param.options.info
          },
          methods: {
            onclose: () => this.method.focus()
          }
        }
      },
      lstLbl: {
        textContent: () => this.param.text
      },
      lstInputAfter: {
        _text: () => this.proxy.value?.after
      },
      lstInput: {
        _class: {
          lstError: () => this.proxy.error
        },
        _attr: {
          size: this.param.size,
          ...this.param.options.attributes
        },
        type: this.param.type,
        name: this.param.name,
        value: () => this.proxy.value,
        disabled: () => this.proxy.disabled,
        onfocus: () => this.method.onfocus?.(this.proxy.value),
        onblur: () => this.method.onblur?.(this.proxy.value),
        oninput: (event) => this.method.set(event.target.value),
        onkeydown: (event) => {
          if (this.param.options.except?.includes(event.key)) event.preventDefault()
        }
      }
    }
  },
  methods: {
    set(v) {
      this.method.action?.({ name: this.param.name, value: v })
    },
    validated() {
      if (!this.node.lstInput.checkValidity()) this.methods.validated(this.node.lstInput.validationMessage)
    },
    blur() {
      this.node.lstInput.blur()
    },
    focus() {
      this.node.lstInput.focus()
    },
    select() {
      this.node.lstInput.select()
    }
  }
}
