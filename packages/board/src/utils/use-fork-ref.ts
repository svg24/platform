import type { Ref } from 'react';
import { useMemo } from 'react';
import { setRef } from './set-ref';

export function useForkRef<Instance>(
  refFirst: Ref<Instance> | null | undefined,
  refSecond: Ref<Instance> | null | undefined,
): Ref<Instance> | null {
  return useMemo(() => {
    if (refFirst == null && refSecond == null) {
      return null;
    }
    return (refValue) => {
      setRef(refFirst, refValue);
      setRef(refSecond, refValue);
    };
  }, [refFirst, refSecond]);
}
