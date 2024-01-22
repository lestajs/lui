import { createApp } from 'lesta'
import '/components/general.css'
import checkbox from '/components/form/checkbox'
import '/components/form/checkbox/index.css'

const root = document.querySelector('#root')
const app = createApp()

const component = {
  template: `<div class="example1"></div>`,
  nodes() {
    return {
      example1: {
        component: {
          src: checkbox
        }
      }
    }
  }
}

app.mount(component, root, {params: {}})