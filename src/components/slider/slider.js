import nouislider from "nouislider";
import "nouislider/src/nouislider.less"

$('.slider__body').each((_, el)=>{
  const start = Number($(el).data('start'))
  const stop = Number($(el).data('stop'))
  const min = Number($(el).data('min'))
  const max = Number($(el).data('max'))
  const input = $(el).closest(".slider").find(".slider__input")

  nouislider.create(el, {
    start: [start, stop],
    tooltips: {
      to: (e)=>`${Math.round(e)} ₽`
    },
    connect: true,
    range: {
      min: min,
      max: max
    },
  })
  input.val(el.noUiSlider.get().map(el=>`${Math.round(Number(el))}`).join('-'))
  el.noUiSlider.on('slide', (e)=>{
    input.val(e.map(el=>`${Math.round(Number(el))}`).join('-'))
  })
})