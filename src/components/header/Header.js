import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';
import {debounce} from '@core/utils';
import {changeTitle} from '@/redux/actions';
import {defaultTitle} from '@/constants';

export class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options,
    });
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300);
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle;
    return `
    <input class="input" type="text" value="${title}" />
    <div class="button">
      <span class="material-icons">
        exit_to_app
      </span>
    </div>
    <div class="button">
      <span class="material-icons">
        delete
      </span>
    </div>
    `;
  }

  onInput(event) {
    const $target = $(event.target);
    this.$dispatch(changeTitle($target.text()));
  }
}
