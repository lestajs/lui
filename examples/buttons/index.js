import { createApp } from 'lesta'
import '/components/general.css'
import buttons from '/components/form/buttons'
import text from '/components/form/text'
import button from '/components/form/button'
import '/components/form/buttons/index.css'

const root = document.querySelector('#root')
const app = createApp()

const component = {
  template: `
  <div class="radioButtons"></div>
  <div class="l-fx l-gap">
    <div class="disableBtn"></div>
    <div class="errorBtn"></div>
    <div class="resetBtn"></div>
  </div>
  <hr>
  <div class="stringButtons"></div>
  <hr>
  <div class="setButtons"></div>
  <div class="setBtn"></div>
  <hr>
  <div class="resultTxt"></div>
  `,
  proxies: {
    valueRadioBtns: '',
    valueStringBtns: [],
    valueSetBtns: '',
    result: '',
    disabled: ['Option D', 'Option Z', 'Option B'],
    error: false
  },
  params: {
    arrayRadioBtns: ['Option A', 'Option B', 'Option C', 'Option D'],
    arrayStringBtns: ['Option A', 'Option B', 'Option C', 'Option F'],
    arraySetBtns: ['Option A', 'Option B', 'Option C', 'Option Z']
  },
  nodes() {
    return {
      radioButtons: {
        component: {
          src: buttons,
          proxies: {
            value: () => this.proxy.valueRadioBtns,
            disabled: () => this.proxy.disabled, // ['Option D', 'Option Z', 'Option B']
            error: () => this.proxy.error
          },
          params: {
            text: 'Small size, radio type, single mode',
            type: 'radio',
            name: 'radioButtons',
            buttons: this.param.arrayRadioBtns
          },
          methods: {
            action: (v) => {
              this.method.setResult(v)
              this.proxy.valueRadioBtns = v.value
            }
          }
        }
      },
      disableBtn: {
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
      errorBtn: {
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
      resetBtn: {
        component: {
          src: button,
          proxies: {
            value: () => 'Reset',
            disabled: () => !this.proxy.valueRadioBtns
          },
          methods: {
            action: () => {
              this.proxy.valueRadioBtns = ''
            }
          }
        }
      },
      stringButtons: {
        component: {
          src: buttons,
          proxies: {
            value: () => this.proxy.valueStringBtns,
            disabled: () => this.proxy.disabled,
            error: () => this.proxy.error
          },
          params: {
            text: 'Medium size, text type, multiple mode',
            name: 'stringButtons',
            type: 'text',
            size: 'medium',
            buttons: this.param.arrayStringBtns
          },
          methods: {
            action: (v) => {
              this.proxy.valueStringBtns = v.values
              this.method.setResult(v)
            }
          }
        }
      },
      setButtons: {
        component: {
          src: buttons,
          proxies: {
            value: () => this.proxy.valueSetBtns,
            disabled: () => this.proxy.disabled,
            error: () => this.proxy.error
          },
          params: {
            text: 'Large size, button type, single mode',
            name: 'setButtons',
            size: 'large',
            buttons: this.param.arraySetBtns
          },
          methods: {
            action: (v) => {
              this.proxy.valueSetBtns = v.value
              this.method.setResult(v)
            }
          }
        }
      },
      setBtn: {
        component: {
          src: button,
          proxies: {
            value: 'Set'
          },
          methods: {
            action: () => {
              this.node.setButtons.method.set('Option B')
            }
          }
        }
      },
      resultTxt: {
        component: {
          src: text,
          proxies: {
            value: () => 'Last action: ' + this.proxy.result
          }
        }
      }
    }
  },
  methods: {
    setResult({ name, value, index }) {
      this.proxy.result = name + ' ' + '-' + ' ' + value + ' ' + '-' + ' ' + index
    }
  }
}

app.mount(component, root)