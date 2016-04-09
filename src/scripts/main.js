import 'styles/main.scss'
import transforms from 'scripts/transforms';
import Renderer from 'scripts/renderer'

const renderer = new Renderer({ el: document.body, x: 64, y: 64 })

const sequence = function () {
  const fxns = Array.prototype.slice.call(arguments)
  return result => {
    fxns.forEach(fxn => result = fxn.call(this, result))
    return result
  };
};

renderer.render()
renderer.updateGrid(transforms.initGrid)
renderer.render()

const frames = [];
const updates = {
  '0-29': sequence(
    // transforms.moveNodesDown,
    // transforms.moveNodesRight,
    transforms.expandNodesLeft,
    transforms.expandNodesRight,
    transforms.expandNodesDown,
    transforms.expandNodesUp
  ),
  // '30-60': transforms.moveNodesDown
}

_.each(updates, (val, key) => {
  const nums = key.split('-');
  const start = parseInt(nums[0], 10);
  const finish = parseInt(nums[1], 10);
  for (let i = start; i <= finish; i++) {
    frames[i] = val;
  }
})

console.log(frames)

let frame = 0;
const interval = window.setInterval(() => {
  if (frames[frame]) {
    renderer.updateGrid(frames[frame])
    renderer.render()
  } else {
    window.clearInterval(interval);
  }
  frame++;
}, 16)
