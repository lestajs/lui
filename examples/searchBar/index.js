import { createApp } from 'lesta'
import '/components/general.css'
import searchBar from '/components/searchBar'

const root = document.querySelector('#root')
const app = createApp()

const component = {
  template: `<div class="example" style="width: 200px"></div>`,
  proxies: {
    value: 'tesr',
    result: ['fgj']
  },
  nodes() {
    return {
      example: {
        component: {
          src: searchBar,
          proxies: {
            value: () => this.proxy.value,
            result: () => this.proxy.result
          },
          params: {
            name: 'search'
          },
          methods: {
            action: ({ value }) => {
              this.proxy.result.push(value)
            },
            onselect: ({ value, index }) => {
              this.proxy.value = value
            }
          }
        }
      }
    }
  },
  methods: {
  }
}

app.mount(component, root)
