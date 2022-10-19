import 'paginationjs';
import './styles.scss';
import { defaultOptions } from './options';

export class Pagination {
  constructor(rootNode, options) {
    this.rootNode = rootNode;
    this.options = { ...defaultOptions, ...options };
    this.init();
  }

  init() {
    this.pluginInstance = $(this.rootNode).pagination(this.options);
  }
}
