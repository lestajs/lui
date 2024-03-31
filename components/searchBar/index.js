import './index.css'
import input from '../form/input'
import { _outside } from '../directives'

export default {
  template: `
  <div class="lstSearchBar l-br">
    <div class="lstSearch"></div>
    <div class="lstSearchDrpdwn"></div>
  </div>`,
  directives: { _outside },
  props: {
    proxies: {
      value: {},
      result: 'array'
    },
    params: {
      name: 'string',
      size: { default: 'medium' }
    },
    methods: {
      action: {},
      onselect: {}
    }
  },
  proxies: {
    hidden: false
  },
  nodes() {
    return {
      lstSearch: {
        component: {
          src: input,
          proxies: {
            value: () => this.proxy.value
          },
          params: {
            name: this.param.name,
            size: this.param.size,
            type: 'search',
            options: {
              autocomplete: 'off'
            }
          },
          methods: {
            action: this.method?.action
          }
        }
      },
      lstSearchDrpdwn: {
        _class: {
          hide: () => this.proxy.hidden
        },
        _outside: {
          change: (event) => {
            if (this.param.target && this.param.target.contains(event.target)) return
            // this.proxy.hidden = true
          }
        },
        _html: this.method.render,
        onclick: (event) => {
          if (event.target.closest('.lstSearchDrpdwn > button')) {
            const index = +event.target.closest('.lstSearchDrpdwn > button').dataset.index - 1
            const v = this.proxy.result?.[index]
            this.method.onselect?.({ value: v, index })
            this.proxy.hidden = true
          }
        }
      }
    }
  },
  methods: {
    render() {
      this.proxy.hidden = false
      return this.proxy.result.reduce((accum, el, index) => accum + `<button data-index="${index + 1}" size="${this.param.size}">${el}</button>`, '')
    },
    set(v) {
      this.proxy.value = v
      this.method.action?.(this.param.name, v)
    }
  }
}
