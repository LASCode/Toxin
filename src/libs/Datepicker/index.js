import AirDatepicker from 'air-datepicker';
import { defaultOptions } from './options';
import './styles.scss';

class Datepicker {
  constructor(rootNode, options) {
    this.rootNode = rootNode;
    this.options = { ...defaultOptions, ...options };
    this.init();
    this.changeButtonsType();
  }

  init() {
    this.pluginInstance = new AirDatepicker(this.rootNode, {
      range: this.options.isRange,
      selectedDates: this.options.initialDates,
      prevHtml: 'arrow_back',
      nextHtml: 'arrow_forward',
      navTitles: { days: 'MMMM yyyy' },
      buttons: this.options.buttons,
    });
  }

  changeButtonsType() {
    $(this.pluginInstance.buttons.$el).children().each((i, el) => $(el).attr('type', 'button'));
  }

  clear() {
    this.pluginInstance.clear();
  }

  setDates(dateFrom, dateTo) {
    this.pluginInstance.selectDate([dateFrom, dateTo]);
  }

  getDates() {
    return this.pluginInstance.selectedDates;
  }
}
export { Datepicker };
