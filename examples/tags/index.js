import { createApp } from 'lesta'
import '/components/general.css'
import tags from '/components/form/tags'
import button from '/components/form/button'

const root = document.querySelector('#root')
const app = createApp()

const component = {
  template: `
  <div class="multipleTags"></div>
  <div class="singleTags"></div>
  <hr>
  <div class="l-fx l-gap">
    <div class="disableBtn"></div>
    <div class="errorBtn"></div>
  </div>
  `,
  proxies: {
    disabled: false,
    error: false
  },
  params: {
    list: ['Lesta', 'React', 'Angular', 'Vue', 'Lesta 2', '123', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L']
  },
  nodes() {
    return {
      multipleTags: {
        component: {
          src: tags,
          proxies: {
            value: () => [],
            disabled: () => this.proxy.disabled,
            error: () => this.proxy.error
          },
          params: {
            text: 'Multiple mode, small, maxlength = 3',
            name: 'multipleTags',
            heading: 'Choosing of multiple buttons.',
            description: 'Here you can select a multiple buttons and 3 of ones will be displayed in main field.',
            multiple: true,
            maxlength: 3,
            list: this.param.list
          }
        }
      },
      singleTags: {
        component: {
          src: tags,
          proxies: {
            value: () => [],
            disabled: () => this.proxy.disabled,
            error: () => this.proxy.error
          },
          params: {
            text: 'Single mode, medium, maxlength = 1',
            heading: 'Choosing of single button.',
            description: 'Here you can select only one button and it will be displayed in main field.',
            size: 'medium',
            name: 'singleTags',
            multiple: false,
            maxlength: 1,
            list: this.param.list
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
      }
    }
  }
}

app.mount(component, root, { params: {}})