import './like-button.scss';

const onClick = (e) => {
  const { target } = e;
  const action = $(target).closest('*[data-action]').data('action');

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
