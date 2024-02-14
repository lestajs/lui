import './index.css'
import { _attr } from '../../directives'

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
      value: {},
      disabled: {},
      error: {},
    },
    params: {
      type: { default: 'text'},
      name: { default: '' },
      size: { default: 'small' },
      text: {},
      options: { default: {}}
    },
    methods: {
      change: {},
      onfocus: {},
      onblur: {},
      validated: {}
    }
  },
  sources: {
    info: () => import('../../info')
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
          title: this.param.options.title,
          autocomplete: this.param.options.autocomplete,
          readonly: this.param.options.readonly,
          required: this.param.options.required,
          minlength: this.param.options.minlength,
          maxlength: this.param.options.maxlength,
          min: this.param.options.min,
          max: this.param.options.max,
          step: this.param.options.step
        },
        type: this.param.type,
        name: this.param.name,
        placeholder: this.param.options.placeholder ?? '',
        value: () => {
          if (this.proxy.value && typeof this.proxy.value === 'object') {
            return this.proxy.value.content
          } else {
            return this.proxy.value
          }
        },
        disabled: () => this.proxy.disabled,
        onfocus: () => this.method.onfocus?.(this.proxy.value),
        onblur: () => this.method.onblur?.(this.proxy.value),
        oninput: (event) => {
          if (this.param.type === 'number' && event.data === '.' || event.data === ',') return
          this.method.change?.(event.target.value)
        },
        onkeydown: (event) => {
          if (this.param.options.except?.includes(event.key)) event.preventDefault()
        }
      }
    }
  },
  methods: {
    set(v) {
      this.proxy.value = v
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