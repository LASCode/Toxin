const defaultSingleItemState = {
  value: 0,
  name: 'Взрослые',
  maxValue: 5,
  minValue: 1,
};

class Item {
  constructor({ itemsContainerNode, itemOptions, callback }) {
    this.state = { ...defaultSingleItemState, ...itemOptions };
    this.target = this.state.name;
    this.callback = callback;
    this.$itemsNode = $(itemsContainerNode);
    this.createComponent();
    this.setListeners();
  }

  createComponent() {
    const createItemName = () => {
      const element = document.createElement('span');
      element.classList.add('items-dropdown__item-value');
      element.textContent = this.state.name;
      return element;
    };
    const createPlusBtn = () => {
      const element = document.createElement('button');
      element.classList.add('items-dropdown__item-btn');
      element.classList.add('items-dropdown__item-btn--plus');
      element.classList.add('.js-itemDropdownSingleItemPlusBtn');
      element.setAttribute('data-action', 'plus');
      element.type = 'button';
      element.textContent = '+';
      this.$plusBtn = $(element);
      return element;
    };
    const createMinusBtn = () => {
      const element = document.createElement('button');
      element.classList.add('items-dropdown__item-btn');
      element.classList.add('items-dropdown__item-btn--minus');
      element.classList.add('.js-itemDropdownSingleItemMinusBtn');
      element.setAttribute('data-action', 'minus');
      element.type = 'button';
      element.textContent = '-';
      this.$minusBtn = $(element);
      return element;
    };
    const createItemCounter = () => {
      const element = document.createElement('span');
      element.classList.add('items-dropdown__item-value');
      element.classList.add('.js-itemDropdownSingleItemCounter');
      element.textContent = this.state.value;
      this.$counter = $(element);
      return element;
    };
    const createActionContainer = () => {
      const element = document.createElement('div');
      element.classList.add('items-dropdown__item-actions');
      element.classList.add('js-itemDropdownSingleItemActions');
      element.appendChild(createMinusBtn());
      element.appendChild(createItemCounter());
      element.appendChild(createPlusBtn());
      this.$actionContainer = $(element);
      return element;
    };

    const element = document.createElement('div');
    element.classList.add('items-dropdown__item');
    element.classList.add('js-itemDropdownSingleItemContainer');
    const actionBoxElement = document.createElement('div');
    actionBoxElement.classList.add('items-dropdown__item-actions');
    actionBoxElement.classList.add('js-itemDropdownSingleItemActions');
    element.appendChild(createItemName());
    element.appendChild(createActionContainer());
    this.$itemsNode.append(element);
  }

  setListeners() {
    this.onClick = this.onClick.bind(this);
    this.$actionContainer.on('click', this.onClick);
  }

  onClick(event) {
    const $target = $(event.target);
    if ($target.data('action') === 'plus') {
      this.callback({ target: this.target, action: 'plus' });
    }
    if ($target.data('action') === 'minus') {
      this.callback({ target: this.target, action: 'minus' });
    }
  }

  update(itemOptions) {
    const { maxValue, minValue, value } = itemOptions;
    if (value >= maxValue) {
      this.$plusBtn.attr('disabled', true);
    } else {
      this.$plusBtn.attr('disabled', false);
    }
    if (value <= minValue) {
      this.$minusBtn.attr('disabled', true);
    } else {
      this.$minusBtn.attr('disabled', false);
    }
    if (Number(this.$counter.html()) !== value) {
      this.$counter.html(value);
    }
  }
}

export { Item };
