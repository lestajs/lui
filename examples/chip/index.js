import { createApp } from 'lesta'
import '/components/general.css'
import chip from '/components/chip'
import button from '/components/button'

const root = document.querySelector('#root')
const app = createApp()

const component = {
  template: `
  <div class="smallChip"></div>
  <hr>
  <div class="addBtn"></div>
  `,
  proxies: {
    chipArr: ['A', 'B', 'C']
  },
  nodes() {
    return {
      smallChip: {
        component: {
          src: chip,
          proxies: {
            value: () => this.proxy.chipArr
          },
          methods: {
            action: ({ index, removal, name, value }) => {
              console.log(index, removal, name, value)
              if (removal) this.proxy.chipArr.splice(index, 1)
            }
          }
        }
      },
      addBtn: {
        component: {
          src: button,
          proxies: {
            value: 'Add random chip'
          },
          methods: {
            action: () => {
              this.proxy.chipArr.push(this.method.randomLetter())
            }
          }
        }
      }
    }
  },
  methods: {
    randomLetter() {
      return ('abcdefghijklmnopqrstuvwxyz'.charAt(Math.floor(Math.random() * 26)).toUpperCase())
    }
  }
}

app.mount(component, root)
