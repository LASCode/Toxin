import './guests-dropdown.scss';
import { GuestsDropdownCreator } from './Classes/GuestsDropdownCreator';
import { propsGuestDropdownDefaultItems, propsGuestDropdownDefaultTemplate } from '../../props/dropdowns-props';

$('.js-guestDropdown').each((index, element) => {
  const htmlDataBtn = $(element).data('buttons');
  const htmlDataItems = $(element).data('items');
  const htmlDataDeclinations = $(element).data('template');
  const instance = new GuestsDropdownCreator(element, {
    items: htmlDataItems || propsGuestDropdownDefaultItems,
    template: htmlDataDeclinations || propsGuestDropdownDefaultTemplate,
    buttons: !!htmlDataBtn || true,
  });
  $(element).data('toxin-guestDropdownInstance', instance);
});
