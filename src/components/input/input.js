import 'jquery-mask-plugin'

$(".form-input__input--masked").mask('Dd.Mm.THNY', {
  translation:{
    "D":{pattern: /[0-3]/, recursive: true},
    "d":{pattern: /[0-9]/, recursive: true},
    "M":{pattern: /[0-3]/, recursive: true},
    "m":{pattern: /[0-9]/, recursive: true},
    "T":{pattern: /2/, recursive: true},
    "H":{pattern: /[0-9]/, recursive: true},
    "N":{pattern: /[0-9]/, recursive: true},
    "Y": { pattern: /[0-9]/},
  }
})