import moment from 'moment';
import './date-dropdown.scss';
import { DateDropdownCreator } from './Classes/DateDropdownCreator';

$('.js-dateDropdown').each((index, element) => {
  const htmlDataDates = $(element).data('dates');
  const htmlDataRange = $(element).data('range');
  const htmlDataFormat = $(element).data('format');
  const instance = new DateDropdownCreator(element, {
    isRange: htmlDataRange || true,
    initialDates: (htmlDataDates || []).map((el) => moment(el, 'DD.MM.YYYY').toDate()),
    format: htmlDataFormat || 'DD.MM.YYYY',
  });
  $(element).data('toxin-dateDropdownInstance', instance);
});
