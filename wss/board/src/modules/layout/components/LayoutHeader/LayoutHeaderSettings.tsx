import { CogIcon } from '@heroicons/react/outline';
import { Settings } from 'src/modules/settings';
import { LayoutHeaderButton } from './LayoutHeaderButton';
import { LayoutHeaderIcon } from './LayoutHeaderIcon';

export function LayoutHeaderSettings(): JSX.Element {
  return (
    <div className="layout-header__container">
      <LayoutHeaderButton>
        <LayoutHeaderIcon icon={CogIcon} />
      </LayoutHeaderButton>
      <Settings />
    </div>
  );
}
