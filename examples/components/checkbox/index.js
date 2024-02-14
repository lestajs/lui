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
  <div class="result"></div>
  <hr>
  <div class="example5"></div>
  <div class="l-fx l-gap">
    <div class="btn1"></div>
    <div class="btn2"></div>
    <div class="btn3"></div>
  </div>`,
  proxies: {
    disabled: false,
    mainValue: false,
    valueTest: false,
    error: false,
    result: ''
  },
  nodes() {
    return {
      example1: {
        component: {
          src: checkbox,
          proxies: {
            value: () => this.proxy.mainValue
          },
          params: {
            text: 'Select all options',
            name: 'jhkhj'
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
            name: 'small',
            size: 'small',
            text: 'Small size'
          },
          methods: {
            action: this.method.setResult
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
            name: 'medium',
            text: 'Medium size'
          },
          methods: {
            action: this.method.setResult
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
            name: 'large',
            size: 'large',
            text: 'Large size'
          },
          methods: {
            action: this.method.setResult
          }
        }
      },
      result: {
        textContent: () => 'Last action: ' + this.proxy.result
      },
      example5: {
        component: {
          src: checkbox,
          proxies: {
            value: () => this.proxy.valueTest,
            disabled: () => this.proxy.disabled,
            error: () => this.proxy.error
          },
          params: {
            text: () => 'Test of change'
          },
          methods: {
            action: () => this.proxy.valueTest = !this.proxy.valueTest
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
            value: () => this.proxy.error ? 'No Error' : 'Error',
            disabled: () => this.proxy.valueTest
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
            value: 'Checked (external method)'
          },
          methods: {
            action: () => this.node.example5.method.set(true)
          }
        }
      }
    }
  },
  methods: {
    setResult(n, v) {
      this.proxy.result = n + '-' + v
    }
  }
}

app.mount(component, root, { params: {}})