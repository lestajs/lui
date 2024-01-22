import './index.css'
import { _attr } from '../directives'

export default {
  template: `
    <label class="lstUpl l-fx l-ai-c l-br l-jc-center" size="small">
        <input type="file" class="lstUplEl">
        <div>
          <div class="lstUplLd"></div>
          <div class="lstUplTxt">Перенесите файл</div>
          <div class="lstUploadCont l-fx"></div>
        </div>
    </label>`,
  directives: { _attr },
  props: {
    proxies: {
      value: {},
      disabled: {},
      error: {
        default: false
      },
    },
    params: {
      name: { default: '' },
      size: { default: 'small' },
      text: {},
      options: { default: {} }
    },
    methods: {
      change: {}
    }
  },
  params: {
    files: []
  },
  nodes() {
    return {
      lstUplTxt: {
        _text: () => this.param.text
      },
      lstUpl: {
        _attr: {
          size: this.param.size,
          title: this.param.options.title
        },
        _class: {
          lstError: () => this.proxy.error
        },
        ondrop: (event) => {
          event.preventDefault()
          event.stopPropagation()
          !this.proxy.disabled && this.method.check(event.dataTransfer.files)
          this.node.lstUpl.classList.remove('lstUplActive')
        },
        ondragleave: (event) => {
          event.preventDefault()
          event.stopPropagation()
          this.node.lstUpl.classList.remove('lstUplActive')
        },
        ondragover: (event) => {
          event.preventDefault()
          event.stopPropagation()
          !this.proxy.disabled && this.node.lstUpl.classList.add('lstUplActive')
        },
      },
      lstUplEl: {
        _attr: {
          multiple: this.param.options.multiple,
          accept: this.param.options.accept
        },
        name: this.param.name,
        disabled: () => this.proxy.disabled,
        onchange: (event) => this.method.check(event.target.files)
      },
      lstUploadCont: {
        onclick: (event) => {
          if (event.target.closest('span')) {
            event.preventDefault()
            const index = +event.target.parentNode.dataset.index - 1
            this.param.files.splice(index, 1)
            this.method.render()
          }
        }
      },
      lstUplLd: {}
    }
  },
  methods: {
    render() {
      const html = this.param.files.reduce((accum, el, index) => {
        return accum + `<div data-index="${index + 1}" class="${el.error ? 'lstErrItem' : ''}">${el.name}<span>✕</span></div>`
      }, '')
      this.node.lstUploadCont.innerHTML = html
      if (this.param.files.some(f => f.error === true)) {
        this.proxy.error = true
      } else {
        this.proxy.error = false
        this.method.change(this.param.files)
      }
    },
    check(files) {
      for (let i = 0; i < files.length; i++) {
        const file = files.item(i)
        if (file.type !== this.param.options.accept) return
        if (this.param.files.some(f => f.name === file.name)) return
        const fileSize = file.size
        const fileMb = fileSize / 1024 ** 2
        const target = { name: file.name, data: '', error: false }
        if (fileMb >= this.param.options.max || fileMb <= this.param.options.min) {
          target.error = true
        }
        if (!this.param.options.multiple) {
          this.param.files.push(target)
          this.method.add(file, target)
        } else {
          this.param.files[0] = target
          this.method.add(file, target)
        }
      }
    },
    add(file, target) {
      if (!target.error) {
        let reader = new FileReader()
        reader.onload = (event) => {
          target.data = reader.result
          this.method.render()
        }
        reader.onerror = () => {
          target.data.error = true
          this.method.render()
        }
        reader.readAsDataURL(file)
      } else this.method.render()
    },
    set(v) {
      this.proxy.value = v
    }
  }
}