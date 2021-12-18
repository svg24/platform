function getDescriptorMap<S>(source: S): PropertyDescriptorMap & ThisType<S> {
  return Object.getOwnPropertyNames(source).reduce((map, key) => {
    Object.assign(map, { [key]: Object.getOwnPropertyDescriptor(source, key) });
    return map;
  }, {});
}

export function deepCopy<T, S>(target: T, source: S): T & S {
  const obj = {} as T & S;

  Object.defineProperties(obj, getDescriptorMap(target));
  Object.defineProperties(obj, getDescriptorMap(source));

  return obj;
}
