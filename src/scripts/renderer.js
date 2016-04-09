import _ from 'lodash'

class Renderer {
  constructor ({ el, x = 16, y = 16 }) {
    this.el = el
    this.x = x
    this.y = y
    this.grid = this.initGrid()
    console.log(this.initGrid())
  }

  render () {
    const html = `${this.grid.map((n, i) => {
      i = i + 1
      const brk = (i % this.y === 0)
      return `<span class="pixel" data-filled="${n}"></span>${brk ? '<div class="break"></div>' : ''}`
    }).join('')}`

    this.el.innerHTML = html
  }

  initGrid () {
    const grid = []
    for (let i = 0; i < this.x * this.y; i++) {
      grid[i] = 0
    }
    return grid
  }

  updateGrid (fxn) {
    this.grid = fxn(this.grid)
  }
}

export default Renderer
