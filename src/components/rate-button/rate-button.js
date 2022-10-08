import { RateButtonStar } from './RateButtonStar';
import './rate-button.scss';

class RateButton {
  constructor(rootNode) {
    this.$rootNode = $(rootNode);
    this.$body = this.$rootNode.find('.js-rateButtonBody');
    this.$input = this.$rootNode.find('.js-rateButtonInput');
    this.options = this.$rootNode.data();
    this.state = this.options;
    this.tempState = {};
    this.starsArray = [];
    this.createStars();
    this.setValue(this.options.value);
    this.setListeners();
  }

  createStars() {
    for (let i = 0; i < this.options.stars; i += 1) {
      this.starsArray.push(new RateButtonStar(this.$body, i + 1));
    }
  }

  setListeners() {
    this.onMove = this.onMove.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.onClick = this.onClick.bind(this);
    if (this.options.readonly === undefined) {
      this.$body.on('click', this.onClick);
      this.$body.on('mouseover', this.onMove);
      this.$body.on('mouseleave', this.onDrop);
    }
  }

  setValue(value) {
    this.clear();
    this.starsArray.forEach((el, index) => {
      if (value - 1 >= index) {
        el.activate();
      }
    });
  }

  getValue() {
    return this.state.value;
  }

  clear() {
    this.starsArray.forEach((el) => {
      el.deactivate();
    });
  }

  validateState() {
    this.setValue(this.state.value);
    this.$input.val(this.state.value);
  }

  onClick(e) {
    const $target = $(e.target);
    const { index } = $target.data();
    if (this.state.value === 1 && index === 1) {
      this.state.value = 0;
    } else {
      this.state.value = index;
    }
    this.validateState();
  }

  onMove(e) {
    const $target = $(e.target);
    const isStar = $target.hasClass('rate-button__star');
    const { index } = $target.data();
    if (this.tempState.value !== undefined) {
      this.tempState.value = this.state.value;
    }
    if (isStar) {
      this.tempState.value = index;
      this.setValue(this.tempState.value);
    }
  }

  onDrop() {
    this.tempState = {};
    this.setValue(this.state.value);
  }
}

$('.js-rateButton').each((index, el) => {
  new RateButton(el);
});
