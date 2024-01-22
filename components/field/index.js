import './index.css'
import { _attr } from '../directives'

export default {
  template: `
        <div class="l-label l-fx l-ai-c"><label class="lstLbl"></label><div class="lstInputInfo"></div></div>
        <div class="lstField l-field l-br" contenteditable="true"></div>`,
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
      options: { default: {} }
    },
    methods: {
      change: {}
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
        _text: () => this.param.text
      },
      lstField: {
        _class: {
          lstFieldError: () => this.proxy.error
        },
        _attr: {
          size: this.param.size,
          title: this.param.options.title,
          required: this.param.options.required,
          contenteditable: () => !this.proxy.disabled
        },
        _text: () => this.proxy.value,
        oninput: (event) => {
          const value = event.target.textContent()
          this.method.change?.(value)
        }
      }
    }
  },
  methods: {
    clear() {
      this.proxy.value = ''
    }
  }
}