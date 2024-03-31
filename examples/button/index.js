import { createApp } from 'lesta'
import '/components/general.css'
import button from '/components/form/button'
import '/components/form/button/index.css'

const root = document.querySelector('#root')
const app = createApp()

const component = {
  template: `
  <div class="l-fx l-gap">
    <div class="small"></div>
    <div class="medium"></div>
    <div class="large"></div>
    <div class="activatedBtn"></div>
    <div class="notActivatedBtn"></div>
  </div>
  <div class="result"></div>
  <div class="l-fx l-gap">
    <div class="btn1"></div>
    <div class="btn2"></div>
    <div class="btn3"></div>
    <div class="btn4"></div>
  </div>`,
  proxies: {
    disabled: false,
    error: false,
    result: ''
  },
  nodes() {
    return {
      small: {
        component: {
          src: button,
          proxies: {
            value: 'Small',
            disabled: () => this.proxy.disabled
          },
          params: {
            name: 'small',
            size: 'small',
            type: 'primary'
          },
          methods: {
            action: this.method.result
          }
        }
      },
      medium: {
        component: {
          src: button,
          proxies: {
            value: 'Medium',
            error: () => this.proxy.error
          },
          params: {
            name: 'medium',
            type: 'warn'
          },
          methods: {
            action: this.method.result
          }
        }
      },
      large: {
        component: {
          src: button,
          proxies: {
            value: 'Large',
            error: false
          },
          params: {
            name: 'large',
            size: 'large',
            type: 'accent',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false"><path d="m9.4 18.4-.7-.7 5.6-5.6-5.7-5.7.7-.7 6.4 6.4-6.3 6.3z"></path></svg>',
            iconPosition: 'end'
          },
          methods: {
            action: this.method.result
          }
        }
      },
      activatedBtn: {
        component: {
          src: button,
          proxies: {
            value: 'Active',
            activated: () => false
          },
          params: {
            name: 'activatedBtn'
          },
          methods: {
            action: ({ activated }) => {
            }
          }
        }
      },
      notActivatedBtn: {
        component: {
          src: button,
          proxies: {
            value: 'Not Active',
            activated: () => ''
          },
          params: {
            name: 'notActivatedBtn'
          },
          methods: {
            action: ({ activated }) => {
              activated = true
            }
          }
        }
      },
      result: {
        _text: () => 'Last action: ' + this.proxy.result
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
            value: 'Change value (external method)'
          },
          methods: {
            action: () => this.node.large.method.set('Large Changed')
          }
        }
      },
      btn4: {
        component: {
          src: button,
          proxies: {
            value: 'Spinner (external method)'
          },
          methods: {
            action: () => this.node.large.method.spinner(true)
          }
        }
      }
    }
  },
  methods: {
    result({ name, value, icon }) {
      this.proxy.result = name + ': ' + value + (icon ? ' | icon' : '')
    }
  }
}

app.mount(component, root)