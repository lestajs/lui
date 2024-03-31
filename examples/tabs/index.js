// import { createApp } from 'lesta'
// import '/components/general.css'
// import tabs from '/components/tabs'
// import button from '/components/form/button'

// const root = document.querySelector('#root')
// const app = createApp()

// const component = {
//   template: `
//   <div class="example1"></div>
//   <div class="l-fx l-gap">
//     <div class="btn1"></div>
//   </div>`,
//   proxies: {
//     index: 1,
//     arr: ['A', 'B', 'C']
//   },
//   nodes() {
//     return {
//       example1: {
//         component: {
//           src: tabs,
//           proxies: {
//             value: () => this.proxy.arr,
//             selectedIndex: () => this.proxy.index
//           },
//           methods: {
//             action: ({ name, index }) => {
//               this.proxy.index = index
//               this.node.example1.section.content.mount({
//                 src: {
//                   template: name + ': ' + index
//                 }
//               })
//             }
//           },
//           sections: {
//             content: {
//               src: {
//                 template: this.proxy.arr[this.proxy.index] + this.proxy.index
//               }
//             }
//           }
//         }
//       },
//       btn1: {
//         component: {
//           src: button,
//           proxies: {
//             value: 'Checked (external method)'
//           },
//           methods: {
//             action: () => this.proxy.arr.push('D')
//           }
//         }
//       }
//     }
//   }
// }

// app.mount(component, root)
import { createApp } from 'lesta'
import '/components/general.css'
import tabs from '/components/tabs'
import button from '/components/form/button'

const root = document.querySelector('#root')
const app = createApp()

const component = {
  template: `
    <div class="btn1">tdfh</div>
    <div class="example1"></div>
  `,
  proxies: {
    index: 1,
    arr: ['A', 'B', 'C']
  },
  methods: {
    addNewTab: () => {
      const newTabName = prompt('Enter tab name:')
      if (newTabName) {
        this.proxy.arr.push(newTabName)
      }
    }
  },
  nodes() {
    return {
      example1: {
        component: {
          src: tabs,
          proxies: {
            value: () => this.proxy.arr,
            selectedIndex: () => this.proxy.index
          },
          methods: {
            action: ({ name, index }) => {
              this.proxy.index = index
              this.node.example1.section.content.mount({
                src: {
                  template: name + ': ' + index
                }
              })
            }
          },
          sections: {
            content: {
              src: {
                template: this.proxy.arr[this.proxy.index] + this.proxy.index
              }
            }
          }
        }
      },
      btn1: {
        component: {
          src: button,
          proxies: {
            value: 'Checked (external method)'
          },
          methods: {
            action: () => this.proxy.arr.push('D')
          }
        }
      }
    }
  }
}

app.mount(component, root)
