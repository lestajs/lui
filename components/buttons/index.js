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
        onclick: (event) => {
          if (event.target.closest('.lstBtns > button')) {
            const index = +event.target.closest('.lstBtns > button').dataset.index - 1
            const buttons = this.param.options.buttons
            const v = buttons[index]
            this.method.active(v, index)
          }
        }
      }
    }
  },
  methods: {
    isActive(el) {
      return Array.isArray(this.proxy.value) ? this.proxy.value.includes(el) : this.proxy.value === el
    },
    isDisabled(el) {
      if (Array.isArray(this.proxy.disabled)) {
        console.log(this.proxy.disabled.includes(el))
        return this.proxy.disabled.includes(el) ? 'disabled' : ''
      }
      if (typeof this.proxy.disabled === 'boolean') {
        return this.proxy.disabled ? 'disabled' : ''
      }
      if (el === this.proxy.disabled) {
        return el ? 'disabled' : ''
      }
    },
    render() {
      const buttons = this.param.options.buttons
      return buttons?.reduce((accum, el, index) => accum + `
        <button class="${this.method.isActive(el) ? 'l-active' : ''}" data-index="${index + 1}" size="${this.param.size}" ${this.method.isDisabled(el)}><span>${el}</span></button>
        `, '')
    },
    active(v, index) {
      if (Array.isArray(this.proxy.value)) {
        const i = this.proxy.value.indexOf(v)
        i === -1 ? this.proxy.value.push(v) : this.proxy.value.splice(i, 1)
      } else {
        this.proxy.value = v
      }
      this.method.action?.({ name: this.param.name, value: v, index, values: this.proxy.value })
    },
    set(v) {
      if (Array.isArray(v)) return
      const index = this.param.options.buttons.indexOf(v)
      if (index === -1) return
      this.method.active(v, index)
    }
  }
}
