import { createApp } from 'lesta'
import '/components/general.css'
import accordion from '/components/accordion'
import button from '/components/form/button'
import '/components/accordion/index.css'

const root = document.querySelector('#root')
const app = createApp()

const component = {
  template: `<div class="example1"></div><div class="btn"></div>`,
  proxies: {
    value: false,
  },
  nodes () {
    return {
      example1: {
        component: {
          src: accordion,
          proxies: {
            value: () => this.proxy.value
          },
          params: {
            name: '',
            text: 'Accordion'
          },
          methods: {
            action: (n, v) => this.proxy.value = !this.proxy.value
          },
          sections: {
            content: {
              src: {
                template: `Basically, the first child css will target the first paragraph element inside the parent tag, and the rest of the paragraph element will be ignored, that is, if we add styling with the first child selector for the paragraph tag, only the first paragraph tag will be styled, and the rest of the paragraph tag will not be ...`
              }
            }
          }
        }
      },
      btn: {
        component: {
          src: button,
          proxies: {
            value: () => this.proxy.value ? 'Open' : 'Close'
          },
          methods: {
            action: () => {
              this.proxy.value = !this.proxy.value
            }
          }
        }
      }
    }
  }
}

app.mount(component, root, {params: {}})