export function getVersionAndType(name: string): {
  type: string | undefined;
  version: number | undefined;
} {
  const versionWithType = name.match(/.+-v(.+)/);

  if (versionWithType && versionWithType[1]) {
    return /-square/.test(versionWithType[1])
      ? {
        type: 'square',
        version: (new Date(versionWithType[1].replace(/-.+/, ''))).getTime(),
      }
      : {
        type: 'original',
        version: (new Date(versionWithType[1])).getTime(),
      };
  }

  return {
    type: undefined,
    version: undefined,
  };
}
