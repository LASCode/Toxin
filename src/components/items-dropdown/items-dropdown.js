import { BaseDropdown } from '../base-dropdown/base-dropdown';
import { Item } from './single-item';

class ItemsDropdown extends BaseDropdown {
  constructor({ rootNode, options, callback }) {
    super(rootNode, options);
    this.callback = callback;
    this.items = [];
    this.initialOptions = options;
    this.state = this.initialOptions.items;
    this.createDropdown();
    this.validateState();
    this.updateItems();
    this.callback(this.state);
  }

  createDropdown() {
    const element = document.createElement('div');
    element.classList.add('items-dropdown');
    element.appendChild(this.createItems());
    if (this.initialOptions.buttons.length) {
      element.appendChild(this.createCustomButtons());
    }
    this.$dropdownNode.append(element);
  }

  createItems() {
    this.itemEventListener = this.itemEventListener.bind(this);
    const itemsContainer = document.createElement('div');
    itemsContainer.classList.add('items-dropdown__items');
    this.state.forEach((el) => {
      this.items.push(new Item({
        itemsContainerNode: itemsContainer,
        itemOptions: el,
        callback: this.itemEventListener,
      }));
    });
    return itemsContainer;
  }

  createCustomButtons() {
    const element = document.createElement('div');
    element.classList.add('items-dropdown__custom-buttons');
    this.initialOptions.buttons.forEach((el) => {
      const button = document.createElement('button');
      button.classList.add('items-dropdown__custom-button');
      button.classList.add(`items-dropdown__custom-button--${el.cssModifier}`);
      button.classList.add(`js-${el.cssModifier}`);
      button.type = 'button';
      button.textContent = el.name;
      button.addEventListener('pointerdown', el.onClick);
      element.appendChild(button);
    });
    return element;
  }

  updateItems() {
    this.items.forEach((el, index) => {
      el.update(this.state[index]);
    });
  }

  itemEventListener(event) {
    const combinedValue = event.action === 'plus' ? 1 : -1;
    this.state = this.state.map((el) => {
      if (el.name === event.target) {
        return { ...el, value: el.value + combinedValue };
      }
      return el;
    });
    this.validateState();
    this.updateItems();
    this.callback(this.state);
  }

  validateState() {
    this.state = this.state.map((el) => {
      const elCopy = el;
      if (elCopy.value > elCopy.maxValue) { elCopy.value = elCopy.maxValue; }
      if (elCopy.value < elCopy.minValue) { elCopy.value = elCopy.minValue; }
      return elCopy;
    });
  }

  getState() {
    return this.state;
  }

  clear() {
    this.state = this.initialOptions.items.map((el) => ({ ...el, value: el.minValue }));
    this.validateState();
    this.updateItems();
    this.callback(this.state);
  }
}

export { ItemsDropdown };
