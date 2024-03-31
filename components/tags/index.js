import { _attr } from '../directives'
import './index.css'

export default {
  template: `<div class="lstLbl l-label"></div>
  <button class="lstNst l-field l-br"></button>
  <div class="lstNstModal"></div>`,
  directives: { _attr },
  props: {
    proxies: {
      value: {
        default: []
      },
      disabled: {},
      error: {}
    },
    params: {
      name: { default: '' },
      size: { default: 'small' },
      text: {},
      options: {}
    },
    methods: {
      change: {},
      action: {}
    }
  },
  proxies: {
    opened: false,
    spinner: false,
    selected: []
  },
  sources: {
    dialog: () => import('../dialog'),
    popup: () => import('./popup')
  },
  nodes() {
    return {
      lstNstModal: {
        component: {
          // induce: () => this.proxy.opened,
          src: this.source.dialog,
          params: {
            cancelable: true,
            title: this.param.text,
            allow: {
              text: 'Применить'
            },
            reject: {
              text: 'Отколонить'
            }
          },
          proxies: {
            opened: () => this.proxy.opened
          },
          methods: {
            onclose: () => this.proxy.opened = false,
            allow: () => {
              this.proxy.value = this.node.lstNstModal.section.content.method.getSelected()
              this.method.change?.(this.proxy.value)
            }
          },
          sections: {
            content: {}
          }
        }
      },
      lstLbl: {
        _text: () => this.param.text
      },
      lstNst: {
        _class: {
          lstNstErr: () => this.proxy.error,
          lstSpinner: () => this.proxy.spinner,
          lstNstMultiple: this.param.options.multiple
        },
        _attr: {
          size: this.param.size,
          length: () => this.proxy.value.length.toString()
        },
        _html: () => this.method.render(),
        disabled: () => this.proxy.disabled,
        onclick: async () => {
          this.proxy.spinner = true
          const list = await this.method.action?.(this.param.name)
          this.proxy.spinner = false
          this.proxy.opened = true
          this.node.lstNstModal.section.content.mount({
            src: this.source.popup,
            params: {
              list: list || this.param.options.list,
              multiple: this.param.options.multiple
            },
            proxies: {
              list: list || this.param.options.list,
              selected: () => this.proxy.value
            }
          })
          this.proxy.opened = true
        }
      }
    }
  },
  methods: {
    render() {
      const v = this.proxy.value.slice(0, this.param.options.maxlength)
      return v.reduce((accum, el) => accum + `<div>${el}</div>`, '')
    }
  }
}
