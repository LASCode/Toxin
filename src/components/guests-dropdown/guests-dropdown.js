import './guests-dropdown.scss';
import { BaseDropdown } from '../base-dropdown/BaseDropdown';
import { ItemSelect } from '../../libs/ItemSelect';

class GuestsDropdown extends BaseDropdown {
  constructor(rootNode) {
    super($(rootNode).find('.js-baseDropdown')[0], {});
    this.initial();
  }

  initial() {
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onClear = this.onClear.bind(this);
    new ItemSelect(this.$dropdownContentNode[0], {
      items: [
        {
          title: 'Взрослые', value: 0, max: 5, min: 0,
        },
        {
          title: 'Дети', value: 0, max: 5, min: 0,
        },
        {
          title: 'Младенцы', value: 0, max: 5, min: 0,
        },
      ],
      clearButton: this.$rootNode.data('clearBtn'),
      submitButton: true,
      onChange: this.onChange,
      onClear: this.onClear,
      onSubmit: this.onSubmit,
    });
  }

  toggleClearBtn(state) {
    const value = state.reduce((prev, el) => prev + el.value, 0);
    if (value > 0) {
      this.$rootNode.find('.js-clear').removeClass('items-dropdown__custom-button--hidden');
    } else {
      this.$rootNode.find('.js-clear').addClass('items-dropdown__custom-button--hidden');
    }
  }

  onChange(state) {
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

  onSubmit() {
    this.closeDropdown();
  }

  onClear(state) {
    this.onChange(state);
  }
}

$('.js-guestDropdown').each((index, element) => {
  new GuestsDropdown(element);
});
