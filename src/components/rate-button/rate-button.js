const clearAllStar = (container)=>{
  $(container).find(".rate-button__star").each((index, el)=>{
    if ($(el).hasClass('active')){
      $(el).removeClass('active')
    }
  })
}
const setActiveClassOnStars = (container, count)=>{
  $(container).find(".rate-button__star").each((index, el)=>{
    if ($(el).data('index')<=count){
      $(el).addClass("active", true)
    }
  })
}
const setStar = (container) =>{
  $(container).find(".rate-button__star").each((index, el)=>{
    if ($(el).hasClass("active")){
      $(el).html("star")
    }else{
      $(el).html("star_border")
    }
  })
}

const rateContainer = $(".rate-button")

rateContainer.on("click", (e)=>{
  const target = $(e.target)
  const container = target.closest(".rate-button")

  if (target.hasClass("rate-button__star")){
    const index = target.data("index")
    const input = $(container).find(".rate-button__input")
    const isFirstStar = index===1
    const isAlreadyChecked = Number(input.val())===1

    if (isAlreadyChecked && isFirstStar){
      input.val(0)
      clearAllStar(container)
      setActiveClassOnStars(container, 0)
      setStar(container)
    }else{
      input.val(index)
      clearAllStar(container)
      setActiveClassOnStars(container, index)
      setStar(container)
    }
  }
})
rateContainer.on("mouseover", (e)=>{
  const target = $(e.target)
  const container = target.closest(".rate-button")

  if (target.hasClass("rate-button__star")){
    const index = target.data("index")
    clearAllStar(container)
    setActiveClassOnStars(container, index)
    setStar(container)
  }
})
rateContainer.on("mouseleave", (e)=>{
  const target = $(e.target)
  const container = target.closest(".rate-button")
  const starsCount = Number($(container).find(".rate-button__input").val())
  clearAllStar(container)
  setActiveClassOnStars(container, starsCount)
  setStar(container)
})