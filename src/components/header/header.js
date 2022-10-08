import './header.scss';
import './sections/nav-item/nav-item.scss';
import '../button/button';

class Header {
  constructor(rootNode) {
    this.navIsOpen = false;
    this.scrollIsActive = true;
    this.rootNode = $(rootNode);
    this.hamburgerCheckbox = this.rootNode.find('.js-hamburgerCheckbox');
    this.navElement = this.rootNode.find('.js-headerNavigation');
    this.setListeners();
  }

  setBodyScroll() {
    if (this.scrollIsActive === false) {
      this.scrollIsActive = true;
      document.body.classList.remove('page--without-scroll');
    }
  }

  removeBodyScroll() {
    if (this.scrollIsActive === true) {
      this.scrollIsActive = false;
      document.body.classList.add('page--without-scroll');
    }
  }

  navOpen() {
    if (this.navIsOpen === false) {
      this.navIsOpen = true;
      this.removeBodyScroll();
      $(this.navElement).addClass('header__navigation--visible');
    }
  }

  navClose() {
    if (this.navIsOpen === true) {
      this.navIsOpen = false;
      this.setBodyScroll();
      $(this.navElement).removeClass('header__navigation--visible');
    }
  }

  setListeners() {
    this.onChange = this.onChange.bind(this);
    this.hamburgerCheckbox.on('change', this.onChange);
  }

  removeListeners() {
    this.hamburgerCheckbox.off('change');
  }

  onChange(event) {
    if (event.target.checked) {
      this.navOpen();
    } else {
      this.navClose();
    }
  }
}

$('.js-header').each((index, element) => new Header(element));
