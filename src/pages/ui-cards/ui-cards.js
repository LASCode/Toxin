import AirDatepicker from 'air-datepicker';
import './ui-cards.pug';
import './ui-cards.scss';
import '../../layouts/page-layouts';
import '../../components/title/title';
import '../../components/carousel/carousel';
import '../../components/input/input';
import '../../components/rooms-dropdown/rooms-dropdown';
import '../../components/guests-dropdown/guests-dropdown';
import '../../components/date-dropdown/date-dropdown';

import '../../components/card-room/card-room';
import '../../components/card-login/card-login';
import '../../components/card-registration/card-registration';
import '../../components/card-search-room/card-search-room';
import '../../components/card-selected-room/card-selected-room';


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
