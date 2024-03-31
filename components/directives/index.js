const _classNext = {
  update: (node, value, key) => requestAnimationFrame(() => value ? node.classList.add(key) : node.classList.remove(key))  
}

const _attr = {
  update: (node, value, key) => {
    if (typeof value === 'boolean') {
      if (value) {
        node.setAttribute(key, '')
      } else node.removeAttribute(key)
    } else if (value) node.setAttribute(key, value)
  }
}

const _outside = {
  stop: (event) => event.stopPropagation(),
  create: (node, options) => {
    if (typeof options.change === 'function') {
      if (options.stop) node.addEventListener('click', this.stop)
      document.addEventListener('click', options.change)
    }
  },
  destroy: (node, options) => {
    if (options.stop) node.removeEventListener('click', this.stop)
    document.removeEventListener('click', options.change)
  }
}

export { _classNext, _attr, _outside }
