import 'nouislider/src/nouislider.less';
import './slider.scss';
import { Slider } from '../../libs/Slider';

$('.js-slider').each((_, el) => {
  const $element = $(el);
  const $sliderBody = $element.find('.js-sliderBody');
  const $sliderInput = $element.find('.js-sliderInput');
  const {
    from, to, max, min,
  } = $sliderBody.data();

  const combineTooltipsValue = (val) => `${Math.round(val)} ₽`;
  const handleSlide = (event) => {
    $sliderInput.val(event.map((elem) => `${Math.round(Number(elem))}`).join('-'));
  };

  const sliderInstance = new Slider($sliderBody[0], {
    from, to, max, min, tooltips: combineTooltipsValue,
  });
  sliderInstance.onSlide(handleSlide);
  $element.data('toxin-sliderInstance', sliderInstance);
});
