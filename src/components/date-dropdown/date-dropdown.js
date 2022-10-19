import 'air-datepicker/air-datepicker.css';
import 'jquery-mask-plugin';
import moment from 'moment';
import 'moment/locale/ru';
import './date-dropdown.scss';
import { BaseDropdown } from '../base-dropdown/BaseDropdown';
import { Datepicker } from '../../libs/Datepicker';

moment.locale('ru', {
  monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Мая', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
});

class DateDropdown extends BaseDropdown {
  constructor(rootNode) {
    super($(rootNode).find('.js-baseDropdown')[0], { margin: true });
    this.isRange = $(rootNode).data('range') !== undefined;
    this.settings = {};
    this.inputInstance = [...this.$inputNode].map((el) => $(el).data('toxin-inputInstance'));
    this.inputsCount = this.$inputNode.length;
    this.initial();
    this.setInputListeners();
    this.onInput();
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
    const settings = {
      range: this.isRange,
      buttons: [clearButton, saveButton],
    };
    this.datepickerInstance = new Datepicker(this.$dropdownContentNode[0], settings);
  }

  onSave() {
    const dates = this.datepickerInstance.getDates().map((el) => moment(el));
    const [momentFrom, momentTo] = dates;
    const datesIsValid = dates.reduce((acc, curr) => (acc ? curr.isValid() : false), true);
    if (dates.length < 2) { this.startShacking(); return; }
    if (!datesIsValid) { this.startShacking(); return; }
    if (this.inputsCount === 2) {
      this.inputInstance[0].setValue(momentFrom.format('DD.MM.YYYY'));
      this.inputInstance[1].setValue(momentTo.format('DD.MM.YYYY'));
    }
    if (this.inputsCount === 1) {
      this.inputInstance[0].setValue(`${momentFrom.format('DD MMM')} - ${momentTo.format('DD MMM')}`);
    }
    this.closeDropdown();
  }

  onClear() {
    this.datepickerInstance.clear();
    this.inputInstance.forEach((el) => el.setValue(''));
  }

  onInput() {
    const calendarDates = this.datepickerInstance.getDates().map((el) => moment(el));
    const inputDates = this.inputsCount === 2
      ? this.inputInstance.map((el) => moment(el.inputNode.val(), 'DD.MM.YYYY'))
      : this.inputInstance[0].inputNode.val().split(' - ').map((el) => moment(el, 'DD MMM'));
    const validDateArray = inputDates.map((el, index) => (
      el.isValid() ? el.unix() * 1000 : calendarDates[index]));
    this.datepickerInstance.setDates(validDateArray);
  }

  setInputListeners() {
    this.onInput = this.onInput.bind(this);
    this.$rootNode.on('input', this.onInput);
  }

  startShacking() {
    this.stopShacking = this.stopShacking.bind(this);
    $(this.$dropdownNode).addClass('dropdown-date__calendar--shacking');
    setTimeout(this.stopShacking, 200);
  }

  stopShacking() {
    $(this.$dropdownNode).removeClass('dropdown-date__calendar--shacking');
  }
}

$('.js-dateDropdown').each((index, element) => {
  new DateDropdown(element);
});
