const MAX_VALUE = 5,
      MIN_VALUE = 0,
      DROPDOWN_CLASS = '.dropdown-rooms'

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
    .find('.dropdown-rooms__type-container')
    .each((index, elem)=>{
      const count = Number($(elem).find('.dropdown-rooms__rooms-count').html())
      personObj[$(elem).data('name')] = {
        count: count,
        counter: {
          add(){$(elem).find('.dropdown-rooms__rooms-count').html(count+1)},
          reduce(){$(elem).find('.dropdown-rooms__rooms-count').html(count-1)},
          nullify(){$(elem).find('.dropdown-rooms__rooms-count').html(0)}
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
            $(elem).closest('.dropdown-rooms__type-container').addClass('dropdown-rooms__type-container--with-quake')
            setTimeout(()=>{
              $(elem).closest('.dropdown-rooms__type-container').removeClass('dropdown-rooms__type-container--with-quake')
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
// const buttonEnableDisableToggle = (target, personObj)=>{
//   let totalCount = 0
//   $.each(personObj, (key)=>{
//     let singlePersonObj = personObj[key]
//     totalCount = totalCount+singlePersonObj.count
//     switch (true){
//       case singlePersonObj.count !== MAX_VALUE: singlePersonObj.button.positive.enable(); break
//       case singlePersonObj.count === MAX_VALUE: singlePersonObj.button.positive.disable(); break
//     }
//     switch (true){
//       case singlePersonObj.count !== MIN_VALUE: singlePersonObj.button.negative.enable(); break
//       case singlePersonObj.count === MIN_VALUE: singlePersonObj.button.negative.disable(); break
//     }
//   })
//   if (totalCount<=0){
//     $(target).find('*[data-action="clear"]').addClass('global--hidden')
//   }else{
//     $(target).find('*[data-action="clear"]').removeClass('global--hidden')
//   }
// }
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
  $.each(personObj, (key)=>{
    let singlePersonObj = personObj[key]
    console.log(singlePersonObj.count)
    switch (true){
      case singlePersonObj.count !== MAX_VALUE: singlePersonObj.button.positive.enable(); break
      case singlePersonObj.count === MAX_VALUE: singlePersonObj.button.positive.disable(); break
    }
    switch (true){
      case singlePersonObj.count !== MIN_VALUE: singlePersonObj.button.negative.enable(); break
      case singlePersonObj.count === MIN_VALUE: singlePersonObj.button.negative.disable(); break
    }
  })
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
    const bedrooms = personObj['Спальни'].count,
          beds = personObj['Кровати'].count,
          bathrooms = personObj['Ванные комнаты'].count,
          decl = [['Спальня', 'Спальни', 'Спальнен'], ['Кровать', 'Кровати', 'Кроватей'], ['Ванная комната', 'Ванные комнаты', 'Ванных комнат']]
    let result = `${bedrooms?`${bedrooms} ${declensionOfNum(bedrooms, decl[0])}`:''}`+
                  `${beds?`${bedrooms?', ':''}${beds} ${declensionOfNum(beds, decl[1])}`:''}`+
                  `${bathrooms?`${(bedrooms||beds)?', ':''}${bathrooms} ${declensionOfNum(bathrooms, decl[2])}`:''}`
    $(container).find('.form-input__input').val(result)
  },
  clear(container){},
  add(container, itemName){
    let personObj = getSelectedPersonObj(container)
    personObj[itemName]?.counter.add()
  },
  reduce(container, itemName){
    let personObj = getSelectedPersonObj(container)
    personObj[itemName]?.counter.reduce()
  },
  toggleDropdown(container){
    $(container).toggleClass('form-input--dropdown-open')
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
    }
    if (action === 'confirm'){
      actionsFunc.confirm(container)
    }
    if (action === 'add') {
      const itemName = $(target).closest('.dropdown-rooms__type-container').data('name')
      actionsFunc.add(container, itemName)
      disableBadButtons(container)
      actionsFunc.confirm(container)
    }
    if (action === 'reduce') {
      const itemName = $(target).closest('.dropdown-rooms__type-container').data('name')
      actionsFunc.reduce(container, itemName)
      disableBadButtons(container)
      actionsFunc.confirm(container)
    }
  }
}

/**
 Точка входа
**/
const initializeAllDropdown = ()=>{
  $(DROPDOWN_CLASS).closest('.form-input--with-dropdown').each((index, element)=>{
    $(element).on('click', onClick)
    setDefaultValue(element)
  })
}
initializeAllDropdown()

