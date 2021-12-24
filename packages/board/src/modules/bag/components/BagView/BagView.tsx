import { useEffect } from 'react';
import { useStore } from 'src/store';
import { BagViewWithThumbs } from './BagViewWithThumbs';
import { BagViewWithoutThumbs } from './BagViewWithoutThumbs';

function BagViewInner(): JSX.Element | null {
  const { content } = useStore();

  if (content.item.response) {
    if (content.item.response.data.length > 1) return <BagViewWithThumbs />;
    return <BagViewWithoutThumbs />;
  }

  return null;
}

export function BagView(): JSX.Element {
  const { bag, content } = useStore();

  useEffect(() => {
    if (content.item.response?.data[0]) {
      bag.item.setData(content.item.response.data[0]);
    }
  }, []);

  return (
    <section className="bag-view">
      <BagViewInner />
    </section>
  );
}
