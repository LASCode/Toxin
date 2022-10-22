import 'air-datepicker/air-datepicker.css';
import moment from 'moment';
import 'moment/locale/ru';
import { BaseDropdown } from '../../base-dropdown/BaseDropdown';
import { Datepicker } from '../../../libs/Datepicker';

moment.locale('ru', {
  monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Мая', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
});

const defaultOptions = {
  isRange: true,
  initialDates: [new Date(Date.now()), new Date(Date.now() + 604800000)],
  format: 'DD.MM.YYYY',
};

export class DateDropdownCreator extends BaseDropdown {
  constructor(rootNode, options) {
    super($(rootNode).find('.js-baseDropdown')[0], { margin: true });
    this.rootNode = rootNode;
    this.options = { ...defaultOptions, ...options };
    this.initial();
    this.setInputListeners();
    this.onSave();
  }

  initial() {
    this.onSave = this.onSave.bind(this);
    this.onClear = this.onClear.bind(this);
    const saveButton = {
      content: 'Применить',
      className: 'dropdown-date__button',
      onClick: this.onSave,
      type: 'button',
    };
    const clearButton = {
      content: 'Очистить',
      className: 'dropdown-date__button',
      onClick: this.onClear,
      type: 'button',
    };
    this.datepickerInstance = new Datepicker(this.$dropdownContentNode[0], {
      range: this.options.isRange,
      buttons: [clearButton, saveButton],
      initialDates: this.options.initialDates,
    });
  }

  onSave() {
    const dates = this.datepickerInstance.getDates().map((el) => moment(el));
    const datesIsValid = dates.reduce((acc, curr) => (acc ? curr.isValid() : false), true);
    if (dates.length < 2) { this.startShacking(); return; }
    if (!datesIsValid) { this.startShacking(); return; }
    const formatDates = dates.map((el) => el.format(this.options.format));
    if (this.inputInstance.length === 2) {
      this.inputInstance.forEach((el, i) => el.setValue(formatDates[i]));
    }
    if (this.inputInstance.length === 1) {
      this.inputInstance.forEach((el) => el.setValue(formatDates.join(' - ')));
    }
    this.closeDropdown();
  }

  onClear() {
    this.datepickerInstance.clear();
    this.inputInstance.forEach((el) => el.setValue(''));
  }

  onInput() {
    const calendarDates = this.datepickerInstance.getDates().map((el) => moment(el));
    const inputDates = this.inputInstance.length === 2
      ? this.inputInstance.map((el) => moment(el.getValue(), this.options.format))
      : this.inputInstance[0].getValue().split(' - ').map((el) => moment(el, this.options.format));
    const validDateArray = inputDates.map((el, index) => (
      el.isValid() ? el.unix() * 1000 : calendarDates[index]));
    this.datepickerInstance.setDates(validDateArray);
  }

  setInputListeners() {
    this.onInput = this.onInput.bind(this);
    this.$rootNode.on('input', this.onInput);
  }
}
