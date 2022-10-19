import AirDatepicker from 'air-datepicker';
import { defaultOptions } from './options';
import './styles.scss';

class Datepicker {
  constructor(rootNode, options) {
    this.rootNode = rootNode;
    this.options = { ...defaultOptions, ...options };
    this.pluginInstance = new AirDatepicker(this.rootNode, this.options);
    this.changeButtonsType();
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
