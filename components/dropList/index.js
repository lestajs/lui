import './index.css'
import li from './li'

export default {
  template: `<div class="lstDrpList"></div>`,
  props: {
    proxies: {
      value: {
        default: []
      },
      disabled: {},
      error: {}
    },
    params: {
      name: { default: '' },
      size: {
        default: 'medium'
      },
      options: { default: {} }
    },
    methods: {
      action: {},
      change: {}
    }
  },
  proxies: {
    selected: false,
  },
  params: {
    current: null
  },
  nodes() {
    return {
      lstDrpList: {
        component: {
          src: li,
          iterate: () => this.proxy.value,
          proxies: {
            li: (li) => this.param.options.primaryKey ? li[this.param.options.primaryKey] : li,
            selected: (_, index) => this.proxy.selected === index,
            disabled: (li) => li.disabled,
            draggable: (li) => li.hasOwnProperty('draggable') ? li.draggable : this.param.options.draggable
          },
          params: {
            index: (_, index) => index,
            size: this.param.size
          },
          methods: {
            active: this.method.active,
            action: (index) => this.method.action(this.param.name, index),
            select: (index) => this.proxy.selected = index,
            change: (index) => this.param.current = index
          }
        },
        ondragover: (event) => {
          event.preventDefault()
          const selected = this.node.lstDrpList.children[this.proxy.selected]
          const current = this.node.lstDrpList.children[this.param.current]
          if (selected === current) return
          if(this.proxy.value[this.param.current].draggable === false ) return
          const v = this.proxy.value.map((el, index) => {
            if (index === this.proxy.selected) return this.proxy.value[this.param.current]
            if (index === this.param.current) return this.proxy.value[this.proxy.selected]
            return this.proxy.value[index]
          })
          this.method.change && this.method.change(v)
          // this.method.moved(this.proxy.selected, this.param.current)
          this.proxy.selected = this.param.current
        }
      }
    }
  }
}