const defaultOptions = {
  open: false,
  closable: true,
  windowListener: true,
  inputListener: true,
  customClass: '',
};

class BaseDropdown {
  constructor(rootNode, options) {
    this.$window = $(window);
    this.$rootNode = $(rootNode);
    this.$inputNode = this.$rootNode.find('.js-input');
    this.$dropdownNode = this.$rootNode.find('.js-baseDropdownExpandable');
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
    this.$dropdownNode.addClass(this.baseOptions.customClass);
    if (this.baseOptions.open) { this.openDropdown(); }
    this.setBaseListeners();
  }

  setBaseListeners() {
    this.onWindowClick = this.onWindowClick.bind(this);
    this.onInputClick = this.onInputClick.bind(this);
    if (this.baseOptions.inputListener && this.baseOptions.closable) {
      this.$inputNode.on('pointerdown', this.onInputClick);
    }
    if (this.baseOptions.windowListener && this.baseOptions.closable) {
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
    if (this.isOpen === false) {
      this.openDropdown();
    } else
    if (this.isOpen === true) {
      this.closeDropdown();
    }
  }

  openDropdown() {
    this.isOpen = true;
    this.inputInstance.forEach((el) => {
      el.rotateIcon(true);
      el.removeBorderRadius(true);
    });
    this.$dropdownNode.removeClass('base-dropdown__body--hidden');
  }

  closeDropdown() {
    this.isOpen = false;
    this.inputInstance.forEach((el) => {
      el.rotateIcon(false);
      el.removeBorderRadius(false);
    });
    this.$dropdownNode.addClass('base-dropdown__body--hidden');
  }
}

export { BaseDropdown };
