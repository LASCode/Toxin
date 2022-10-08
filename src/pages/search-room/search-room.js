import './search-room.scss';
import './search-room.pug';
import '../../layouts/page-layouts';
import '../../components/card-room/card-room';
import '../../components/pagination/pagination';
import '../../components/slider/slider';
import '../../components/input/input';
import '../../components/title/title';
import '../../components/checkbox/checkbox';
import '../../components/checkbox-expandable-list/checkbox-expandable-list';
import '../../components/form-item-container/form-item-container';
import '../../components/date-dropdown/date-dropdown';
import '../../components/guests-dropdown/guests-dropdown';
import '../../components/rooms-dropdown/rooms-dropdown';

const onClick = (e) => {
  e.stopPropagation();
  const target = $(e.target);
  const container = target.closest('.js-show-filter');
  const blurContainer = $('.js-blur');
  const filter = $('.js-filter');
  if (filter.hasClass('search-room-page__filter--open')) {
    filter.removeClass('search-room-page__filter--open');
    blurContainer.removeClass('search-room-page__blur-container--open');
    container.find('.search-room-page__btn-arrow').removeClass('search-room-page__btn-arrow--revert');
    container.find('.search-room-page__btn-text').html('Открыть фильтр');
  } else {
    filter.addClass('search-room-page__filter--open');
    blurContainer.addClass('search-room-page__blur-container--open');
    container.find('.search-room-page__btn-arrow').addClass('search-room-page__btn-arrow--revert');
    container.find('.search-room-page__btn-text').html('Закрыть фильтр');
  }
};
$('.js-show-filter').on('click', onClick);
