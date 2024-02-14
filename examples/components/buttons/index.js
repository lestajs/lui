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
    <div class="clearBtn"></div>
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
    disabled: false,
    clearDisable: false,
    error: false
  },
  params: {
    arrayRadioBtns: ['Option A', 'Option B', 'Option C'],
    arrayStringBtns: ['Option A', 'Option B', 'Option C'],
    arraySetBtns: ['Option A'],
    nSet: 'setButtons',
    vSet: 'Option A',
    iSet: '0'
  },
  nodes() {
    return {
      radioButtons: {
        component: {
          src: buttons,
          proxies: {
            value: () => this.proxy.valueRadioBtns,
            disabled: () => this.proxy.disabled,
            error: () => this.proxy.error
          },
          params: {
            text: 'Selector of small radio-buttons',
            type: 'radio',
            name: 'radioButtons',
            options: {
              buttons: this.param.arrayRadioBtns
            }
          },
          methods: {
            action: (n, v, i) => {
              this.method.setResult(n, v, i)
              this.proxy.valueRadioBtns = this.param.arrayRadioBtns[i]
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
            action: (n, v, i) => {
              this.proxy.disabled = !this.proxy.disabled
              console.log(this.param.arrayRadioBtns[i])
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
      clearBtn: {
        component: {
          src: button,
          proxies: {
            value: () => 'Clear',
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
            text: 'Selector of medium string-buttons',
            name: 'stringButtons',
            type: 'text',
            size: 'medium',
            options: {
              buttons: this.param.arrayStringBtns
            }
          },
          methods: {
            action: (n, v, i, arr) => {
              this.proxy.valueStringBtns = arr
              this.method.setResult(n, v, i)
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
            text: 'Selector of large button-buttons',
            name: 'setButtons',
            type: 'button',
            size: 'large',
            options: {
              buttons: this.param.arraySetBtns
            }
          },
          methods: {
            action: (n, v, i) => {
              this.proxy.valueSetBtns ? this.proxy.valueSetBtns = this.param.arraySetBtns[i] : this.proxy.valueSetBtns = ''
              this.method.setResult(n, v, i)
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
              this.proxy.valueSetBtns === '' ? this.proxy.valueSetBtns = this.param.arraySetBtns[0] : this.proxy.valueSetBtns = ''
              this.method.setResult(this.param.nSet, this.param.vSet, this.param.iSet)
            }
          }
        }
      },
      resultTxt: {
        component: {
          src: text,
          proxies: {
            value: (n, v, i) => 'Last action: ' + this.proxy.result
          }
        }
      }
    }
  },
  methods: {
    setResult(n, v, i) {
      this.proxy.result = n + ' ' + '-' + ' ' + v + ' ' + '-' + ' ' + i
    }
  }
}

app.mount(component, root)
