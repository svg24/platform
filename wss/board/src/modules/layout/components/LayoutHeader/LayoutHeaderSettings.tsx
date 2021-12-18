import { CogIcon } from '@heroicons/react/outline';
import { useRef, useState } from 'react';
import { Popper } from 'src/components';
import { Settings } from 'src/modules/settings';
import { LayoutHeaderButton } from './LayoutHeaderButton';
import { LayoutHeaderIcon } from './LayoutHeaderIcon';

export function LayoutHeaderSettings(): JSX.Element {
  const rootRef = useRef<HTMLDivElement>(null);
  const [settingsIsVisible, setSettingsIsVisible] = useState(false);
  const [settingsIsFromPopper, setSettingsIsFromPopper] = useState(false);

  const handleClick = (): void => {
    if (settingsIsFromPopper) {
      setSettingsIsFromPopper(false);
    } else {
      setSettingsIsVisible(!settingsIsVisible);
    }
  };
  const handleClose = (): void => {
    setSettingsIsVisible(false);
    setSettingsIsFromPopper(true);
  };

  return (
    <div
      className="layout-header__container"
      ref={rootRef}
    >
      <LayoutHeaderButton onClick={handleClick}>
        <LayoutHeaderIcon icon={CogIcon} />
      </LayoutHeaderButton>
      <Popper
        anchorRef={rootRef}
        isVisible={settingsIsVisible}
        onClose={handleClose}
      >
        <Settings />
      </Popper>
    </div>
  );
}
