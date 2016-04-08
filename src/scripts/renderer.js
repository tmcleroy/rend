// import $ from 'cash';

class Renderer {
  constructor ({ el }) {
    this.el = el;
  }

  init () {
    this.el.innerHTML = '<h1>SOME TEST MARKUP</h1>';
  }
}

export default Renderer;
