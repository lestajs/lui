import './index.css'
import button from '/components/button'

export default {
  template: `<div class="lstChip l-fx"></div>`,
  props: {
    proxies: {
      value: { default: [] }
    },
    params: {
      name: { default: '' },
      size: { default: 'medium' }
    },
    methods: {
      action: {}
    }
  },
  nodes() {
    return {
      lstChip: {
        component: {
          iterate: () => this.proxy.value,
          src: button,
          proxies: {
            value: (el) => el
          },
          params: {
            name: (_, i) => i,
            icon: ' ',
            reverse: true,
            size: this.param.size
          },
          methods: {
            action: ({ value, name, icon }) => this.method.action({ name: this.param.name, value, index: name, removal: icon })
          }
        }
      }
    }
  },
  methods: {
    set(v) {
      this.proxy.value = v
    }
  }
}
