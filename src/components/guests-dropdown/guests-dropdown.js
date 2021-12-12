const MAX_VALUE = 5,
  MIN_VALUE = 0,
  DROPDOWN_CLASS = '.dropdown-guest'

/**
 Получает значение счетчика всех строк в дропдауна, упаковывает в обьект, содержащий:
 {
  {
    Значение счетчика: Number
    Функции прибавления\убавления счетчика
    Функции энейбла\дизейбла кнопок (отдельно для + и -)
  }
  ...Аналогично для каждой последующей строчки дропдауна
 }
 Для каждой строки функции уникальны и действуют только на эту строку.
 **/
const getSelectedPersonObj = (container)=>{
  let personObj = {}
  $(container)
    .find('.dropdown-guest__type-container')
    .each((index, elem)=>{
      const count = Number($(elem).find('.dropdown-guest__guest-count').html())
      personObj[$(elem).data('name')] = {
        count: count,
        counter: {
          add(){$(elem).find('.dropdown-guest__guest-count').html(count+1)},
          reduce(){$(elem).find('.dropdown-guest__guest-count').html(count-1)},
          nullify(){$(elem).find('.dropdown-guest__guest-count').html(0)}
        },
        button:{
          positive:{
            disable(){
              $(elem).find('*[data-action="add"]').attr('disabled', true)
            },
            enable(){
              $(elem).find('*[data-action="add"]').attr('disabled', false)
            }
          },
          negative:{
            disable(){
              $(elem).find('*[data-action="reduce"]').attr('disabled', true)
            },
            enable(){
              $(elem).find('*[data-action="reduce"]').attr('disabled', false)
            }
          }
        },
        animate:{
          error(){
            $(elem).closest('.dropdown-guest__type-container').addClass('dropdown-guest__type-container--with-quake')
            setTimeout(()=>{
              $(elem).closest('.dropdown-guest__type-container').removeClass('dropdown-guest__type-container--with-quake')
            }, 500)
          }
        }
      }
    })
  return personObj
}
/**
 Проводит рекурсивный поиск элемента вверх по дереву с data-[data] аттрибутом вплоть до body.
 Применяется при диллегировании событий для блоков, имеющих потомков, не имеющих дата-атрибутов.
 !ВНИМАНИЕ! Функция выдаст значение первого на пути элемента! Не допускать вложенности элементов с одинаковой [data]
 При неудаче возвращает false
 При удаче возвращает значение атрибута
 **/
const getDataAttribute = (target, data)=>{
  if ($(target).data(data)){
    return $(target).data(data)
  }else if (![...target.classList].includes('page__body')){
    return getDataAttribute(target.parentElement, data)
  }else{
    return false
  }
}
const setDefaultValue = (container)=>{
  const dropdownValuesObj = getSelectedPersonObj(container)
  let totalCount = 0
  $.each(dropdownValuesObj, (key)=>{
    if (dropdownValuesObj[key].count !== 0) totalCount++
  })
  if (totalCount!==0){
    actionsFunc.confirm(container)
  }
}
const disableBadButtons = (container)=>{
  let personObj = getSelectedPersonObj(container)
  let totalCount = 0
  $.each(personObj, (key)=>{
    let singlePersonObj = personObj[key]
    if (singlePersonObj.count){totalCount++}
    switch (true){
      case singlePersonObj.count !== MAX_VALUE: singlePersonObj.button.positive.enable(); break
      case singlePersonObj.count === MAX_VALUE: singlePersonObj.button.positive.disable(); break
    }
    switch (true){
      case singlePersonObj.count !== MIN_VALUE: singlePersonObj.button.negative.enable(); break
      case singlePersonObj.count === MIN_VALUE: singlePersonObj.button.negative.disable(); break
    }
  })
  if (totalCount){
    $(container).find('*[data-action="clear"]').removeClass('global--hidden')
  }else{
    $(container).find('*[data-action="clear"]').addClass('global--hidden')
  }
}
const declensionOfNum = (number, titles)=> {
  const numArray = [2, 0, 1, 1, 1, 2];
  return titles[
    (number % 100 > 4 && number % 100 < 20)
      ?
      2
      :
      numArray[(number % 10 < 5) ? number % 10 : 5]
    ];
}
const actionsFunc = {
  confirm(container){
    let personObj = getSelectedPersonObj(container) // Получаем обьект с параметрами и функциями всех строк дропдауна
    const adults = personObj['Взрослые'].count,
          children = personObj['Дети'].count,
          babies = personObj['Младенцы'].count,
          decl = [['Гость', 'Гостя', 'Гостей'], ['Младенец', 'Младенца', 'Младенцев']]
    let result = `${adults?`${adults+children} ${declensionOfNum(adults+children, decl[0])}`:''}`+
      `${babies?`${(adults||children)?', ':''}${babies} ${declensionOfNum(babies, decl[1])}`:''}`
    if ((children || babies) && !adults){
      personObj['Взрослые'].animate.error()
      return false
    }
    $(container).find('.form-input__input').val(result)
    this.toggleDropdown(container)
  },
  clear(container){
    let personObj = getSelectedPersonObj(container)
    $.each(personObj, (key)=>{
      personObj[key].counter.nullify()
    })
  },
  add(container, itemName){
    let personObj = getSelectedPersonObj(container)
    personObj[itemName]?.counter.add()
  },
  reduce(container, itemName){
    let personObj = getSelectedPersonObj(container)
    personObj[itemName]?.counter.reduce()
  },
  toggleDropdown(container){
    $(container).toggleClass('form-input--dropdown-expanded')
  }
}



/**
 Основные рабочие функции
 **/
const onClick = (e)=>{
  const target = e.target // Элемент, по которому произошел клик
  const container = $(target).closest('.form-input--with-dropdown') // Главный контейнер инпута
  const action = getDataAttribute(target, 'action') // Дата атрибут элемента, по которому произошел клик
  console.log(action)

  //обработка кликов по блокам с data-action
  if (action){
    if (action === 'toggleDropdown'){
      actionsFunc.toggleDropdown(container)
    }
    if (action === 'clear'){
      actionsFunc.clear(container)
      disableBadButtons(container)
    }
    if (action === 'confirm'){
      actionsFunc.confirm(container)
    }
    if (action === 'add') {
      const itemName = $(target).closest('.dropdown-guest__type-container').data('name')
      actionsFunc.add(container, itemName)
      disableBadButtons(container)
    }
    if (action === 'reduce') {
      const itemName = $(target).closest('.dropdown-guest__type-container').data('name')
      actionsFunc.reduce(container, itemName)
      disableBadButtons(container)
    }
  }
}
const onKeydown = (e)=> {
  const target = e.target // Элемент, по которому произошел клик
  const key = e.key
  const container = $(target).closest('.form-input--with-dropdown') // Главный контейнер инпута
  console.log(target)
  if ($(target).data("action") === "toggleDropdown"){
    if(key==="Enter" || key==="Escape"){
      actionsFunc.toggleDropdown(container)
    }
  }
}


/**
 Точка входа
 **/
const initializeAllDropdown = ()=>{
  $(DROPDOWN_CLASS).closest('.form-input').each((index, element)=>{
    $(element).on('click', onClick)
    $(element).on("keydown", onKeydown)
    setDefaultValue(element)
    disableBadButtons(element)
  })
}
initializeAllDropdown()

