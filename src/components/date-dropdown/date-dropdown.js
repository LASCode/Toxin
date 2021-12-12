import AirDatepicker from 'air-datepicker'
import 'air-datepicker/air-datepicker.css'
import moment from "moment";
import 'moment/locale/ru'
moment.locale('ru', {
  monthsShort: ["Янв","Фев","Мар","Апр","Мая","Июн","Июл","Авг","Сен","Окт","Ноя","Дек"]
})

const actionsFunc = {
  toggleDropdown(container){
    $(container).toggleClass('form-input--dropdown-expanded')
  }
}
const clear = (button)=>{
  const value = $(button.$altField).val()
  const container = $(button.$el).closest('.form-input--with-dropdown')
  const input = container.find('.form-input__input')
  button.clear()
  input.val('')
}
const save = (button)=>{
  console.log(button)
  const value = $(button.$altField).val()
  const container = $(button.$el).closest('.form-input--with-dropdown')
  const input = container.find('.form-input__input')
  if (value.split('-').length<=1){return false}
  if (input.length>1){
    input.each((i, element)=>{
      $(element).val(moment(Number(value.split('-')[i])).format("DD.MM.YYYY"))
    })
  }else{
    input.each((i, element)=>{
      const timeRange = ``+
        `${moment(Number(value.split('-')[0])).format("D MMM")}`+
        ` - `+
        `${moment(Number(value.split('-')[1])).format("D MMM")}`
      $(element).val(timeRange)
    })
  }
  actionsFunc.toggleDropdown(container)
}






const onClick = (e)=>{
  const target = e.target // Элемент, по которому произошел клик
  const container = $(target).closest('.form-input--with-dropdown') // Главный контейнер инпута
  const action = $(target).closest('*[data-action]').data('action') // Дата атрибут элемента, по которому произошел клик

  if (action){
    if (action==='toggleDropdown'){
      actionsFunc.toggleDropdown(container)
    }
  }
}
const onKeydown = (e)=> {
  const target = e.target // Элемент, по которому произошел клик
  const key = e.key
  const container = $(target).closest('.form-input--with-dropdown') // Главный контейнер инпута
  console.log(key)
  if ($(target).data("action") === "toggleDropdown"){
    if(key==="Enter" || key==="Escape"){
      actionsFunc.toggleDropdown(container)
    }
  }
}
const setDatepicker = (container)=>{
  const saveButton = {
    content: 'Применить',
    className: 'dropdown-date__button',
    onClick: save
  }
  const clearButton = {
    content: 'Очистить',
    className: 'dropdown-date__button',
    onClick: clear
  }

  new AirDatepicker(container, {
    range: true,
    prevHtml: '<i class="material-icons">arrow_back</i>',
    nextHtml: '<i class="material-icons">arrow_forward</i>',
    buttons: [clearButton, saveButton],
    altField: ".dropdown-date__input",
    multipleDatesSeparator: '-',
    navTitles: {days: 'MMMM yyyy'}
  })
}




/**
 Точка входа
 **/
const initializeAllDropdown = ()=>{
  $('.dropdown-date').closest('.form-input').each((index, element)=>{
    $(element).on('click', onClick)
    $(element).on('keydown', onKeydown)
    setDatepicker([...$(element).find('.dropdown-date')][0])
  })
}
initializeAllDropdown()


