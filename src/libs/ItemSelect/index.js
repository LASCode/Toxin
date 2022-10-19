import './styles.scss';
import { defaultOptions } from './options';
import { SingleItem } from './components/SingleItem';

export class ItemSelect {
  constructor(rootNode, options) {
    this.rootNode = rootNode;
    this.options = { ...defaultOptions, ...options };
    this.itemsInstances = [];
    this.state = this.options.items;
    this.createContainer();
    this.createItems();
    this.createCustomButtons();
  }

  createContainer() {
    const element = document.createElement('div');
    element.classList.add('item-select');
    this.rootNode.appendChild(element);
    this.containerNode = element;
  }

  createItems() {
    this.eventHandler = this.eventHandler.bind(this);
    const element = document.createElement('div');
    element.classList.add('item-select__items');
    this.itemsInstances = this.options.items.map((el) => {
      const inst = new SingleItem(element, { ...el, onChange: this.eventHandler });
      return inst;
    });
    this.containerNode.appendChild(element);
  }

  updateItems() {
    this.itemsInstances.forEach((el, i) => {
      el.update(this.state[i]);
    });
  }

  createCustomButtons() {
    if (!this.options.submitButton && !this.options.clearButton) { return; }
    this.clear = this.clear.bind(this);
    this.submit = this.submit.bind(this);
    const createBtn = (title, type, callback) => {
      const button = document.createElement('button');
      button.classList.add('item-select__custom-button');
      button.classList.add(`item-select__custom-button--${type}`);
      button.type = 'button';
      button.textContent = title;
      button.addEventListener('pointerdown', callback);
      return button;
    };

    const element = document.createElement('div');
    element.classList.add('item-select__custom-buttons');
    if (this.options.submitButton) {
      element.appendChild(createBtn('Применить', 'submit', this.submit));
    }
    if (this.options.clearButton) {
      element.appendChild(createBtn('Очистить', 'clear', this.clear));
    }

    this.containerNode.appendChild(element);
  }

  eventHandler(event) {
    const combinedValue = event.action === 'plus' ? 1 : -1;
    this.state = this.state.map((el) => {
      if (el.title === event.target) {
        return { ...el, value: el.value + combinedValue };
      }
      return el;
    });
    this.validateState();
    this.updateItems();
    this.options.onChange(this.state);
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
    this.state = this.options.items;
    this.validateState();
    this.updateItems();
    this.options.onClear(this.state);
  }

  submit() {
    this.options.onSubmit(this.state);
  }
}
