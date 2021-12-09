import { ExternalLinkIcon } from '@heroicons/react/outline';
import { BagStore } from '../../store';

export function BagHeading(): JSX.Element {
  const { ctx } = BagStore;

  return (
    <h1 className="bag-heading">
      <span id="bag-heading">
        {ctx.item.meta?.name}
      </span>
      <a
        aria-label={`Go to ${ctx.item.meta?.name} website`}
        className="bag-heading__link"
        href={ctx.item.meta?.src.product}
      >
        <ExternalLinkIcon
          aria-hidden="true"
          className="bag-heading__icon"
        />
      </a>
    </h1>
  );
}
