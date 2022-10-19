import { singleItemDefaultOptions } from '../options';

export class SingleItem {
  constructor(rootNode, options) {
    this.rootNode = rootNode;
    this.options = { ...singleItemDefaultOptions, ...options };
    this.state = { ...this.options };
    this.createComponent();
    this.setListeners();
  }

  createComponent() {
    const createItemTitle = () => {
      const element = document.createElement('span');
      element.classList.add('item-select__item-title');
      element.textContent = this.options.title;
      return element;
    };
    const createPlusBtn = () => {
      const element = document.createElement('button');
      element.classList.add('item-select__item-btn');
      element.classList.add('item-select__item-btn--plus');
      element.classList.add('js-ItemSelectPlusBtn');
      element.setAttribute('data-action', 'plus');
      element.type = 'button';
      element.textContent = '+';
      this.$plusBtn = $(element);
      return element;
    };
    const createMinusBtn = () => {
      const element = document.createElement('button');
      element.classList.add('item-select__item-btn');
      element.classList.add('item-select__item-btn--minus');
      element.classList.add('js-ItemSelectMinusBtn');
      element.setAttribute('data-action', 'minus');
      element.type = 'button';
      element.textContent = '-';
      this.$minusBtn = $(element);
      return element;
    };
    const createItemCounter = () => {
      const element = document.createElement('span');
      element.classList.add('item-select__item-value');
      element.classList.add('js-ItemSelectCounter');
      element.textContent = this.state.value;
      this.$counter = $(element);
      return element;
    };
    const createActionContainer = () => {
      const element = document.createElement('div');
      element.classList.add('item-select__item-actions');
      element.classList.add('js-ItemSelectActions');
      element.appendChild(createMinusBtn());
      element.appendChild(createItemCounter());
      element.appendChild(createPlusBtn());
      this.$actionContainer = $(element);
      return element;
    };

    const element = document.createElement('div');
    element.classList.add('item-select__item');
    element.classList.add('js-ItemSelectSingleItem');
    element.appendChild(createItemTitle());
    element.appendChild(createActionContainer());
    this.rootNode.append(element);
    this.containerNode = element;
  }

  setListeners() {
    this.onClick = this.onClick.bind(this);
    this.$actionContainer.on('click', this.onClick);
  }

  onClick(event) {
    const $target = $(event.target);
    if ($target.data('action') === 'plus') {
      this.options.onChange({ target: this.options.title, action: 'plus' });
    }
    if ($target.data('action') === 'minus') {
      this.options.onChange({ target: this.options.title, action: 'minus' });
    }
  }

  update(itemOptions) {
    const { max, min, value } = itemOptions;
    if (value >= max) {
      this.$plusBtn.attr('disabled', true);
    } else {
      this.$plusBtn.attr('disabled', false);
    }
    if (value <= min) {
      this.$minusBtn.attr('disabled', true);
    } else {
      this.$minusBtn.attr('disabled', false);
    }
    if (Number(this.$counter.html()) !== value) {
      this.$counter.html(value);
    }
  }
}
