import './carousel.scss';
import { Carousel } from '../../libs/Carousel';

$('.js-carousel').each((index, el) => {
  const $element = $(el);
  const carouselInstance = new Carousel($element);
  $element.data('toxin-carouselInstance', carouselInstance);
});
