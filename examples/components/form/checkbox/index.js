import { createApp } from 'lesta'
import '/components/general.css'
import checkbox from '/components/form/checkbox'
import '/components/form/checkbox/index.css'

const root = document.querySelector('#root')
const app = createApp()

const component = {
  template: `<div class="example1"></div><button class="btn">toggle</button>`,
  proxies: {
    value: false
  },
  nodes() {
    return {
      btn: {
        onclick: () => this.proxy.value = !this.proxy.value // this.node.example1.method.set(true)
      },
      example1: {
        component: {
          src: checkbox,
          proxies: {
            value: () => this.proxy.value
          },
          methods: {
            action: (n, v) => console.log(v)
          }
        }
      }
    }
  }
}

app.mount(component, root, {params: {}})