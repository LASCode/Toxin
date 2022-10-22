import './base-dropdown.scss';

const defaultOptions = {
  open: false,
  windowListener: true,
  inputListener: true,
  margin: false,
};

class BaseDropdown {
  constructor(rootNode, options) {
    this.$window = $(window);
    this.$rootNode = $(rootNode);
    this.$inputNode = this.$rootNode.find('.js-input');
    this.$dropdownExpandableNode = this.$rootNode.find('.js-baseDropdownExpandable');
    this.$dropdownContentNode = this.$rootNode.find('.js-baseDropdownContent');
    this.inputInstance = [...this.$inputNode].map((el) => $(el).data('toxin-inputInstance'));
    this.baseOptions = { ...defaultOptions, ...options };
    this.getOptions();
    this.init();
  }

  getOptions() {
    const windowListener = this.$rootNode.data('window') !== undefined;
    const inputListener = this.$rootNode.data('input') !== undefined;
    const open = this.$rootNode.data('open') !== undefined;
    this.baseOptions.inputListener = inputListener;
    this.baseOptions.windowListener = windowListener;
    this.baseOptions.open = open;
  }

  init() {
    this.closeDropdown();
    this.setBaseListeners();
    if (this.baseOptions.margin) { this.$dropdownContentNode.addClass('base-dropdown__content--with-margin'); }
    if (this.baseOptions.open) { this.openDropdown(); }
  }

  setBaseListeners() {
    this.onWindowClick = this.onWindowClick.bind(this);
    this.onInputClick = this.onInputClick.bind(this);
    if (this.baseOptions.inputListener) {
      this.$inputNode.on('pointerdown', this.onInputClick);
    }
    if (this.baseOptions.windowListener) {
      this.$window.on('pointerdown', this.onWindowClick);
    }
  }

  removeBaseListeners() {
    this.$inputNode.off('pointerdown');
    this.$window.off('pointerdown');
  }

  onWindowClick(e) {
    const $target = $(e.target);
    const clickInDropdownBody = $target.closest(this.$rootNode).length > 0;
    if (!clickInDropdownBody) {
      this.closeDropdown();
    }
  }

  onInputClick() {
    const checkFocus = () => {
      let result = false;
      if (this.inputInstance.length >= 2) {
        result = this.inputInstance.some((el) => el.inputNode.is(':focus'));
      }
      return result;
    };

    if (this.isOpen === false) {
      this.openDropdown();
    } else
    if (this.isOpen === true && !checkFocus()) {
      this.closeDropdown();
    }
  }

  openDropdown() {
    this.isOpen = true;
    this.inputInstance.forEach((el) => {
      el.rotateIcon(true);
      el.removeBorderRadius(true);
    });
    this.$dropdownExpandableNode.removeClass('base-dropdown__body--hidden');
  }

  closeDropdown() {
    this.isOpen = false;
    this.inputInstance.forEach((el) => {
      el.rotateIcon(false);
      el.removeBorderRadius(false);
    });
    this.$dropdownExpandableNode.addClass('base-dropdown__body--hidden');
  }

  getDropdownContentNode() {
    return this.$dropdownContentNode[0];
  }

  startShacking() {
    this.stopShacking = this.stopShacking.bind(this);
    $(this.$dropdownContentNode).addClass('base-dropdown__content--shacking');
    setTimeout(this.stopShacking, 200);
  }

  stopShacking() {
    $(this.$dropdownContentNode).removeClass('base-dropdown__content--shacking');
  }
}

export { BaseDropdown };
