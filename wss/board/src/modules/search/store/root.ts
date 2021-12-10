import { ContentStore } from 'src/modules/content';
import { debounce, escapeString } from 'src/utils';
import type { SearchStore } from 'types/search';

export function initRoot(this: SearchStore): void {
  this.value = {
    _default: null,
    _previous: null,
    current: null,
  };

  this.process = (value) => {
    debounce(() => {
      const prev = this.value._previous;
      const { isItems } = ContentStore.list.result.data;
      const trimmed = value.trim();

      if (prev === trimmed && value.match(/\s*$/)?.[0]?.length !== 1) return;
      if (prev && !isItems && trimmed.length > prev.length) return;
      if (!prev && isItems && !trimmed) return;

      if (!trimmed) {
        this.reset();
      } else {
        this.value.current = escapeString(value);
      }

      ContentStore.list.reset();

      this.value._previous = trimmed;
    }, 300)();
  };

  this.reset = () => {
    this.value.current = this.value._default;
  };
}
