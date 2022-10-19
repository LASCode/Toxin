import './diagram.scss';
import { PieDiagram } from '../../libs/PieDiagram';

$('.js-diagram').each((_, element) => {
  const items = $(element).data('items');
  new PieDiagram(element, {
    items,
    labelTitle: 'голосов',
  });
});
