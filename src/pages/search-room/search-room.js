import './search-room.scss';
import './search-room.pug';
import '../../components/input/input';
import '../../components/header/header';
import '../../components/guests-dropdown/guests-dropdown';
import '../../components/date-dropdown/date-dropdown';
import '../../components/rooms-dropdown/rooms-dropdown';
import '../../components/slider/slider';
import '../../components/carousel/carousel';
import '../../components/pagination/pagination';

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
