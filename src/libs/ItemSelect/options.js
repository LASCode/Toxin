export const defaultOptions = {
  items: [
    {
      title: 'test', value: 1, max: 5, min: 0,
    },
  ],
  clearButton: true,
  submitButton: true,
  onChange: (val) => val,
  onSubmit: (val) => val,
  onClear: (val) => val,
};
export const singleItemDefaultOptions = {
  title: 'changeMe',
  value: 0,
  min: 0,
  max: 5,
  onChange: (event) => event,
};
