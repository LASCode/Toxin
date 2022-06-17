import 'jquery-mask-plugin';

class Input {
  constructor(rootNode) {
    this.rootNode = rootNode;
    this.inputNode = $(rootNode).find('.js-inputElement');
    this.iconNode = $(rootNode).find('.js-formInput-iconNode');
    this.init();
  }

  init() {
    if (this.rootNode.classList.contains('js-input-withMask')) {
      this.inputNode.mask('Dd.Mm.THNY', {
        translation: {
          D: { pattern: /[0-3]/, recursive: true },
          d: { pattern: /[0-9]/, recursive: true },
          M: { pattern: /[0-3]/, recursive: true },
          m: { pattern: /[0-9]/, recursive: true },
          T: { pattern: /2/, recursive: true },
          H: { pattern: /[0-9]/, recursive: true },
          N: { pattern: /[0-9]/, recursive: true },
          Y: { pattern: /[0-9]/ },
        },
      });
    }
  }

  setCallback(callback) {
    this.callback = callback;
  }

  setMask() {
    $(this.inputNode).mask('Dd.Mm.THNY', {
      translation: {
        D: { pattern: /[0-3]/, recursive: true },
        d: { pattern: /[0-9]/, recursive: true },
        M: { pattern: /[0-3]/, recursive: true },
        m: { pattern: /[0-9]/, recursive: true },
        T: { pattern: /2/, recursive: true },
        H: { pattern: /[0-9]/, recursive: true },
        N: { pattern: /[0-9]/, recursive: true },
        Y: { pattern: /[0-9]/ },
      },
    });
  }

  rotateIcon(value) {
    if (value === true) {
      this.iconNode.addClass('input__icon--rotated');
    } else {
      this.iconNode.removeClass('input__icon--rotated');
    }
  }

  removeBorderRadius(value) {
    if (value === true) {
      this.inputNode.addClass('input__input--without-border-b');
    } else {
      this.inputNode.removeClass('input__input--without-border-b');
    }
  }

  setValue(value) {
    this.inputNode.val(value);
  }

  getValue() {
    return this.inputNode.val();
  }
}

$('.js-input').each((index, element) => {
  const inputInstance = new Input(element);
  $(element).data('toxin-inputInstance', inputInstance);
});
