import './rooms-dropdown.scss';
import { RoomsDropdownCreator } from './Classes/RoomsDropdownCreator';
import { propsRoomsDropdownDefaultItems, propsRoomsDropdownDefaultTemplate } from '../../props/dropdowns-props';

$('.js-roomsDropdown').each((index, element) => {
  const htmlDataBtn = $(element).data('buttons');
  const htmlDataItems = $(element).data('items');
  const htmlDataDeclinations = $(element).data('template');
  const instance = new RoomsDropdownCreator(element, {
    items: htmlDataItems || propsRoomsDropdownDefaultItems,
    template: htmlDataDeclinations || propsRoomsDropdownDefaultTemplate,
    buttons: !!htmlDataBtn || false,
  });
  $(element).data('toxin-guestDropdownInstance', instance);
});
