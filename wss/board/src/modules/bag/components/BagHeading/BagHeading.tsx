import { ExternalLinkIcon } from '@heroicons/react/outline';
import { useStore } from 'src/store';

export function BagHeading(): JSX.Element {
  const { bag } = useStore();

  return (
    <h1 className="bag-heading">
      <span id="bag-heading">
        {bag.item.meta?.name}
      </span>
      <a
        aria-label={`Go to ${bag.item.meta?.name} website`}
        className="bag-heading__link"
        href={bag.item.meta?.src.product}
      >
        <ExternalLinkIcon
          aria-hidden="true"
          className="bag-heading__icon"
        />
      </a>
    </h1>
  );
}
