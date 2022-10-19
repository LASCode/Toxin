import nouislider from 'nouislider';
import 'nouislider/src/nouislider.less';
import './style.scss';
import { defaultOptions } from './options';

export class Slider {
  constructor(rootNode, options) {
    this.rootNode = rootNode;
    this.options = { ...defaultOptions, ...options };
    this.init();
  }

  init() {
    nouislider.create(this.rootNode, {
      start: [this.options.from, this.options.to],
      tooltips: {
        to: this.options.tooltips,
      },
      connect: this.options.progress,
      range: {
        min: this.options.min,
        max: this.options.max,
      },
    });
  }

  onSlide(func) {
    this.rootNode.noUiSlider.on('slide', func);
  }

  setValue(value) {
    this.rootNode.noUiSlider.updateOptions({
      start: value,
    });
  }

  getValue() {
    return this.rootNode.noUiSlider.get();
  }
}
