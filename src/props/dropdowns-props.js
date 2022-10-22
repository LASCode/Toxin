export const propsGuestDropdownDefaultItems = [
  { title: 'Взрослые', value: 0, max: 5, min: 0 },
  { title: 'Дети', value: 0, max: 5, min: 0 },
  { title: 'Младенцы', value: 0, max: 5, min: 0 },
];
export const propsGuestDropdownDefaultTemplate = [
  { type: 'Гости', targets: ['Взрослые', 'Дети'], declinations: ['Гость', 'Гостя', 'Гостей'] },
  { type: 'Младенцы', targets: ['Младенцы'], declinations: ['Младенец', 'Младенца', 'Младенцев'] },
];
export const propsRoomsDropdownDefaultItems = [
  { title: 'Спальни', value: 0, max: 5, min: 0 },
  { title: 'Кровати', value: 0, max: 5, min: 0 },
  { title: 'Ванные комнаты', value: 0, max: 5, min: 0 },
];
export const propsRoomsDropdownDefaultTemplate = [
  { type: 'Спальни', targets: ['Спальни'], declinations: ['Спальня', 'Спальни', 'Спален'] },
  { type: 'Кровати', targets: ['Кровати'], declinations: ['Кровать', 'Кровати', 'Кроватей'] },
  { type: 'Ванные комнаты', targets: ['Ванные комнаты'], declinations: ['Ванная комната', 'Ванные комнаты', 'Ванных комнат'] },
];

export const propsSearchRoomDateDropdown = {
  initialDates: ['19.08.2022', '23.08.2022'],
  format: 'DD MMM',
};
export const propsSearchRoomGuestDropdownItems = [
  { title: 'Взрослые', value: 2, max: 5, min: 0 },
  { title: 'Дети', value: 1, max: 5, min: 0 },
  { title: 'Младенцы', value: 1, max: 5, min: 0 },
];
export const propsSearchRoomGuestDropdownTemplate = [
  { type: 'Гости', targets: ['Взрослые', 'Дети'], declinations: ['Гость', 'Гостя', 'Гостей'] },
  { type: 'Младенцы', targets: ['Младенцы'], declinations: ['Младенец', 'Младенца', 'Младенцев'] },
];
export const propsSearchRoomRoomsDropdownItems = [
  { title: 'Спальни', value: 2, max: 5, min: 0 },
  { title: 'Кровати', value: 2, max: 5, min: 0 },
  { title: 'Ванные комнаты', value: 1, max: 5, min: 0 },
];
export const propsSearchRoomRoomsDropdownTemplate = [
  { type: 'Спальни', targets: ['Спальни'], declinations: ['Спальня', 'Спальни', 'Спален'] },
  { type: 'Кровати', targets: ['Кровати'], declinations: ['Кровать', 'Кровати', 'Кроватей'] },
  { type: 'Ванные комнаты', targets: ['Ванные комнаты'], declinations: ['Ванная комната', 'Ванные комнаты', 'Ванных комнат'] },
];
