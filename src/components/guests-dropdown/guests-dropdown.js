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

/**
 Точка входа
 **/
const initializeAllDropdown = ()=>{
  $(DROPDOWN_CLASS).closest('.form-input--with-dropdown').each((index, element)=>{
    $(element).on('click', onClick)
    setDefaultValue(element)
    disableBadButtons(element)
  })
}
initializeAllDropdown()



// const MAX_PERSON = 5,
//       MIN_PERSON = 0
//
// /**
//  Ищет вверх по дереву элемент с классом form-input--with-dropdown
//  и добавляет в него класс form-input--dropdown-open, если его там не было.
// **/
// const dropdownToggle = (target)=>{
//   $(target).closest('.form-input--with-dropdown').toggleClass('form-input--dropdown-open')
// }
// /**
//  Получает значение счетчика всех строк в дропдауна, упаковывает в обьект, содержащий:
//  {
//   {
//     Значение счетчика: Number
//     Функции прибавления\убавления счетчика
//     Функции энейбла\дизейбла кнопок (отдельно для + и -)
//   }
//   ...Аналогично для каждой последующей строчки дропдауна
//  }
//  Для каждой строки функции уникальны и действуют только на эту строку.
// **/
// const getSelectedPersonObj = (target)=>{
//   let personObj = {}
//   $(target)
//     .find('.dropdown-guest__type-container')
//     .each((index, elem)=>{
//       const count = Number($(elem).find('.dropdown-guest__guest-count').html())
//       personObj[$(elem).data('name')] = {
//         count: count,
//         counter: {
//           add(){$(elem).find('.dropdown-guest__guest-count').html(count+1)},
//           reduce(){$(elem).find('.dropdown-guest__guest-count').html(count-1)},
//           nullify(){$(elem).find('.dropdown-guest__guest-count').html(0)}
//         },
//         button:{
//           positive:{
//             disable(){
//               $(elem).find('*[data-action="guest-add"]').attr('disabled', true)
//             },
//             enable(){
//               $(elem).find('*[data-action="guest-add"]').attr('disabled', false)
//             }
//           },
//           negative:{
//             disable(){
//               $(elem).find('*[data-action="guest-reduce"]').attr('disabled', true)
//             },
//             enable(){
//               $(elem).find('*[data-action="guest-reduce"]').attr('disabled', false)
//             }
//           }
//         },
//         animate:{
//           error(){
//             $(elem).closest('.dropdown-guest__type-container').addClass('dropdown-guest__type-container--with-quake')
//             setTimeout(()=>{
//               $(elem).closest('.dropdown-guest__type-container').removeClass('dropdown-guest__type-container--with-quake')
//             }, 500)
//           }
//         }
//       }
//     })
//   return personObj
// }
// /**
//  Проводит рекурсивный поиск элемента вверх по дереву с data-[data] аттрибутом вплоть до body.
//  Применяется при диллегировании событий для блоков, имеющих потомков, не имеющих дата-атрибутов.
//  !ВНИМАНИЕ! Функция выдаст значение первого на пути элемента! Не допускать вложенности элементов с одинаковой [data]
//  При неудаче возвращает false
//  При удаче возвращает значение атрибута
// **/
// const getDataAttribute = (target, data)=>{
//   if ($(target).data(data)){
//     return $(target).data(data)
//   }else if (![...target.classList].includes('page__body')){
//     return getDataAttribute(target.parentElement, data)
//   }else{
//     return false
//   }
// }
// const buttonEnableDisableToggle = (target, personObj)=>{
//   let totalCount = 0
//   $.each(personObj, (key)=>{
//     let singlePersonObj = personObj[key]
//     totalCount = totalCount+singlePersonObj.count
//     switch (true){
//       case singlePersonObj.count !== MAX_PERSON: singlePersonObj.button.positive.enable(); break
//       case singlePersonObj.count === MAX_PERSON: singlePersonObj.button.positive.disable(); break
//     }
//     switch (true){
//       case singlePersonObj.count !== MIN_PERSON: singlePersonObj.button.negative.enable(); break
//       case singlePersonObj.count === MIN_PERSON: singlePersonObj.button.negative.disable(); break
//     }
//   })
//   if (totalCount<=0){
//     $(target).find('*[data-action="clear"]').addClass('global--hidden')
//   }else{
//     $(target).find('*[data-action="clear"]').removeClass('global--hidden')
//   }
// }
// const declensionOfNum = (number, titles)=> {
//   const numArray = [2, 0, 1, 1, 1, 2];
//   return titles[
//     (number % 100 > 4 && number % 100 < 20)
//       ?
//       2
//       :
//       numArray[(number % 10 < 5) ? number % 10 : 5]
//     ];
// }
//
//
// const onClick = (e)=>{
//   const target = e.target // Элемент, по которому произошел клик
//   const inputPrimaryWrapper = $(target).closest('.form-input--with-dropdown') // Главный контейнер инпута
//   const action = getDataAttribute(target, 'action') // Дата атрибут элемента, по которому произошел клик
//   console.log(action)
//
//   //обработка кликов по блокам с data-action
//   if (action){
//     if (action === 'toggleDropdown'){
//       dropdownToggle(target)
//     }
//     if (action === 'clear'){
//       let personObj = getSelectedPersonObj(inputPrimaryWrapper) // Получаем обьект с параметрами и функциями всех строк дропдауна
//       jQuery.each(personObj, (key)=>{
//         personObj[key].counter.nullify() // Обнуляем все счетчики
//       })
//       personObj = getSelectedPersonObj(inputPrimaryWrapper) // Обновляем обьект строки, тк мы изменили состояние
//       buttonEnableDisableToggle(inputPrimaryWrapper, personObj) // Дизейблим\энейблим кнопки
//     }
//     if (action === 'confirm'){
//       let personObj = getSelectedPersonObj(inputPrimaryWrapper) // Получаем обьект с параметрами и функциями всех строк дропдауна
//       const adults = personObj['Взрослые'].count,
//             children = personObj['Дети'].count,
//             babies = personObj['Младенцы'].count,
//             decl = [['Гость', 'Гостя', 'Гостей'], ['Младенец', 'Младенца', 'Младенцев']]
//       if ((children || babies) && !adults){
//         personObj['Взрослые'].animate.error()
//         return false
//       }
//
//       let result = `${(adults||children)?`${adults+children} ${declensionOfNum(adults+children, decl[0])}`:''}${babies?`, ${babies} ${declensionOfNum(babies, decl[1])}`:''}`
//       inputPrimaryWrapper.find('.form-input__input').val(result)
//       dropdownToggle(target)
//     }
//     if ((/guest-(add|reduce)/).test(action)){ // Если клик был по кнопкам + и -
//       const person = $(target).closest('.dropdown-guest__type-container').data('name') // Получаем значение атрибута data-name строки, в которой произошел клик
//       let personObj = getSelectedPersonObj(inputPrimaryWrapper) // Получаем обьект с параметрами и функциями всех строк дропдауна
//       switch (action){
//         case 'guest-add': personObj[person].counter.add(); break // Прибавляем единицу к значению
//         case 'guest-reduce': personObj[person].counter.reduce(); break // Убавляем единицу от значения
//       }
//       personObj = getSelectedPersonObj(inputPrimaryWrapper) // Обновляем обьект строки, тк мы изменили состояние
//       buttonEnableDisableToggle(inputPrimaryWrapper, personObj) // Дизейблим\энейблим кнопки
//     }
//   }
// }
// $('.dropdown-guest').closest('.form-input--with-dropdown').on('click', onClick)
