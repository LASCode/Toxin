// import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel';
import "../rate-button/rate-button"

$(".carousel").owlCarousel({
  items: 1,
  autoWidth:true,
  nav: true,
  navText: [
    '<span class="arrow-owl arrow-left">expand_more</span>',
    '<span class="arrow-owl arrow-right">expand_more</span>'
  ],
  loop: true
})