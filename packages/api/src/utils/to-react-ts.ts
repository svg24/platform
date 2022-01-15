export function toReactTS(reactJS: string): string {
  const importTypes = ''
    + 'import type '
    + '{ ComponentProps, ForwardedRef, ReactSVGElement } from \'react\';';
  const propsTypes = ''
    + '(props: ComponentProps<\'svg\'>, svgRef: ForwardedRef<SVGElement>): '
    + 'ReactSVGElement';

  return `${importTypes}\n${reactJS.replace('(props, svgRef)', propsTypes)}`;
}
