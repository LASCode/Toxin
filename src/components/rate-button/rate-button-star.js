class RateButtonStar {
  constructor(buttonNode, index) {
    this.$buttonNode = buttonNode;
    this.index = index;
    this.isActive = false;
    this.createComponent();
  }

  createComponent() {
    const element = document.createElement('span');
    element.classList.add('rate-button__star');
    element.classList.add('material-icons');
    element.setAttribute('data-index', this.index);
    element.textContent = 'star_border';
    this.button = element;
    this.$buttonNode.append(element);
  }

  activate() {
    if (!this.isActive) {
      this.isActive = true;
      this.button.textContent = 'star';
    }
  }

  deactivate() {
    if (this.isActive) {
      this.isActive = false;
      this.button.textContent = 'star_border';
    }
  }
}

export { RateButtonStar };
