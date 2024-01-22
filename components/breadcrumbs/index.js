import buttons from '../buttons'
import './index.css'

export default {
  template: `<div class="lstBreadcrumbs"></div>`,
  props: {
    proxies: {
      value: {}
    },
    params: {
      navigate: {},
      numbered: {}
    },
    methods: {
      change: {}
    }
  },
  nodes() {
    return {
      lstBreadcrumbs: {
        component: {
          src: buttons,
          proxies: {
            value: () => this.proxy.value
          },
          params: {
            size: 'medium',
            options: {
              buttons: this.param.navigate
            }
          },
          methods: {
            change: (_, index) => this.method.change?.(index)
          }
        }
      }
    }
  }
}