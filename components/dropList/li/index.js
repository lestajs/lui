import { _attr } from '../../directives'

export default {
  template: `<button class="lstDrpLi l-fx l-ai-c l-br"><span class="lstDrpLiTxt"></span><span class="lstDrpLiAct"></span></button>`,
  directives: { _attr },
  props: {
    proxies: {
      li: {},
      selected: {},
      active: {},
      disabled: {},
      draggable: {}
    },
    params: {
      index: {},
      size: {}
    },
    methods: {
      active: {},
      action: {},
      select: {},
      change: {}
    }
  },
  nodes() {
    return {
      lstDrpLi: {
        _attr: {
          size: this.param.size,
          name: this.param.index
        },
        _class: {
          selected: () => this.proxy.selected,
          active: () => this.proxy.active,
        },
        ondragstart: () => this.method.select(this.param.index),
        ondragend: () => this.method.select(null),
        ondragover: () => this.method.change(this.param.index),
        onclick: () => this.method.action(this.param.index),
        disabled:() => this.proxy.disabled,
        draggable:() => this.proxy.draggable
      },
      lstDrpLiTxt: {
        textContent: () => this.proxy.li
      },
      // lstDrpLiAct: {
      //   onclick: (event) => {
      //     event.stopPropagation(),
      //     this.method.action(this.param.index)
      //   }
      // }
    }
  }
}