export const numberWithSpaces = (num = 0) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
