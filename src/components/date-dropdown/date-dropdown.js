import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import 'jquery-mask-plugin';
import moment from 'moment';
import 'moment/locale/ru';
import './date-dropdown.scss';
import { BaseDropdown } from '../base-dropdown/BaseDropdown';

moment.locale('ru', {
  monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Мая', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
});

class DateDropdown extends BaseDropdown {
  constructor(rootNode) {
    super($(rootNode).find('.js-baseDropdown'), { customClass: 'base-dropdown__body--with-margin' });
    this.isRange = $(rootNode).data('range') !== undefined;
    this.settings = {};
    this.inputInstance = [...this.$inputNode].map((el) => $(el).data('toxin-inputInstance'));
    this.inputsCount = this.$inputNode.length;
    this.getDefaultSettings();
    this.createComponent();
    this.setInputListeners();
    this.onInput();
  }

  getDefaultSettings() {
    this.onSave = this.onSave.bind(this);
    this.onClear = this.onClear.bind(this);
    const saveButton = {
      content: 'Применить',
      className: 'dropdown-date__button',
      onClick: this.onSave,
    };
    const clearButton = {
      content: 'Очистить',
      className: 'dropdown-date__button',
      onClick: this.onClear,
    };
    this.settings = {
      range: this.isRange,
      prevHtml: 'arrow_back',
      nextHtml: 'arrow_forward',
      buttons: [clearButton, saveButton],
      navTitles: { days: 'MMMM yyyy' },
    };
  }

  createComponent() {
    if (this.inputsCount === 2) {
      this.inputInstance.forEach((el, index) => {
        el.inputNode.data('index', index);
        el.inputNode.mask('Dd.Mm.THNY', {
          translation: {
            D: { pattern: /[0-3]/, recursive: true },
            d: { pattern: /[0-9]/, recursive: true },
            M: { pattern: /[0-3]/, recursive: true },
            m: { pattern: /[0-9]/, recursive: true },
            T: { pattern: /2/, recursive: true },
            H: { pattern: /[0-9]/, recursive: true },
            N: { pattern: /[0-9]/, recursive: true },
            Y: { pattern: /[0-9]/ },
          },
        });
      });
    }
    if (this.inputsCount === 1) {
      this.inputInstance.forEach((el, index) => {
        el.inputNode.data('index', index);
        el.inputNode.mask('00 MMM - 00 MMM', {
          translation: {
            M: { pattern: /[а-яА-Я]/, recursive: false },
          },
        });
      });
    }
    this.datepickerInstance = new AirDatepicker(this.$dropdownNode[0], this.settings);
    this.$rootNode.find('.dropdown-date__button').each((index, element) => {
      $(element).prop('type', 'button');
    });
  }

  onSave() {
    const selectedDatesCountIsValid = this.datepickerInstance.selectedDates.length === 2;
    if (selectedDatesCountIsValid) {
      const [momentFrom, momentTo] = this.datepickerInstance.selectedDates.map((el) => moment(el));
      const datesIsValid = momentFrom.isValid() && momentTo.isValid();
      if (this.inputsCount === 2 && datesIsValid) {
        this.inputInstance[0].setValue(momentFrom.format('DD.MM.YYYY'));
        this.inputInstance[1].setValue(momentTo.format('DD.MM.YYYY'));
      }
      if (this.inputsCount === 1 && datesIsValid) {
        this.inputInstance[0].setValue(`${momentFrom.format('DD MMM')} - ${momentTo.format('DD MMM')}`);
      }
      this.closeDropdown();
    } else {
      this.startShacking();
    }
  }

  onClear() {
    this.datepickerInstance.clear();
    this.inputInstance.forEach((el) => el.setValue(''));
  }

  onInput() {
    const [selectedFrom, selectedTo] = this.datepickerInstance.selectedDates;
    if (this.inputsCount === 2) {
      const [momentFrom, momentTo] = this.inputInstance.map((el) => moment(el.inputNode.val(), 'DD.MM.YYYY'));
      if (momentTo.isValid() && momentFrom.isValid()) {
        this.datepickerInstance.selectDate([momentFrom.unix() * 1000, momentTo.unix() * 1000]);
      } else
      if (momentFrom.isValid()) {
        this.datepickerInstance.selectDate([momentFrom.unix() * 1000, selectedTo]);
      } else
      if (momentTo.isValid()) {
        this.datepickerInstance.selectDate([selectedFrom, momentTo.unix() * 1000]);
      }
    }
    if (this.inputsCount === 1) {
      const value = this.inputInstance[0].inputNode.val();
      if (value.split(' - ').length < 2) { return; }
      const [momentFrom, momentTo] = value.split(' - ').map((el) => moment(el, 'DD MMM'));
      if (momentFrom.isValid()) {
        this.datepickerInstance.selectDate([momentFrom.unix() * 1000, selectedTo]);
      }
      if (momentTo.isValid()) {
        this.datepickerInstance.selectDate([selectedFrom, momentTo.unix() * 1000]);
      }
    }
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
