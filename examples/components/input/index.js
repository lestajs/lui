import { createApp } from 'lesta'
import '/components/general.css'
import input from '/components/form/input/index.js'
import button from '/components/form/button'
import '/components/form/input/index.css'

const root = document.querySelector('#root')
const app = createApp()

const component = {
  template: `
  <hr>
  <div class="l-fx l-gap">
  <div class="example1"></div>
  <div class="btn1"></div>

  </div>
  <hr>
  <div class="example2"></div>
  <div class="example3"></div>
  <div class="example4"></div>
  <div class="btn2"></div>
    `,
  proxies: {
    value: ' ',
    disabled: false,
    valueTest: 'text',
    error: false
  },
  nodes() {
    return {
      example1: {
        component: {
          src: input,
          proxies: {
            disabled: () => this.proxy.disabled,
            value: () => this.proxy.valueTest
          },
          params: {
            name: 'option A',
            text: 'option A'
          },

          methods: {
            action: () => this.proxy.valueTest = !this.proxy.valueTest
          }
        }
      },
      example2: {
        component: {
          src: input,
          proxies: {

          },
          params: {
            options: { placeholder: 'введите число'
            },
            name: 'qwert',
            type: 'number',
            text: 'option B'
          },

          methods: {

          }
        }
      },
      example3: {
        component: {
          src: input,
          proxies: {
            value: '',
            error: () => this.proxy.error
          },
          params: {
            options: { placeholder: 'введите ваш email'
            },
            type: 'text',
            text: 'option C'
          },

          methods: {
            onfocus: () => {
              if (this.proxy.error) {
                this.proxy.error = false
              }
            },
            onblur: () => {
              if (this.node.example3.proxy.value !== '@') {
                this.proxy.error = true
              }
            }
          }
        }
      },
      example4: {
        component: {
          src: input,
          proxies: {
            value: () => this.proxy.value
          },
          params: {
            text: 'option D'
          },

          methods: {
          }
        }
      },
      btn1: {
        component: {
          src: button,
          proxies: {
            value: () => this.proxy.disabled ? 'Enabled' : 'Disabled'
          },
          methods: {
            action: () => {
              this.proxy.disabled = !this.proxy.disabled
            }
          }
        }
      },
      btn2: {
        component: {
          src: button,
          proxies: {
            value: () => this.proxy.value ? 'Crear' : 'Crear'
          },
          methods: {
            action: () => {
              this.proxy.value = ''
            }
          }
        }
      }
    }
  }
}

app.mount(component, root)
