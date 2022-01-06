// const headerElements = $(".header")
const onChange = (e)=>{
  e.preventDefault()
  const target = e.target
  const container = $(target).closest('.header')
  const navbarElem = $(container).find(".header__navigation")

  $(navbarElem).toggleClass("header__navigation--visible")

}

$(".header").find(".hamburger-menu__checkbox").on("change", onChange)