import './index.css'

export default {
  template: `<div class="lstProgress" style="--value: 0%"></div>`,
  props: {
    proxies: {
      value: {
        default: 0
      }
    }
  },
  setters: {
    value(v) {
      if (v <= 100) return v
    }
  },
  handlers: {
    value(v) {
      this.node.lstProgress.style = `--value: ${v}%`
    }
  },
  nodes() {
    return {
      lstProgress: {}
    }
  }
}
