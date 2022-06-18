import './ui-cards.pug';
import './ui-cards.scss';
import '../../components/carousel/carousel';
import '../../components/input/input';
import '../../components/rooms-dropdown/rooms-dropdown';
import '../../components/guests-dropdown/guests-dropdown';
import '../../components/date-dropdown/date-dropdown';
import AirDatepicker from 'air-datepicker';

$(document).ready(() => {
  $('.js-datepicker').each((index, el) => {
    const saveButton = {
      content: 'Применить',
      className: 'dropdown-date__button',
    };
    const clearButton = {
      content: 'Очистить',
      className: 'dropdown-date__button',
    };
    new AirDatepicker(el, {
      open: true,
      range: true,
      prevHtml: '<i class="material-icons">arrow_back</i>',
      nextHtml: '<i class="material-icons">arrow_forward</i>',
      buttons: [clearButton, saveButton],
      navTitles: { days: 'MMMM yyyy' },
    });
  });
});
