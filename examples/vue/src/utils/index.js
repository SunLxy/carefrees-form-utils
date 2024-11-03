

export class instanceDemo {
  store = {};

  fun

  updated = (value) => {
    this.store = { ...this.store, ...value }
    fun?.()
  }

  getValue = (field) => {
    return this.store[field]
  }

  register = (item) => {
    fun = item
  }

}

