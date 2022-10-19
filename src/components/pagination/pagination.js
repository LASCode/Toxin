import './pagination.scss';
import { Pagination } from '../../libs/Pagination';

const container = $('.js-pagination');
container.find('.pagination__wrapper').each((index, el) => {
  const totalPages = $(el).closest('.pagination').data('totalpages');
  const pagesArr = new Array(totalPages).fill(false).map((element, i) => i + 1);
  new Pagination(el, {
    pageSize: 1,
    dataSource: pagesArr,
    pageRange: 1,
    prevText: 'arrow_back',
    nextText: 'arrow_forward',
  });
});
