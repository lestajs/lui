import { createApp } from 'lesta'
import '/components/general.css'
import inputNumber from '/components/form/inputNumber'
import button from '/components/form/button'

const root = document.querySelector('#root')
const app = createApp()

const component = {
  template: `
  <div class="l-fx l-gap">
  <div class="container">
    <div class="small"></div>
    <div class="btn1"></div>
  </div>
  <div class="container">
    <div class="medium"></div>
    <div class="btn2"></div>
  </div>
  <div class="container">
    <div class="large"></div>
    <div class="btn3"></div>
  </div>
  </div>`,
  proxies: {
    value: 10,
    disabled: false,
    error: false,
    focused: false
  },
  nodes() {
    return {
      small: {
        component: {
          src: inputNumber,
          proxies: {
            value: () => this.proxy.value
          },
          params: {
            name: 'fixed',
            text: 'select',
            size: 'small'
          },
          methods: {
            action: ({ value, name }) => {
              this.proxy.value = value + Number.parseFloat(name).toFixed(2)
            },
            onfocus: (v) => {
              this.node.small.method.select(true)
              this.node.small.method.set(v)
            }
          }
        }
      },
      btn1: {
        component: {
          src: button,
          proxies: {
            value: 'Clear'
          },
          methods: {
            action: () => {
              this.proxy.value = 0
            }
          }
        }
      },
      medium: {
        component: {
          src: inputNumber,
          proxies: {
            value: 33,
            disabled: () => this.proxy.disabled
          },
          params: {
            options: {
              attributes: {
                min: 16,
                max: 50
              },
              except: ['.', ',']
            },
            text: 'age 16-50 (disabled)'
          }
        }
      },
      btn2: {
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
      large: {
        component: {
          src: inputNumber,
          proxies: {
            error: () => this.proxy.error
          },
          params: {
            options: {
              info: 'enter the phone',
              attributes: {
                placeholder: 'enter the phone'
              }
            },
            text: 'focus/blur(error)',
            size: 'large'
          },
          methods: {
            onfocus: () => this.node.large.method.set(8),
            onblur: (v) => {
              if (v.length > 11) {
                this.proxy.error = true
              } if (v.length === 11) {
                this.proxy.error = false
              }
            }
          }
        }
      },
      btn3: {
        component: {
          src: button,
          proxies: {
            value: () => this.proxy.focused ? 'Blur' : 'Focus'
          },
          methods: {
            action: () => {
              this.proxy.focused = !this.proxy.focused
              if (this.proxy.focused) {
                this.node.large.method.focus(true)
              } else {
                this.node.large.method.blur(true)
              }
            }
          }
        }
      }
    }
  }
}

app.mount(component, root)
