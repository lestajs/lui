import buttons from '../../buttons'
import input from '../../input'

import './index.css'

export default {
  template: `
      <div class="l-fx l-ai-c">
        <div class="lstPopupSearch"></div>
        <div class="lstPopupNav"></div>
      </div>
      <ul class="lstPopupList l-fx"></ul>
      <div class="lstPopupResult"></div>`,
  params: {
    nav: [],
    index: null
  },
  props: {
    params: {
      list: {},
      multiple: {}
    },
    proxies: {
      list: {},
      selected: {}
    }
  },
  proxies: {
    nav: '#'
  },
  nodes() {
    return {
      lstPopupSearch: {
        component: {
          src: input,
          params: {
            size: 'medium',
            type: 'search'
          },
          methods: {
            change: this.method.search
          }
        }
      },
      lstPopupNav: {
        component: {
          src: buttons,
          proxies: {
            value: () => this.proxy.nav,
            error: {}
          },
          params: {
            options: {
              buttons: this.param.nav
            }
          },
          methods: {
            change: this.method.filter
          }
        }
      },
      lstPopupList: {
        _html: () => this.method.render(),
        onclick: (event) => {
          if (event.target.closest('.lstPopupList > li')) {
            const index = +event.target.dataset.index
            this.method.update(this.proxy.list[index], index)
          }
        }
      },
      lstPopupResult: {
        component: {
          src: buttons,
          params: {
            size: 'mini'
          },
          proxies: {
            value: () => this.proxy.selected,
          },
          methods: {
            change: this.method.update
          }
        }
      }
    }
  },
  methods: {
    getSelected() {
      return this.proxy.selected
    },
    update(v, index) {
      if (this.param.multiple) {
        const selected = this.proxy.selected
        const active = selected.indexOf(v)
        active === -1 ? selected.push(v) : selected.splice(active, 1)
        this.node.lstPopupList.children[index]?.classList.toggle('l-active')
      } else {
        this.proxy.selected = this.proxy.selected[0] !== v ? [v] : []
        this.node.lstPopupList.children[this.param.index]?.classList.remove('l-active')
        this.param.index = index
        this.node.lstPopupList.children[index]?.classList.toggle('l-active')
      }
      this.node.lstPopupResult.method.update(this.proxy.selected)
    },
    search(v) {
      this.proxy.list = this.param.list.filter(el => el.toUpperCase().indexOf(v.toUpperCase()) !== -1)
    },
    filter(v) {
      this.proxy.nav = v
      this.proxy.list = v === '#' ? this.param.list : this.param.list.filter(el => el.charAt(0).toUpperCase() === v)
    },
    render() {
      return this.proxy.list.reduce((accum, el, index) => accum + `
        <li tabIndex="0" class="${ this.proxy.selected.includes(el) ? ' l-active' : ''}" data-index="${index}" size="mini">${el}</li>`, '')
    }
  },
  created() {
    function getFirstLetters(strings) {
      let firstLetters = []
      strings.forEach((string) => {
        const firstLetter = string.charAt(0).toUpperCase()
        if (!firstLetters.includes(firstLetter)) {
          firstLetters.push(firstLetter.toUpperCase())
        }
      })
      firstLetters.unshift('#')
      return firstLetters
    }
    this.param.nav = getFirstLetters(this.proxy.list)
  }
}