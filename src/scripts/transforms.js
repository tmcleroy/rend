const transforms = {
  initGrid: g => {
    const grid = [ ...g ]
    grid[1750] = 1
    grid[1250] = 1
    return grid
  },

  moveNodesDown: g => {
    const grid = new Array(g.length).fill(0)
    _.each(g, (val, i) => {
      if (val) {
        const j = i + Math.sqrt(g.length)
        if (j < grid.length) grid[j] = 1
      }
    })
    return grid;
  },

  moveNodesRight: g => {
    const grid = new Array(g.length).fill(0)
    _.each(g, (val, i) => {
      if (val) {
        const j = i + 1
        if (j % Math.sqrt(g.length)) grid[j] = 1
      }
    })
    return grid;
  },

  expandNodesRight: g => {
    const grid = [ ...g ];
    _.each(g, (val, i) => {
      if (val) {
        const j = i + 1
        if (j < grid.length && j % Math.sqrt(g.length)) grid[j] = 1;
      }
    })
    return grid
  },

  expandNodesLeft: g => {
    const grid = [ ...g ];
    _.each(g, (val, i) => {
      if (val) {
        const j = i - 1
        if (j >= 0 && j ? j % Math.sqrt(g.length) : true) grid[j] = 1;
      }
    })
    return grid
  },

  expandNodesDown: g => {
    const grid = [ ...g ];
    const dim = Math.sqrt(g.length);
    _.each(g, (val, i) => {
      if (val) {
        const j = i + dim
        if (j < grid.length && j % dim) grid[j] = 1;
      }
    })
    return grid
  },

  expandNodesUp: g => {
    const grid = [ ...g ];
    const dim = Math.sqrt(g.length);
    _.each(g, (val, i) => {
      if (val) {
        const j = i - dim
        if (j >= 0 && j % dim) grid[j] = 1;
      }
    })
    return grid
  }
}

export default transforms
