import { useStore } from 'src/store';

export function BagViewWithoutThumbs(): JSX.Element | null {
  const { bag } = useStore();
  const svg = bag.item.data?.data.original?.data.snippets.svg;

  return (svg
    ? (
      <div
        className="bag-view__slide"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    )
    : null
  );
}
