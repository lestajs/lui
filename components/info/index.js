import './index.css'

export default {
  props: {
    params: {
      text: {
        default: '...'
      }
    },
    methods: {
      onclose: {}
    }
  },
  nodes() {
    return {
      lstInfoTxt: {
        _html: this.param.text,
        ontoggle: (e) => e.newState === 'closed' && this.method.onclose?.()
      }
    }
  },
  loaded() {
    const uid = Math.random().toString(16).slice(8)
    this.options.template = `<button class="lstInfoBtn" popovertarget="${uid}">i</button><div class="lstInfoTxt" id="${uid}" popover></div>`
  }
}