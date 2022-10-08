import { ItemsDropdown } from '../items-dropdown/ItemsDropdown';
import './guests-dropdown.scss';

class GuestsDropdown {
  constructor(rootNode) {
    this.$rootNode = $(rootNode);
    this.$inputNode = this.$rootNode.find('.js-input');
    this.baseDropbownNode = this.$rootNode.find('.js-baseDropdown')[0];
    this.inputInstance = [...this.$inputNode].map((el) => $(el).data('toxin-inputInstance'));
    this.settings = {};
    this.htmlSettings = this.$rootNode.data('value');
    this.getDefaultSettings();
    this.combineSettings();
    this.createDropdown();
  }

  getDefaultSettings() {
    this.onSubmit = this.onSubmit.bind(this);
    this.onClear = this.onClear.bind(this);
    this.settings = {
      items: [
        {
          name: 'Взрослые', value: 0, maxValue: 5, minValue: 0,
        },
        {
          name: 'Дети', value: 0, maxValue: 5, minValue: 0,
        },
        {
          name: 'Младенцы', value: 0, maxValue: 5, minValue: 0,
        },
      ],
      buttons: [
        { name: 'Очистить', cssModifier: 'clear', onClick: this.onClear },
        { name: 'Применить', cssModifier: 'submit', onClick: this.onSubmit },
      ],
      windowListener: true,
      inputListener: true,
      open: false,
    };
  }

  createDropdown() {
    this.dropdownCallback = this.dropdownCallback.bind(this);
    this.dropdownInstance = new ItemsDropdown({
      rootNode: this.baseDropbownNode,
      options: this.settings,
      callback: this.dropdownCallback,
    });
  }

  combineSettings() {
    const combine = (el) => {
      const result = el;
      if (this.htmlSettings.some((element) => element.name === el.name)) {
        result.value = this.htmlSettings.find((element) => element.name === el.name).value;
      }
      return result;
    };
    this.settings = {
      ...this.settings,
      items: this.settings.items.map(combine),
    };
  }

  dropdownCallback(state) {
    const normalizedState = {};
    state.forEach((el) => {
      normalizedState[el.name] = el.value;
    });
    const getItemDeclensionObj = (value, declension) => {
      const declensionOfNum = (number, titles) => {
        const numArray = [2, 0, 1, 1, 1, 2];
        return titles[
          (number % 100 > 4 && number % 100 < 20)
            ? 2
            : numArray[(number % 10 < 5) ? number % 10 : 5]
        ];
      };
      return ({
        value,
        declension: declensionOfNum(value, declension),
      });
    };
    const decl = [
      ['Гость', 'Гостя', 'Гостей'],
      ['Младенец', 'Младенца', 'Младенцев'],
    ];
    const itemsWIthDeclension = [];
    itemsWIthDeclension.push(getItemDeclensionObj(state[0].value + state[1].value, decl[0]));
    itemsWIthDeclension.push(getItemDeclensionObj(state[2].value, decl[1]));
    const result = itemsWIthDeclension
      .filter((el) => el.value > 0)
      .map((el) => `${el.value} ${el.declension}`)
      .join(', ');
    this.inputInstance.forEach((el) => el.setValue(result));
    this.toggleClearBtn(state);
  }

  toggleClearBtn(state) {
    const value = state.reduce((prev, el) => prev + el.value, 0);
    if (value > 0) {
      this.$rootNode.find('.js-clear').removeClass('items-dropdown__custom-button--hidden');
    } else {
      this.$rootNode.find('.js-clear').addClass('items-dropdown__custom-button--hidden');
    }
  }

  onSubmit() {
    this.dropdownInstance.closeDropdown();
  }

  onClear() {
    this.dropdownInstance.clear();
  }
}

$('.js-guestDropdown').each((index, element) => {
  new GuestsDropdown(element);
});
