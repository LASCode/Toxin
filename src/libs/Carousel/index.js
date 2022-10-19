import 'owl.carousel';
import { defaultOptions } from './options';
import './styles.scss';

export class Carousel {
  constructor(rootNode, options) {
    this.rootNode = rootNode;
    this.options = { ...defaultOptions, ...options };
    this.init();
  }

  init() {
    this.rootNode.owlCarousel(this.options);
  }
}
