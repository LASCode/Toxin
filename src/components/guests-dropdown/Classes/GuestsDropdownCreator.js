import { BaseDropdown } from '../../base-dropdown/BaseDropdown';
import { ItemSelect } from '../../../libs/ItemSelect';

const defaultOptions = {
  items: [],
  template: [],
  buttons: true,
};

export class GuestsDropdownCreator extends BaseDropdown {
  constructor(rootNode, options) {
    super($(rootNode).find('.js-baseDropdown')[0], {});
    this.rootNode = rootNode;
    this.options = { ...defaultOptions, ...options };
    this.initial();
  }

  initial() {
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onClear = this.onClear.bind(this);
    this.selectInstance = new ItemSelect(this.getDropdownContentNode(), {
      items: this.options.items,
      buttons: this.options.buttons,
      onChange: this.onChange,
      onClear: this.onClear,
      onSubmit: this.onSubmit,
    });
    this.onChange(this.options.items);
  }

  onChange(data) {
    const declensionOfNum = (number, titles) => {
      const numArray = [2, 0, 1, 1, 1, 2];
      return titles[
        (number % 100 > 4 && number % 100 < 20)
          ? 2
          : numArray[(number % 10 < 5) ? number % 10 : 5]
      ];
    };
    const findItemTemplate = (templatesArr, target) => {
      return templatesArr.find((el) => el.targets.includes(target));
    };
    const validDataObj = data
      .filter((el) => el.value > 0)
      .reduce((acc, curr) => {
        const template = findItemTemplate(this.options.template, curr.title);
        const currentType = template ? template.type : curr.title;
        const currentIndex = acc.findIndex((el) => el.type === currentType);
        const alreadyCreated = currentIndex > -1;
        const correctValue = alreadyCreated
          ? acc[currentIndex].value + curr.value
          : curr.value;
        const correctDeclination = template
          ? declensionOfNum(correctValue, template.declinations)
          : currentType;
        acc[alreadyCreated ? currentIndex : acc.length] = {
          type: currentType,
          decl: correctDeclination,
          value: correctValue,
          text: `${correctValue} ${correctDeclination}`,
        };
        return acc;
      }, []);
    const validString = validDataObj.map((el) => el.text).join(', ');
    this.inputInstance.forEach((el) => el.setValue(validString));
  }

  onSubmit(data) {
    this.onChange(data);
    this.closeDropdown();
  }

  onClear(data) {
    this.onChange(data);
  }
}
