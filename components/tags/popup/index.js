import buttons from '../../buttons'
import input from '../../input'

import './index.css'

export default {
  template: `
      <div class="lstPopupTop l-fx l-ai-c">
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
            action: this.method.filter
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
      }
      // lstPopupResult: {
      //   component: {
      //     src: buttons,
      //     proxies: {
      //       value: {}
      //     },
      //     params: {
      //       options: {
      //         buttons: this.param.list
      //       }
      //     },
      //     methods: {
      //       change: this.method.update
      //     }
      //   }
      // }
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
        this.proxy.selected = selected
      } else {
        this.proxy.selected = this.proxy.selected[0] !== v ? [v] : []
        this.node.lstPopupList.children[this.param.index]?.classList.remove('l-active')
        this.param.index = index
        this.node.lstPopupList.children[index]?.classList.toggle('l-active')
      }
      // this.node.lstPopupResult.method.set(this.proxy.selected)
    },
    search({ value }) {
      this.proxy.list = this.param.list.filter(el => el.toUpperCase().indexOf(value.toUpperCase()) !== -1)
    },
    filter({ value }) {
      this.proxy.nav = value
      this.proxy.list = value === '#' ? this.param.list : this.param.list.filter(el => el.charAt(0).toUpperCase() === value)
    },
    render() {
      return this.proxy.list.reduce((accum, el, index) => accum + `
        <li tabIndex="0" class="${this.proxy.selected.includes(el) ? ' l-active' : ''}" data-index="${index}" size="mini">${el}</li>`, '')
    }
  },
  created() {
    function getFirstLetters(strings) {
      const firstLetters = []
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
