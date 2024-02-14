import './index.css'

export default {
  template: `
  <div class="lstLbl l-label"></div>
  <fieldset class="lstBtns l-fx"></fieldset>`,
  props: {
    proxies: {
      value: {},
      disabled: {},
      error: {}
    },
    params: {
      size: { default: 'small' },
      name: { default: '' },
      type: {
        enum: ['button', 'text', 'radio'],
        default: 'button'
      },
      text: {},
      options: {
        default: {}
      }
    },
    methods: {
      action: {}
    }
  },
  nodes() {
    return {
      lstLbl: {
        _text: () => this.param.text
      },
      lstBtns: {
        name: this.param.name,
        _class: {
          'l-radio-type': this.param.type === 'radio',
          'l-button-type': this.param.type === 'button',
          'l-text-type': this.param.type === 'text',
          lstError: () => this.proxy.error
        },
        _html: () => this.method.render(),
        onclick: (event, arr) => {
          if (event.target.closest('.lstBtns > button')) {
            const index = +event.target.closest('.lstBtns > button').dataset.index - 1
            const buttons = this.param.options.buttons
            const v = buttons[index]
            if (Array.isArray(this.proxy.value)) {
              const i = this.proxy.value.indexOf(v)
              i === -1 ? this.proxy.value.push(v) : this.proxy.value.splice(i, 1)
            }
            this.method.action?.(this.param.name, v, index, this.proxy.value)
          }
        }
      }
    }
  },
  methods: {
    isActive(el) {
      return Array.isArray(this.proxy.value) ? this.proxy.value.includes(el) : this.proxy.value === el
    },
    render() {
      const buttons = this.param.options.buttons
      return buttons?.reduce((accum, el, index) => accum + `
        <button class="${this.method.isActive(el) ? 'l-active' : ''}" data-index="${index + 1}" size="${this.param.size}" ${this.proxy.disabled ? 'disabled' : ''}><span>${el}</span></button>
        `, '')
    },
    set(v) {
      this.proxy.value = v
      this.method.action?.(this.param.name, v)
    }
  }
}
