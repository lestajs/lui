import { createApp } from 'lesta'
import '/components/general.css'
import input from '/components/form/input'
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
  </div>
    `,
  proxies: {
    value: 'value',
    valueTest: '',
    disabled: false,
    error: false,
    focused: false
  },
  nodes() {
    return {
      small: {
        component: {
          src: input,
          proxies: {
            value: () => this.proxy.value
          },
          params: {
            text: '----',
            name: '---',
            size: 'small'
          },
          methods: {
            action: ({ value, name }) => {
              this.proxy.value = value
              this.proxy.value = name
            }
            // onfocus: (v) => {
            //   this.node.small.method.set(v)
            // }
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
              this.proxy.value = ''
            }
          }
        }
      },
      medium: {
        component: {
          src: input,
          proxies: {
            disabled: () => this.proxy.disabled
          },
          params: {
            options: {
              info: 'autocomplete off',
              attributes: {
                placeholder: 'enter your email'
              }
            },
            type: 'email',
            name: 'email(disabled)',
            text: 'email '
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
          src: input,
          proxies: {
            value: () => this.proxy.valueTest,
            error: () => this.proxy.valueTest.length <= 3
          },
          params: {
            options: {
              attributes: {
                placeholder: 'enter value length > 3'
              }
            },
            text: 'focus/blur',
            size: 'large'
          },
          methods: {
            action: ({ value }) => this.proxy.valueTest = value,
            onblur: (v) => {
              console.log(v)
              // if (this.proxy.error) {
              //   this.proxy.valueTest = 'your name is short'
              // } if (!this.proxy.error) {
              //   this.proxy.valueTest = 'your name is ' + v
              // } if (v === '') {
              //   this.proxy.valueTest = ''
              // }
            },
            onfocus: () => {
              this.node.large.method.select(true)
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
              this.proxy.focused ? this.node.large.method.focus(true) : this.node.large.method.blur(true)
            }
          }
        }
      }
    }
  }
}

app.mount(component, root)
