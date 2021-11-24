export const toCamelCase = (str: string): string => {
  const first = str[0]?.toUpperCase();
  const other = str
    .slice(1)
    .replace(/-(\w)/g, (_, char) => (char.toUpperCase()));

  return `${first}${other}`;
};

export const toCamelCaseFromSvg = (file: string): string => (
  toCamelCase(file.replace('.svg', ''))
);
