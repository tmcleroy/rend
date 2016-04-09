import 'styles/main.scss'
import Renderer from 'scripts/renderer'

const renderer = new Renderer({ el: document.body })

const initGrid = (g) => {
  const grid = [ ...g ]
  grid[47] = 1
  grid[48] = 1
  return grid
}

renderer.render()

renderer.updateGrid(initGrid);

renderer.render()
