import './rooms-dropdown.scss';
import { BaseDropdown } from '../base-dropdown/BaseDropdown';
import { ItemSelect } from '../../libs/ItemSelect';

class RoomsDropdown extends BaseDropdown {
  constructor(rootNode) {
    super($(rootNode).find('.js-baseDropdown')[0], {});
    this.initial();
  }

  initial() {
    this.onChange = this.onChange.bind(this);
    new ItemSelect(this.$dropdownContentNode[0], {
      items: [
        {
          title: 'Спальни', value: 0, max: 5, min: 0,
        },
        {
          title: 'Кровати', value: 0, max: 5, min: 0,
        },
        {
          title: 'Ванные комнаты', value: 0, max: 5, min: 0,
        },
      ],
      clearButton: false,
      submitButton: false,
      onChange: this.onChange,
    });
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
