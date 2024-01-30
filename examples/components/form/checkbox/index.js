import { createApp } from 'lesta'
import '/components/general.css'
import checkbox from '/components/form/checkbox'
import button from '/components/form/button'
import '/components/form/checkbox/index.css'

const root = document.querySelector('#root')
const app = createApp()

const component = {
  template: `
  
  <hr>
  <div class="example1"></div>
  <div class="l-container">
    <div class="example2"></div>
    <div class="example3"></div>
    <div class="example4"></div>
  </div>
  <hr>
  <div class="example5"></div>
  <div class="l-fx l-gap">
    <button class="btn1"></button>
    <button class="btn2"></button>
    <button class="btn3"></button>
  </div>`,
  proxies: {
    value: false,
    disabled: false,
    mainValue: false,
    error: false
  },
  nodes () {
    return {
      example1: {
        component: {
          src: checkbox,
          proxies: {
            value: () => this.proxy.mainValue
          },
          params: {
            name: '',
            text: 'Select all options'
          },
          methods: {
            action: (n, v) => this.proxy.mainValue = !this.proxy.mainValue
          }
        }
      },
      example2: {
        component: {
          src: checkbox,
          proxies: {
            value: () => this.proxy.mainValue
          },
          params: {
            size: () => 'small',
            text: () => 'Option A'
          },
          methods: {
          
          }
        }
      },
      example3: {
        component: {
          src: checkbox,
          proxies: {
            value: () => this.proxy.mainValue
          },
          params: {
            size: () => 'small',
            text: () => 'Option B'
          },
          methods: {
          
          }
        }
      },
      example4: {
        component: {
          src: checkbox,
          proxies: {
            value: () => this.proxy.mainValue
          },
          params: {
            size: () => 'small',
            text: () => 'Option C'
          }
        }
      },
      example5: {
        component: {
          src: checkbox,
          proxies: {
            disabled: () => this.proxy.disabled,
            error: () => this.proxy.error
          },
          params: {
            text: () => 'Test of disable'
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
            value: () => this.proxy.error ? 'No Error' : 'Error'
          },
          methods: {
            action: () => {
              this.proxy.error = !this.proxy.error
            }
          }
        }
      },
      btn3: {
        component: {
          src: button,
          proxies: {
            value: 'Checked'
          },
          methods: {
            action: () => this.node.example5.method.set(true)
          }
        }
      }
    }
  }
}

app.mount(component, root, {params: {}})