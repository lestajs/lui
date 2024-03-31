import { createApp } from 'lesta'
import '/components/general.css'
import progress from '/components/progress'
import button from '/components/form/button'

const root = document.querySelector('#root')
const app = createApp()

const component = {
  template: `
  <div class="example l-content"></div>
  <div class="btn"></div>`,
  proxies: {
    value: 0
  },
  nodes() {
    return {
      example: {
        component: {
          src: progress,
          proxies: {
            value: () => this.proxy.value
          }
        }
      },
      btn: {
        component: {
          src: button,
          proxies: {
            value: '+ 20'
          },
          methods: {
            action: () => this.proxy.value += 20
          }
        }
      }
    }
  }
}

app.mount(component, root)
