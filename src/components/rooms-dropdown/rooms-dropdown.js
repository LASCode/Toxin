import { ItemsDropdown } from '../items-dropdown/items-dropdown';

class RoomsDropdown {
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
    this.settings = {
      items: [
        {
          name: 'Спальни', value: 0, maxValue: 5, minValue: 0,
        },
        {
          name: 'Кровати', value: 0, maxValue: 5, minValue: 0,
        },
        {
          name: 'Ванные комнаты', value: 0, maxValue: 5, minValue: 0,
        },
      ],
      buttons: [],
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
      ['Спальня', 'Спальни', 'Спален'],
      ['Кровать', 'Кровати', 'Кроватей'],
      ['Ванная комната', 'Ванные комнаты', 'Ванных комнат'],
    ];
    const itemsWIthDeclension = state.map(
      (el, index) => getItemDeclensionObj(el.value, decl[index]),
    );
    const result = itemsWIthDeclension
      .filter((el) => el.value > 0)
      .map((el) => `${el.value} ${el.declension}`)
      .join(', ');
    this.inputInstance.forEach((el) => el.setValue(result));
  }
}

$('.js-roomsDropdown').each((index, element) => {
  new RoomsDropdown(element);
});
