import 'owl.carousel';
import './carousel.scss';
import '../rate-button/rate-button';

$('.js-carousel').owlCarousel({
  items: 1,
  nav: true,
  rewind: true,
  navText: [
    '<span class="owl-arrow-img owl-arrow-img--left">expand_more</span>',
    '<span class="owl-arrow-img owl-arrow-img--right">expand_more</span>',
  ],
});
