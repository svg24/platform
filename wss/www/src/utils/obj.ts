export const deepAssign = (target: unknown, ...sources: any[]): any => {
  sources.forEach((source) => {
    const props = Object.keys(source).reduce((descriptors, key) => {
      Object.assign(descriptors, {
        [key]: Object.getOwnPropertyDescriptor(source, key),
      });

      return descriptors;
    }, {});

    Object.defineProperties(target, props);
  });

  return target;
};
