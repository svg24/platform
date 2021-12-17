import type { MutableRefObject } from 'react';

export function setRef<T>(
  ref: MutableRefObject<T | null> | ((instance: T | null) => void) | null,
  value: T | null,
): void {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref) {
    Object.assign(ref, {
      current: value,
    });
  }
}
