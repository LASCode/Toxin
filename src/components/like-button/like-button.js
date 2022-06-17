const onClick = (e) => {
  const { target } = e; // Элемент, по которому произошел клик
  const action = $(target).closest('*[data-action]').data('action'); // Дата атрибут элемента, по которому произошел клик

  if (action) {
    if (action === 'like-it') {
      const container = $(target).closest('.like-button');
      const isLiked = container.hasClass('like-button--liked');
      const counter = container.find('.like-button__count');
      const count = Number(counter.html());
      container.toggleClass('like-button--liked');
      if (isLiked) {
        counter.html(count - 1);
      } else {
        counter.html(count + 1);
      }
    }
  }
};

$(document).on('click', onClick);
