import nouislider from 'nouislider';
import 'nouislider/src/nouislider.less';

$('.js-slider').each((_, el) => {
  const $element = $(el);
  const $sliderBody = $element.find('.js-sliderBody');
  const $sliderInput = $element.find('.js-sliderInput');
  const {
    start, stop, max, min,
  } = $sliderBody.data();

  const combineTooltipsValue = (e) => `${Math.round(e)} ₽`;
  const onSlide = (event) => {
    $sliderInput.val(event.map((elem) => `${Math.round(Number(elem))}`).join('-'));
  };

  nouislider.create($sliderBody[0], {
    start: [start, stop],
    tooltips: {
      to: combineTooltipsValue,
      from: combineTooltipsValue,
    },
    connect: true,
    range: {
      min,
      max,
    },
  });
  $sliderInput.val($sliderBody[0].noUiSlider.get().map((element) => `${Math.round(Number(element))}`).join('-'));
  $sliderBody[0].noUiSlider.on('slide', onSlide);
});
